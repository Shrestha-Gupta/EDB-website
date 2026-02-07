"""
Shared data models and in-memory stores for the certificate system.
"""

from pydantic import BaseModel
from typing import Optional
from enum import Enum
import uuid
from datetime import datetime


# ── Template Models ──────────────────────────────────────────────

class FieldPlacement(BaseModel):
    """Defines where a dynamic field is placed on the template."""
    field_name: str           # e.g. "name", "serial_number"
    x: float                  # X position (pixels on template)
    y: float                  # Y position (pixels on template)
    font_size: int = 120
    font_color: str = "#000000"
    font_family: str = "Helvetica"
    alignment: str = "center"  # "left", "center", "right"
    max_width: Optional[int] = None


class TemplateConfig(BaseModel):
    """Full template definition."""
    id: str
    name: str
    image_path: str
    fields: list[FieldPlacement]
    width: int = 0
    height: int = 0
    created_at: str = ""


class TemplateFieldsUpdate(BaseModel):
    """Payload to update field placements for a template."""
    fields: list[FieldPlacement]


# ── Job Models ───────────────────────────────────────────────────

class JobStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class ParticipantResult(BaseModel):
    name: str
    email: str
    serial_number: Optional[str] = None
    status: str = "pending"    # "pending", "sent", "failed"
    error: Optional[str] = None
    cert_path: Optional[str] = None


class Job(BaseModel):
    id: str
    template_id: str
    event_name: str
    status: JobStatus = JobStatus.PENDING
    total: int = 0
    sent: int = 0
    failed: int = 0
    participants: list[ParticipantResult] = []
    created_at: str = ""
    completed_at: Optional[str] = None
    error: Optional[str] = None


# ── In-Memory Stores ────────────────────────────────────────────
# For production, replace with MongoDB/Redis

templates_store: dict[str, TemplateConfig] = {}
jobs_store: dict[str, Job] = {}


def new_id() -> str:
    return uuid.uuid4().hex[:12]


def now_iso() -> str:
    return datetime.utcnow().isoformat() + "Z"
