'use client'

import { useState } from 'react'

export default function StudyPlanDisplay({
  createPlan,
  subject
}: {
  createPlan: boolean
  subject: string
}) {
  const [studyPlan, setStudyPlan] = useState<string | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)

  const fakePlan = `
📘 Study Plan – ${subject || 'Class 6 Science'} (30 Lectures)

Week 1:
- Lecture 1: Introduction to the Water Cycle
- Lecture 2: Evaporation
- Lecture 3: Condensation
- Lecture 4: Precipitation
- Lecture 5: Collection & Recap

Week 2:
- Lecture 6: States of Water
- Lecture 7: Role of Sun in the Cycle
- Lecture 8: Quiz 1 (Based on Water Cycle)
...

Week 5:
- Lecture 26: Revision
- Lecture 27: Fun Activities
- Lecture 28: Test Day
- Lecture 29: Test Review
- Lecture 30: Final Wrap-Up + Feedback
`

  if (!createPlan) return null

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-2">📅 Study Plan:</h3>

      {!studyPlan ? (
        <div className="p-4 border-2 border-dashed border-gray-400 text-gray-500 text-center rounded-lg">
          No study plan created yet.
        </div>
      ) : (
        <div className="border border-gray-300 bg-gray-50 p-4 rounded-lg max-h-[300px] overflow-y-auto whitespace-pre-wrap shadow-sm text-sm leading-relaxed">
          {studyPlan}
        </div>
      )}

      <div className="mt-4 flex gap-3 flex-wrap">
        <button
          onClick={() => setStudyPlan(fakePlan)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Generate Demo Plan
        </button>

        {studyPlan && (
          <>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => alert("✅ Study plan saved!")}
            >
              Save Plan
            </button>
            <button
              className={`px-4 py-2 rounded transition text-white ${
                isFollowing ? 'bg-gray-500' : 'bg-purple-600 hover:bg-purple-700'
              }`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? 'Following Plan...' : 'Follow this Study Plan'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
