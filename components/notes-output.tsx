'use client'

import { useEffect, useState } from 'react'

export default function NotesOutput({
  notes,
  setNotes,
}: {
  notes: string | null
  setNotes: (value: string) => void
}) {
  const [loading, setLoading] = useState(false)

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-2">📝 Notes:</h3>

      {loading ? (
        <div className="p-4 border-2 border-dashed border-gray-400 text-purple-600 text-center rounded-lg animate-pulse">
          Generating notes...
        </div>
      ) : !notes ? (
        <div className="p-4 border-2 border-dashed border-gray-400 text-gray-500 text-center rounded-lg">
          Notes will appear here after generation.
        </div>
      ) : (
        <div className="border border-gray-300 bg-gray-50 p-4 rounded-lg max-h-[300px] overflow-y-auto whitespace-pre-wrap shadow-sm">
          {notes}
        </div>
      )}

      <div className="mt-4 space-x-3">
        <button
          onClick={() => setNotes('')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Clear Notes
        </button>
      </div>
    </div>
  )
}
