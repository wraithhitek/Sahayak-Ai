'use client'

import { useState } from 'react'

export default function NotesLimitSelector() {
  const [limit, setLimit] = useState('')

  const limits = ['100 words', '250 words', '500 words', '750 words', '1000+ words']

  return (
    <div className="mt-6 space-y-2">
      <label className="text-gray-700 font-medium">Select Notes Word Limit:</label>

      <select
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        className="w-full border-2 border-dashed border-black rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 hover:border-purple-600 transition duration-300"
      >
        <option value="">-- Select word limit --</option>
        {limits.map((wordCount) => (
          <option key={wordCount} value={wordCount}>
            {wordCount}
          </option>
        ))}
      </select>

      {limit && (
        <p className="text-sm text-green-600">
          ✅ Notes will be limited to <strong>{limit}</strong>
        </p>
      )}
    </div>
  )
}
