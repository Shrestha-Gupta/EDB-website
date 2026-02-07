"""
EDB Certificate System — FastAPI Backend
Provides REST API for template management, certificate generation, bulk email, and job tracking.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from pathlib import Path
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(levelname)s: %(message)s")

# Set working directory to the certificate-system folder
APP_DIR = Path(__file__).resolve().parent
os.chdir(APP_DIR)
load_dotenv(APP_DIR / ".env")

# Ensure directories exist
for d in ["uploads/templates", "uploads/csv", "certificates", "fonts"]:
    Path(d).mkdir(parents=True, exist_ok=True)

app = FastAPI(title="EDB Certificate System", version="2.0.0")

# CORS — allow frontend dev and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "https://www.theeditorialboard.in",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve generated certificates as static files
app.mount("/certificates", StaticFiles(directory="certificates"), name="certificates")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Register routers
from routers import templates, certificates, jobs

app.include_router(templates.router, prefix="/api/templates", tags=["Templates"])
app.include_router(certificates.router, prefix="/api/certificates", tags=["Certificates"])
app.include_router(jobs.router, prefix="/api/jobs", tags=["Jobs"])


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "EDB Certificate System"}
