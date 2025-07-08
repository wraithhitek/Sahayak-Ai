'use client'

import { useState } from 'react'

export default function FunFactsBox({ notesGenerated }: { notesGenerated: boolean }) {
  const [content, setContent] = useState<string | null>(null)

  const fakeContent = `
🌟 Fun Facts:

1. Water can exist in all three states: solid, liquid, and gas.
2. The Sun drives the water cycle by providing heat energy.
3. Clouds can weigh over a million pounds!

🧠 Differences Table:

| Concept         | Evaporation                  | Condensation                 |
|-----------------|------------------------------|------------------------------|
| Definition      | Liquid to vapor               | Vapor to liquid              |
| Process         | Heat causes water to rise     | Cooling causes clouds to form|
| Occurs In       | Lakes, rivers, oceans         | Atmosphere                   |
`

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        ✨ Fun Facts & Differences:
      </h3>

      {!notesGenerated ? (
        <div className="p-4 border-2 border-dashed border-gray-400 text-gray-500 text-center rounded-lg">
          This section will appear once notes are generated.
        </div>
      ) : content ? (
        <div className="border border-gray-300 bg-gray-50 p-4 rounded-lg max-h-[300px] overflow-y-auto whitespace-pre-wrap shadow-sm text-sm leading-relaxed">
          {content}
        </div>
      ) : (
        <div className="p-4 border-2 border-dashed border-gray-400 text-gray-500 text-center rounded-lg">
          No content yet. Click "Generate Demo" to view example fun facts & differences.
        </div>
      )}

      {notesGenerated && (
        <div className="mt-4 space-x-3">
          <button
            onClick={() => setContent(fakeContent)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Generate Demo
          </button>
          <button
            onClick={() => setContent(null)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}
