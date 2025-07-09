'use client'

import { useState } from 'react'
import Image from 'next/image'

const visuals = [
  { src: '/images/sample-diagram-1.png', alt: 'Water Cycle Diagram' },
  { src: '/images/sample-chart-1.png', alt: 'Evaporation Flowchart' },
  { src: '/images/sample-table-1.png', alt: 'Difference Table' }
]

export default function VisualSection({ notesGenerated }: { notesGenerated: boolean }) {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  if (!notesGenerated) {
    return (
      <div className="mt-10 text-gray-400 italic text-center">
        No visuals to show until notes are generated.
      </div>
    )
  }

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-2">🖼️ Diagrams, Charts & Tables:</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visuals.map((visual, idx) => (
          <div
            key={idx}
            className="border border-gray-300 rounded-lg p-2 cursor-pointer hover:shadow-md"
            onClick={() => setFullscreenImage(visual.src)}
          >
            <Image
              src={visual.src}
              alt={visual.alt}
              width={300}
              height={200}
              className="object-contain w-full h-[180px]"
            />
            <p className="text-xs text-center text-gray-500 mt-2">{visual.alt}</p>
          </div>
        ))}
      </div>

      {fullscreenImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ❌
          </button>
          <div className="max-w-4xl max-h-[90vh] overflow-auto bg-white p-4 rounded-lg">
            <Image
              src={fullscreenImage}
              alt="Full Screen Visual"
              width={800}
              height={600}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
