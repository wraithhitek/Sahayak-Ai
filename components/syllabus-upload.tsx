'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function SyllabusUpload() {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [showFullscreen, setShowFullscreen] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setFileUrl(url)
    }
  }

  const handleRemove = () => {
    setFileUrl(null)
    setShowFullscreen(false)
  }

  return (
    <div>
      {!fileUrl && (
        <label className="border-2 border-dashed border-gray-400 text-gray-500 rounded-lg p-6 text-center block cursor-pointer hover:border-purple-500 transition-all duration-300">
          + Upload your syllabus
          <input
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}

      {fileUrl && (
        <div className="relative inline-block group">
          {/* ❌ Close icon in corner */}
          <button
            onClick={handleRemove}
            className="absolute top-1 right-1 text-gray-600 bg-white rounded-full shadow p-1 hover:text-red-600 hover:bg-gray-100 z-10"
            title="Remove syllabus"
          >
            ❌
          </button>

          <div
            onClick={() => setShowFullscreen(true)}
            className="border border-gray-300 rounded-lg p-2 cursor-pointer hover:shadow-md transition-all duration-300"
          >
            <p className="text-sm text-gray-500 mb-2">Click to view fullscreen</p>
            {fileUrl.endsWith('.pdf') ? (
              <embed src={fileUrl} type="application/pdf" className="w-[400px] h-[300px]" />
            ) : (
              <Image
                src={fileUrl}
                alt="Syllabus Preview"
                width={400}
                height={300}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}

      {showFullscreen && fileUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ❌
          </button>
          <div className="max-w-5xl max-h-[90vh] overflow-auto bg-white p-4 rounded-lg shadow-xl">
            {fileUrl.endsWith('.pdf') ? (
              <embed src={fileUrl} type="application/pdf" className="w-full h-[80vh]" />
            ) : (
              <Image
                src={fileUrl}
                alt="Fullscreen Syllabus"
                width={800}
                height={600}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
