import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CertificateEditor } from '../../components/CertificateEditor'
import {
  type Template,
  type Participant,
  type Job,
  uploadTemplate,
  listTemplates,
  deleteTemplate,
  uploadCSV,
  createBulkJob,
  listJobs,
  getJob,
} from '../../services/certificateApi'

type Tab = 'templates' | 'send' | 'jobs'

export default function CertificatePage() {
  const [tab, setTab] = useState<Tab>('templates')

  // Template state
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [uploading, setUploading] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const templateFileRef = useRef<HTMLInputElement>(null)

  // CSV / Send state
  const [participants, setParticipants] = useState<Participant[]>([])
  const [csvFileName, setCsvFileName] = useState('')
  const [eventName, setEventName] = useState('')
  const [sendTemplate, setSendTemplate] = useState<string>('')
  const [sending, setSending] = useState(false)

  // Caption state with default message
  const DEFAULT_CAPTION = `Dear Participant,

Greetings from The Editorial Board.

Please find your attached *Certificate of Participation*, issued in recognition of your involvement and contribution to *{event_name}*.

You're welcome to share your certificate and a brief reflection on LinkedIn. Feel free to tag us at https://linkedin.com/company/theeditorialboard, so that we can celebrate your achievement together.

Warm regards,
The Editorial Board`
  const [caption, setCaption] = useState(DEFAULT_CAPTION)

  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([])
  const [activeJob, setActiveJob] = useState<Job | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Load data ──────────────────────────────────────────────

  const loadTemplates = useCallback(async () => {
    try {
      const data = await listTemplates()
      setTemplates(data)
    } catch (err) {
      console.error(err)
    }
  }, [])

  const loadJobs = useCallback(async () => {
    try {
      const data = await listJobs()
      setJobs(data)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    loadTemplates()
    loadJobs()
  }, [loadTemplates, loadJobs])

  // Poll active job
  useEffect(() => {
    if (activeJob && (activeJob.status === 'pending' || activeJob.status === 'running')) {
      pollRef.current = setInterval(async () => {
        try {
          const updated = await getJob(activeJob.id)
          setActiveJob(updated)
          if (updated.status === 'completed' || updated.status === 'failed') {
            if (pollRef.current) clearInterval(pollRef.current)
            loadJobs()
          }
        } catch {
          if (pollRef.current) clearInterval(pollRef.current)
        }
      }, 2000)
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [activeJob?.id, activeJob?.status, loadJobs])

  // ── Template Upload ────────────────────────────────────────

  const handleTemplateUpload = async () => {
    const file = templateFileRef.current?.files?.[0]
    if (!file || !templateName.trim()) return

    setUploading(true)
    try {
      const tpl = await uploadTemplate(templateName.trim(), file)
      setTemplates((prev) => [...prev, tpl])
      setSelectedTemplate(tpl)
      setTemplateName('')
      if (templateFileRef.current) templateFileRef.current.value = ''
    } catch (err) {
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm('Delete this template?')) return
    try {
      await deleteTemplate(id)
      setTemplates((prev) => prev.filter((t) => t.id !== id))
      if (selectedTemplate?.id === id) setSelectedTemplate(null)
    } catch (err) {
      console.error(err)
    }
  }

  // ── CSV Upload ─────────────────────────────────────────────

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await uploadCSV(file)
      setParticipants(result.participants)
      setCsvFileName(file.name)
    } catch (err: any) {
      alert(err.message || 'Failed to parse file')
    }
  }

  // ── Bulk Send ──────────────────────────────────────────────

  const handleBulkSend = async () => {
    if (!sendTemplate || participants.length === 0 || !eventName.trim()) {
      alert('Please select a template, upload participants, and enter an event name.')
      return
    }

    setSending(true)
    try {
      const result = await createBulkJob(
        sendTemplate,
        eventName.trim(),
        participants,
        undefined,
        undefined,
        caption.trim()
      )
      setTab('jobs')
      const job = await getJob(result.job_id)
      setActiveJob(job)
      loadJobs()
    } catch (err) {
      console.error(err)
      alert('Failed to start bulk send')
    } finally {
      setSending(false)
    }
  }

  // ── Tab content ────────────────────────────────────────────

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'templates', label: 'Templates', icon: '🎨' },
    { key: 'send', label: 'Bulk Send', icon: '📧' },
    { key: 'jobs', label: 'Job History', icon: '📊' },
  ]

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-stone-800">
            Certificate Generator
          </h1>
          <p className="text-stone-500 mt-1">
            Upload templates, position fields, and send certificates in bulk
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-stone-200 rounded-lg p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                tab === t.key
                  ? 'bg-white text-stone-800 shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Templates Tab ─────────────────────────────────── */}
          {tab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Upload new template */}
              <div className="bg-white rounded-xl border border-stone-200 p-6">
                <h2 className="font-serif font-bold text-lg text-stone-700 mb-4">
                  Upload New Template
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Template name"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="flex-1 px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none"
                  />
                  <input
                    ref={templateFileRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    className="flex-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-stone-100 file:text-stone-700 file:font-medium file:cursor-pointer hover:file:bg-stone-200 text-sm text-stone-500"
                  />
                  <button
                    onClick={handleTemplateUpload}
                    disabled={uploading || !templateName.trim()}
                    className="px-6 py-2.5 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors whitespace-nowrap"
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>

              {/* Template list */}
              {templates.length > 0 && !selectedTemplate && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((tpl) => (
                    <div
                      key={tpl.id}
                      className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="h-40 bg-stone-100 flex items-center justify-center text-6xl">
                        📄
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif font-bold text-stone-800">{tpl.name}</h3>
                        <p className="text-xs text-stone-400 mt-1">
                          {tpl.width}×{tpl.height}px · {tpl.fields.length} fields
                        </p>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => setSelectedTemplate(tpl)}
                            className="flex-1 py-2 text-sm bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 font-medium transition-colors"
                          >
                            Edit Fields
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(tpl.id)}
                            className="py-2 px-3 text-sm text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Editor (shown when a template is selected) */}
              {selectedTemplate && (
                <div className="bg-white rounded-xl border border-stone-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-serif font-bold text-lg text-stone-700">
                      Editing: {selectedTemplate.name}
                    </h2>
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      className="px-4 py-2 text-sm text-stone-500 hover:text-stone-700 border border-stone-300 rounded-lg transition-colors"
                    >
                      ← Back to Templates
                    </button>
                  </div>

                  <CertificateEditor
                    template={selectedTemplate}
                    onSave={(updated) => {
                      setSelectedTemplate(updated)
                      setTemplates((prev) =>
                        prev.map((t) => (t.id === updated.id ? updated : t))
                      )
                    }}
                  />
                </div>
              )}

              {templates.length === 0 && (
                <div className="text-center py-16 text-stone-400">
                  <p className="text-5xl mb-4">📄</p>
                  <p className="text-lg">No templates uploaded yet</p>
                  <p className="text-sm mt-1">Upload a certificate template image to get started</p>
                </div>
              )}
            </motion.div>
          )}

          {/* ── Bulk Send Tab ─────────────────────────────────── */}
          {tab === 'send' && (
            <motion.div
              key="send"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left: Configuration */}
                <div className="space-y-4">
                  {/* Select Template */}
                  <div className="bg-white rounded-xl border border-stone-200 p-6">
                    <h3 className="font-serif font-bold text-stone-700 mb-3">
                      1. Select Template
                    </h3>
                    <select
                      value={sendTemplate}
                      onChange={(e) => setSendTemplate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                    >
                      <option value="">Choose a template...</option>
                      {templates.map((tpl) => (
                        <option key={tpl.id} value={tpl.id}>
                          {tpl.name} ({tpl.fields.length} fields)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Event Name */}
                  <div className="bg-white rounded-xl border border-stone-200 p-6">
                    <h3 className="font-serif font-bold text-stone-700 mb-3">
                      2. Event Name
                    </h3>
                    <input
                      type="text"
                      placeholder="e.g. MMUN 2026, Arunoday, etc."
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
                    />
                  </div>

                  {/* Email Caption */}
                  <div className="bg-white rounded-xl border border-stone-200 p-6">
                    <h3 className="font-serif font-bold text-stone-700 mb-3">
                      3. Email Caption
                    </h3>
                    <p className="text-xs text-stone-400 mb-3">
                      This message will be sent in the email body along with the certificate.
                      Use <strong>{'{event_name}'}</strong> to insert the event name (or edit freely).
                    </p>
                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      rows={10}
                      className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none resize-y font-mono text-sm leading-relaxed"
                      placeholder="Enter the email message..."
                    />
                    <button
                      type="button"
                      onClick={() => setCaption(DEFAULT_CAPTION)}
                      className="mt-2 text-xs text-amber-600 hover:text-amber-800 underline"
                    >
                      Reset to default caption
                    </button>
                  </div>

                  {/* Upload CSV */}
                  <div className="bg-white rounded-xl border border-stone-200 p-6">
                    <h3 className="font-serif font-bold text-stone-700 mb-3">
                      4. Upload Participants
                    </h3>
                    <p className="text-xs text-stone-400 mb-3">
                      CSV or Excel with columns: <strong>name</strong>, <strong>email</strong>,{' '}
                      <strong>serial_number</strong> (optional)
                    </p>
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleCSVUpload}
                      className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-stone-100 file:text-stone-700 file:font-medium file:cursor-pointer hover:file:bg-stone-200 text-sm text-stone-500"
                    />
                    {csvFileName && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {csvFileName} — {participants.length} participants loaded
                      </p>
                    )}
                  </div>

                  {/* Send Button */}
                  <motion.button
                    onClick={handleBulkSend}
                    disabled={sending || !sendTemplate || participants.length === 0}
                    className="w-full py-4 bg-brand-red text-white font-bold text-lg rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    {sending ? '⏳ Starting...' : `📧 Send ${participants.length} Certificates`}
                  </motion.button>
                </div>

                {/* Right: Participant Preview */}
                <div className="bg-white rounded-xl border border-stone-200 p-6">
                  <h3 className="font-serif font-bold text-stone-700 mb-3">
                    Participant Preview
                  </h3>
                  {participants.length === 0 ? (
                    <div className="text-center py-12 text-stone-400">
                      <p className="text-4xl mb-2">📋</p>
                      <p>Upload a CSV/Excel file to see participants</p>
                    </div>
                  ) : (
                    <div className="overflow-auto max-h-[500px]">
                      <table className="w-full text-sm">
                        <thead className="bg-stone-50 sticky top-0">
                          <tr>
                            <th className="text-left py-2 px-3 text-stone-500 font-medium">#</th>
                            <th className="text-left py-2 px-3 text-stone-500 font-medium">
                              Serial
                            </th>
                            <th className="text-left py-2 px-3 text-stone-500 font-medium">
                              Name
                            </th>
                            <th className="text-left py-2 px-3 text-stone-500 font-medium">
                              Email
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {participants.map((p, i) => (
                            <tr
                              key={i}
                              className="border-t border-stone-100 hover:bg-stone-50"
                            >
                              <td className="py-2 px-3 text-stone-400">{i + 1}</td>
                              <td className="py-2 px-3 font-mono text-xs">
                                {p.serial_number || '—'}
                              </td>
                              <td className="py-2 px-3 text-stone-700">{p.name}</td>
                              <td className="py-2 px-3 text-stone-500">{p.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Jobs Tab ──────────────────────────────────────── */}
          {tab === 'jobs' && (
            <motion.div
              key="jobs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Active Job Detail */}
              {activeJob && (
                <div className="bg-white rounded-xl border border-stone-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-lg text-stone-700">
                      {activeJob.event_name || 'Job'} — {activeJob.status.toUpperCase()}
                    </h3>
                    <button
                      onClick={() => setActiveJob(null)}
                      className="text-stone-400 hover:text-stone-600"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-stone-500 mb-1">
                      <span>
                        {activeJob.sent + activeJob.failed} / {activeJob.total}
                      </span>
                      <span>
                        ✓ {activeJob.sent} · ✗ {activeJob.failed}
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-3 overflow-hidden">
                      <div className="h-full flex">
                        <div
                          className="bg-green-500 transition-all duration-500"
                          style={{
                            width: `${(activeJob.sent / Math.max(activeJob.total, 1)) * 100}%`,
                          }}
                        />
                        <div
                          className="bg-red-400 transition-all duration-500"
                          style={{
                            width: `${(activeJob.failed / Math.max(activeJob.total, 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Participant results */}
                  <div className="overflow-auto max-h-64">
                    <table className="w-full text-sm">
                      <thead className="bg-stone-50 sticky top-0">
                        <tr>
                          <th className="text-left py-2 px-3 text-stone-500 font-medium">Name</th>
                          <th className="text-left py-2 px-3 text-stone-500 font-medium">Email</th>
                          <th className="text-left py-2 px-3 text-stone-500 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeJob.participants.map((p, i) => (
                          <tr key={i} className="border-t border-stone-100">
                            <td className="py-2 px-3">{p.name}</td>
                            <td className="py-2 px-3 text-stone-500">{p.email}</td>
                            <td className="py-2 px-3">
                              {p.status === 'sent' && (
                                <span className="text-green-600 font-medium">✓ Sent</span>
                              )}
                              {p.status === 'failed' && (
                                <span className="text-red-500" title={p.error}>
                                  ✗ Failed
                                </span>
                              )}
                              {p.status === 'pending' && (
                                <span className="text-stone-400">⏳ Pending</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Job History */}
              <div className="bg-white rounded-xl border border-stone-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-lg text-stone-700">All Jobs</h3>
                  <button
                    onClick={loadJobs}
                    className="text-sm text-stone-500 hover:text-stone-700 border border-stone-300 px-3 py-1 rounded-lg"
                  >
                    ↻ Refresh
                  </button>
                </div>

                {jobs.length === 0 ? (
                  <div className="text-center py-12 text-stone-400">
                    <p className="text-4xl mb-2">📊</p>
                    <p>No jobs yet. Go to Bulk Send to create one.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        onClick={() => setActiveJob(job)}
                        className="flex items-center justify-between p-4 border border-stone-200 rounded-lg hover:bg-stone-50 cursor-pointer transition-colors"
                      >
                        <div>
                          <p className="font-medium text-stone-700">
                            {job.event_name || 'Untitled'}
                          </p>
                          <p className="text-xs text-stone-400">
                            {new Date(job.created_at).toLocaleString()} · {job.total} participants
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-green-600">✓ {job.sent}</span>
                          {job.failed > 0 && (
                            <span className="text-sm text-red-500">✗ {job.failed}</span>
                          )}
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                              job.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : job.status === 'running'
                                ? 'bg-amber-100 text-amber-700'
                                : job.status === 'failed'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                          >
                            {job.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
