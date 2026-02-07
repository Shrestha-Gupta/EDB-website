"""
Bulk send jobs — create, track progress, email delivery via SMTP.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os
import threading
import logging
from typing import Optional

from models import (
    Job, JobStatus, ParticipantResult,
    templates_store, jobs_store, new_id, now_iso,
)
from routers.certificates import generate_certificate

logger = logging.getLogger(__name__)

router = APIRouter()


# ── Request models ───────────────────────────────────────────────

class ParticipantInput(BaseModel):
    name: str
    email: str
    serial_number: Optional[str] = None


class BulkSendRequest(BaseModel):
    template_id: str
    event_name: str = ""
    subject: str = "Your Certificate"
    body: str = ""
    participants: list[ParticipantInput]


# ── SMTP Sender ──────────────────────────────────────────────────

def send_email(
    to_email: str,
    name: str,
    cert_path: str,
    subject: str,
    body: str,
) -> bool:
    """Send one email with the certificate PDF attached."""
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    sender_email = os.getenv("SENDER_EMAIL")
    sender_password = os.getenv("SENDER_PASSWORD")

    if not sender_email or not sender_password:
        raise RuntimeError("SENDER_EMAIL / SENDER_PASSWORD not configured in .env")

    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = to_email
    msg["Subject"] = subject

    # Personalise body
    final_body = body.replace("{name}", name) if body else (
        f"Dear {name},\n\n"
        f"Please find your certificate attached.\n\n"
        f"Best regards,\nEDB Team"
    )
    msg.attach(MIMEText(final_body, "plain"))

    # Attach PDF
    with open(cert_path, "rb") as f:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(f.read())
    encoders.encode_base64(part)
    part.add_header(
        "Content-Disposition",
        f"attachment; filename={os.path.basename(cert_path)}",
    )
    msg.attach(part)

    logger.info(f"Connecting to SMTP {smtp_server}:{smtp_port}...")
    server = smtplib.SMTP(smtp_server, smtp_port, timeout=120)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(sender_email, sender_password)
    server.send_message(msg)
    server.quit()
    logger.info(f"Email sent to {to_email}")
    return True


# ── Background worker ───────────────────────────────────────────

def process_job(job_id: str):
    """Background thread: generate certificates and send emails for a job."""
    job = jobs_store.get(job_id)
    if not job:
        return

    logger.info(f"Job {job_id}: starting, {job.total} participants")
    job.status = JobStatus.RUNNING
    template = templates_store.get(job.template_id)
    if not template:
        job.status = JobStatus.FAILED
        job.error = "Template not found"
        return

    for i, participant in enumerate(job.participants):
        try:
            logger.info(f"Job {job_id}: [{i+1}/{job.total}] generating cert for {participant.name}")
            data = {
                "name": participant.name,
                "serial_number": participant.serial_number or "",
            }

            cert_path = generate_certificate(template, data)
            participant.cert_path = cert_path
            logger.info(f"Job {job_id}: [{i+1}/{job.total}] cert generated, sending email to {participant.email}")

            subject = f"Certificate - {job.event_name}" if job.event_name else "Your Certificate"

            send_email(
                to_email=participant.email,
                name=participant.name,
                cert_path=cert_path,
                subject=subject,
                body="",
            )

            participant.status = "sent"
            job.sent += 1
            logger.info(f"Job {job_id}: [{i+1}/{job.total}] sent ✓")

        except Exception as e:
            participant.status = "failed"
            participant.error = str(e)
            job.failed += 1
            logger.error(f"Job {job_id}: [{i+1}/{job.total}] FAILED: {e}")

    job.status = JobStatus.COMPLETED
    job.completed_at = now_iso()
    logger.info(f"Job {job_id}: completed — sent={job.sent}, failed={job.failed}")


# ── API Endpoints ────────────────────────────────────────────────

@router.post("")
async def create_job(req: BulkSendRequest):
    """Create a new bulk-send job. Processing happens in a background thread."""
    if req.template_id not in templates_store:
        raise HTTPException(404, "Template not found")

    job = Job(
        id=new_id(),
        template_id=req.template_id,
        event_name=req.event_name,
        total=len(req.participants),
        participants=[
            ParticipantResult(
                name=p.name,
                email=p.email,
                serial_number=p.serial_number,
            )
            for p in req.participants
        ],
        created_at=now_iso(),
    )
    jobs_store[job.id] = job

    # Run in a real OS thread so the SMTP calls don't block the event loop
    thread = threading.Thread(target=process_job, args=(job.id,), daemon=True)
    thread.start()

    return {"job_id": job.id, "status": job.status, "total": job.total}


@router.get("")
async def list_jobs():
    """List all jobs, most recent first."""
    return sorted(jobs_store.values(), key=lambda j: j.created_at, reverse=True)


@router.get("/{job_id}")
async def get_job(job_id: str):
    """Get detailed status of a single job."""
    if job_id not in jobs_store:
        raise HTTPException(404, "Job not found")
    return jobs_store[job_id]


@router.delete("/{job_id}")
async def delete_job(job_id: str):
    """Delete a completed job."""
    if job_id not in jobs_store:
        raise HTTPException(404, "Job not found")
    jobs_store.pop(job_id)
    return {"detail": "deleted"}
