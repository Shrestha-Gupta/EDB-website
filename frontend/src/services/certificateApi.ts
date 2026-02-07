/**
 * Certificate System API service
 * Connects to the FastAPI certificate backend
 */

const CERT_API_BASE =
  import.meta.env.MODE === "production"
    ? "https://cert-api.theeditorialboard.in"  // Update to your production URL
    : "http://localhost:8000";

// ── Template Types ──────────────────────────────────────────

export interface FieldPlacement {
  field_name: string;
  x: number;
  y: number;
  font_size: number;
  font_color: string;
  font_family: string;
  alignment: "left" | "center" | "right";
  max_width?: number;
}

export interface Template {
  id: string;
  name: string;
  image_path: string;
  fields: FieldPlacement[];
  width: number;
  height: number;
  created_at: string;
}

// ── Participant Types ───────────────────────────────────────

export interface Participant {
  name: string;
  email: string;
  serial_number?: string;
}

export interface CSVUploadResult {
  total: number;
  columns: string[];
  serial_column: string | null;
  participants: Participant[];
}

// ── Job Types ───────────────────────────────────────────────

export interface ParticipantResult {
  name: string;
  email: string;
  serial_number?: string;
  status: "pending" | "sent" | "failed";
  error?: string;
  cert_path?: string;
}

export interface Job {
  id: string;
  template_id: string;
  event_name: string;
  status: "pending" | "running" | "completed" | "failed";
  total: number;
  sent: number;
  failed: number;
  participants: ParticipantResult[];
  created_at: string;
  completed_at?: string;
  error?: string;
}

// ── Template API ────────────────────────────────────────────

export async function uploadTemplate(name: string, file: File): Promise<Template> {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("file", file);

  const res = await fetch(`${CERT_API_BASE}/api/templates`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function listTemplates(): Promise<Template[]> {
  const res = await fetch(`${CERT_API_BASE}/api/templates`);
  if (!res.ok) throw new Error("Failed to fetch templates");
  return res.json();
}

export async function getTemplate(id: string): Promise<Template> {
  const res = await fetch(`${CERT_API_BASE}/api/templates/${id}`);
  if (!res.ok) throw new Error("Template not found");
  return res.json();
}

export async function updateTemplateFields(
  id: string,
  fields: FieldPlacement[]
): Promise<Template> {
  const res = await fetch(`${CERT_API_BASE}/api/templates/${id}/fields`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) throw new Error("Failed to update fields");
  return res.json();
}

export async function deleteTemplate(id: string): Promise<void> {
  const res = await fetch(`${CERT_API_BASE}/api/templates/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete template");
}

// ── Certificate API ─────────────────────────────────────────

export async function uploadCSV(file: File): Promise<CSVUploadResult> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${CERT_API_BASE}/api/certificates/upload-csv`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to parse file");
  }
  return res.json();
}

export async function previewCertificate(
  templateId: string,
  name?: string,
  serialNumber?: string
): Promise<{ path: string; url: string }> {
  const params = new URLSearchParams({ template_id: templateId });
  if (name) params.set("name", name);
  if (serialNumber) params.set("serial_number", serialNumber);

  const res = await fetch(`${CERT_API_BASE}/api/certificates/preview?${params}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to generate preview");
  return res.json();
}

// ── Jobs API ────────────────────────────────────────────────

export async function createBulkJob(
  templateId: string,
  eventName: string,
  participants: Participant[],
  subject?: string,
  body?: string
): Promise<{ job_id: string; status: string; total: number }> {
  const res = await fetch(`${CERT_API_BASE}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      template_id: templateId,
      event_name: eventName,
      subject: subject || `Certificate - ${eventName}`,
      body: body || "",
      participants,
    }),
  });
  if (!res.ok) throw new Error("Failed to create job");
  return res.json();
}

export async function listJobs(): Promise<Job[]> {
  const res = await fetch(`${CERT_API_BASE}/api/jobs`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function getJob(id: string): Promise<Job> {
  const res = await fetch(`${CERT_API_BASE}/api/jobs/${id}`);
  if (!res.ok) throw new Error("Job not found");
  return res.json();
}

export async function deleteJob(id: string): Promise<void> {
  const res = await fetch(`${CERT_API_BASE}/api/jobs/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete job");
}

// ── Helpers ─────────────────────────────────────────────────

export function getTemplateImageUrl(template: Template): string {
  return `${CERT_API_BASE}/${template.image_path}`;
}

export function getCertificateUrl(path: string): string {
  return `${CERT_API_BASE}/${path}`;
}
