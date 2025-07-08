'use client'

import { useState, useEffect } from 'react'

export default function NotesOutput() {
  const [notes, setNotes] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fakeNotes = `
🌀 Water Cycle Notes:

1. The water cycle describes how water moves through the Earth’s atmosphere and surface.

2. Key steps:
   - ☀️ Evaporation: Sun turns water into vapor.
   - ☁️ Condensation: Vapor cools and forms clouds.
   - 🌧️ Precipitation: Clouds release water as rain/snow.
   - 🌊 Collection: Water returns to oceans/rivers.

3. Importance:
   - Regulates Earth's climate
   - Supports plant and animal life
   - Recycles water naturally
`

  const handleGenerate = () => {
    setLoading(true)
    setTimeout(() => {
      setNotes(fakeNotes)
      setLoading(false)
    }, 2000)
  }

  const handleClear = () => {
    setNotes(null)
    setLoading(false)
  }

  return (
    <div className="mt-10 space-y-4">
      <h3 className="text-2xl font-bold text-purple-800">📝 AI-Generated Notes</h3>
      <p className="text-sm text-gray-500">Preview of the notes based on your uploaded syllabus.</p>

      {loading && (
        <div className="p-4 border-2 border-dashed border-yellow-300 bg-yellow-50 text-yellow-700 text-center rounded-lg animate-pulse">
          Generating notes with AI... ✨
        </div>
      )}

      {!loading && notes && (
        <div className="border-2 border-dashed border-purple-400 bg-purple-50 p-4 rounded-lg max-h-[300px] overflow-y-auto whitespace-pre-wrap shadow-inner text-gray-800 text-sm leading-relaxed">
          {notes}
        </div>
      )}

      {!loading && !notes && (
        <div className="p-4 border-2 border-dashed border-gray-400 text-gray-500 text-center rounded-lg">
          Notes will appear here after generation.
        </div>
      )}

      <div className="mt-2 space-x-3">
        <button
          onClick={handleGenerate}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Generate Demo Notes
        </button>
        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Clear Notes
        </button>
      </div>
    </div>
  )
}
