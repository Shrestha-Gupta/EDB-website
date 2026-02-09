import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  type Template,
  type FieldPlacement,
  getTemplateImageUrl,
  updateTemplateFields,
} from '../../services/certificateApi'

interface Props {
  template: Template
  onSave: (updated: Template) => void
}

interface DragState {
  fieldIndex: number
  offsetX: number
  offsetY: number
}

export default function CertificateEditor({ template, onSave }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [fields, setFields] = useState<FieldPlacement[]>(template.fields)
  const [selectedField, setSelectedField] = useState<number | null>(null)
  const [dragState, setDragState] = useState<DragState | null>(null)
  const [scale, setScale] = useState(1)
  const [saving, setSaving] = useState(false)

  // Sync fields when template changes
  useEffect(() => {
    setFields(template.fields)
    setSelectedField(null)
  }, [template.id])

  // Calculate scale to fit editor
  useEffect(() => {
    if (canvasRef.current && template.width > 0) {
      const containerWidth = canvasRef.current.parentElement?.clientWidth || 900
      const s = Math.min(containerWidth / template.width, 1)
      setScale(s)
    }
  }, [template.width])

  // Mouse handlers for dragging fields
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation()
      setSelectedField(index)

      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return

      const field = fields[index]
      const mouseX = (e.clientX - rect.left) / scale
      const mouseY = (e.clientY - rect.top) / scale

      setDragState({
        fieldIndex: index,
        offsetX: mouseX - field.x,
        offsetY: mouseY - field.y,
      })
    },
    [fields, scale]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragState || !canvasRef.current) return

      const rect = canvasRef.current.getBoundingClientRect()
      const mouseX = (e.clientX - rect.left) / scale
      const mouseY = (e.clientY - rect.top) / scale

      const newX = Math.max(0, Math.min(template.width, mouseX - dragState.offsetX))
      const newY = Math.max(0, Math.min(template.height, mouseY - dragState.offsetY))

      setFields((prev) => {
        const updated = [...prev]
        updated[dragState.fieldIndex] = {
          ...updated[dragState.fieldIndex],
          x: Math.round(newX),
          y: Math.round(newY),
        }
        return updated
      })
    },
    [dragState, scale, template.width, template.height]
  )

  const handleMouseUp = useCallback(() => {
    setDragState(null)
  }, [])

  const handleCanvasClick = useCallback(() => {
    setSelectedField(null)
  }, [])

  // Update field property
  const updateField = (index: number, updates: Partial<FieldPlacement>) => {
    setFields((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], ...updates }
      return updated
    })
  }

  // Add a new field
  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        field_name: `field_${prev.length + 1}`,
        x: template.width / 2,
        y: template.height / 2,
        font_size: 80,
        font_color: '#000000',
        font_family: 'Helvetica',
        alignment: 'center',
      },
    ])
  }

  // Remove a field
  const removeField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index))
    setSelectedField(null)
  }

  // Save field placements to backend
  const handleSave = async () => {
    setSaving(true)
    try {
      const updated = await updateTemplateFields(template.id, fields)
      onSave(updated)
      alert('Field positions saved successfully!')
    } catch (err: any) {
      console.error('Failed to save:', err)
      alert(err?.message || 'Failed to save field positions. Is the backend running?')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Canvas Area */}
      <div className="flex-1 overflow-auto border-2 border-stone-300 rounded-lg bg-stone-100">
        <div
          ref={canvasRef}
          className="relative cursor-crosshair"
          style={{
            width: template.width * scale,
            height: template.height * scale,
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleCanvasClick}
        >
          {/* Template image */}
          <img
            src={getTemplateImageUrl(template)}
            alt="Certificate Template"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            draggable={false}
          />

          {/* Draggable field markers */}
          {fields.map((field, i) => (
            <div
              key={i}
              className={`absolute cursor-move flex items-center justify-center select-none transition-shadow ${
                selectedField === i
                  ? 'ring-2 ring-amber-500 shadow-lg'
                  : 'ring-1 ring-blue-400/60'
              }`}
              style={{
                left: field.x * scale - 60,
                top: field.y * scale - 16,
                minWidth: 120,
                padding: '4px 12px',
                background: selectedField === i ? 'rgba(251,191,36,0.25)' : 'rgba(59,130,246,0.15)',
                borderRadius: 6,
                fontSize: 12 * scale,
                color: field.font_color,
                whiteSpace: 'nowrap',
              }}
              onMouseDown={(e) => handleMouseDown(e, i)}
            >
              <span className="font-mono text-xs">
                {`{${field.field_name}}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Properties Panel */}
      <div className="w-full lg:w-80 space-y-4">
        <div className="bg-white border border-stone-200 rounded-lg p-4">
          <h3 className="font-serif font-bold text-lg mb-4 text-stone-800">Fields</h3>

          <div className="space-y-3 max-h-[400px] overflow-auto">
            {fields.map((field, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedField === i
                    ? 'border-amber-400 bg-amber-50'
                    : 'border-stone-200 bg-stone-50 hover:border-stone-300'
                }`}
                onClick={() => setSelectedField(i)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-semibold text-stone-700">
                    {field.field_name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeField(i)
                    }}
                    className="text-red-400 hover:text-red-600 text-xs"
                  >
                    ✕
                  </button>
                </div>

                {selectedField === i && (
                  <div className="space-y-2 mt-2">
                    {/* Field Name */}
                    <label className="block">
                      <span className="text-xs text-stone-500">Field Name</span>
                      <input
                        type="text"
                        value={field.field_name}
                        onChange={(e) => updateField(i, { field_name: e.target.value })}
                        className="w-full mt-1 px-2 py-1 text-sm border border-stone-300 rounded"
                      />
                    </label>

                    {/* Position */}
                    <div className="grid grid-cols-2 gap-2">
                      <label className="block">
                        <span className="text-xs text-stone-500">X</span>
                        <input
                          type="number"
                          value={Math.round(field.x)}
                          onChange={(e) => updateField(i, { x: Number(e.target.value) })}
                          className="w-full mt-1 px-2 py-1 text-sm border border-stone-300 rounded"
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs text-stone-500">Y</span>
                        <input
                          type="number"
                          value={Math.round(field.y)}
                          onChange={(e) => updateField(i, { y: Number(e.target.value) })}
                          className="w-full mt-1 px-2 py-1 text-sm border border-stone-300 rounded"
                        />
                      </label>
                    </div>

                    {/* Font Size */}
                    <label className="block">
                      <span className="text-xs text-stone-500">Font Size</span>
                      <input
                        type="number"
                        value={field.font_size}
                        onChange={(e) => updateField(i, { font_size: Number(e.target.value) })}
                        className="w-full mt-1 px-2 py-1 text-sm border border-stone-300 rounded"
                      />
                    </label>

                    {/* Font Color */}
                    <label className="block">
                      <span className="text-xs text-stone-500">Color</span>
                      <div className="flex gap-2 mt-1">
                        <input
                          type="color"
                          value={field.font_color}
                          onChange={(e) => updateField(i, { font_color: e.target.value })}
                          className="h-8 w-10 border border-stone-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={field.font_color}
                          onChange={(e) => updateField(i, { font_color: e.target.value })}
                          className="flex-1 px-2 py-1 text-sm border border-stone-300 rounded"
                        />
                      </div>
                    </label>

                    {/* Alignment */}
                    <label className="block">
                      <span className="text-xs text-stone-500">Alignment</span>
                      <select
                        value={field.alignment}
                        onChange={(e) =>
                          updateField(i, {
                            alignment: e.target.value as "left" | "center" | "right",
                          })
                        }
                        className="w-full mt-1 px-2 py-1 text-sm border border-stone-300 rounded"
                      >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </label>

                    {/* Font Family */}
                    <label className="block">
                      <span className="text-xs text-stone-500">Font</span>
                      <select
                        value={field.font_family}
                        onChange={(e) => updateField(i, { font_family: e.target.value })}
                        className="w-full mt-1 px-2 py-1 text-sm border border-stone-300 rounded"
                      >
                        <option value="Helvetica">Helvetica</option>
                        <option value="Arial">Arial</option>
                        <option value="Times">Times New Roman</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Courier">Courier</option>
                      </select>
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addField}
            className="mt-3 w-full py-2 text-sm border-2 border-dashed border-stone-300 rounded-lg text-stone-500 hover:border-amber-400 hover:text-amber-600 transition-colors"
          >
            + Add Field
          </button>
        </div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors"
          whileTap={{ scale: 0.97 }}
        >
          {saving ? 'Saving...' : 'Save Field Positions'}
        </motion.button>

        {/* Zoom control */}
        <div className="bg-white border border-stone-200 rounded-lg p-3">
          <label className="block text-xs text-stone-500 mb-1">Zoom: {Math.round(scale * 100)}%</label>
          <input
            type="range"
            min={0.1}
            max={1.0}
            step={0.01}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
