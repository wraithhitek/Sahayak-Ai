'use client'

import { useState } from 'react'

export default function GenerateControls({
  createPlanChecked,
  setNotesGenerated,
}: {
  createPlanChecked: boolean
  setNotesGenerated: (value: boolean) => void
}) {
  const [currentLecture, setCurrentLecture] = useState(1)

  const handleGenerateNotes = () => {
    alert('Generating Notes...')
    setNotesGenerated(true) // ✅ This is the key update
  }

  const handleCreatePlan = () => {
    alert('Creating Study Plan...')
    // You can call other logic here if needed
  }

  return (
    <div className="mt-8 space-y-4">
      {/* Always show Generate Notes */}
      <button
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        onClick={handleGenerateNotes}
      >
        ✍️ Generate Notes
      </button>

      {/* Show Study Plan Controls if enabled */}
      {createPlanChecked && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-gray-700 font-medium">
              🗓 Generating Notes for Lecture {currentLecture}
            </p>

            <div className="space-x-2">
              <button
                onClick={() => setCurrentLecture((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
              >
                ⬅️ Previous
              </button>
              <button
                onClick={() => setCurrentLecture((prev) => prev + 1)}
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
              >
                ➡️ Next
              </button>
            </div>
          </div>

          <button
            onClick={handleCreatePlan}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg"
          >
            📅 Create Study Plan
          </button>
        </div>
      )}
    </div>
  )
}
