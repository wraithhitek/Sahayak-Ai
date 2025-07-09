'use client'

import { useState } from 'react'

// ✅ Safe client-side import
const html2pdf = typeof window !== 'undefined' ? require('html2pdf.js') : null

export default function PDFExport({ enabled }: { enabled: boolean }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = () => {
    // ✅ Check if running in browser and html2pdf is available
    if (typeof window === 'undefined' || !html2pdf) return

    const element = document.getElementById('pdf-content')
    if (!element) return

    setDownloading(true)

    const opt = {
      margin: 0.5,
      filename: 'Teaching_Material.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    }

    // ✅ Wrap in try-catch for extra safety
    try {
      html2pdf().from(element).set(opt).save().finally(() => {
        setDownloading(false)
        alert('✅ PDF downloaded successfully!')
      })
    } catch (error) {
      console.error('❌ PDF generation failed:', error)
      setDownloading(false)
      alert('❌ Failed to generate PDF. Please try again.')
    }
  }

  if (!enabled) return null

  return (
    <button
      onClick={handleDownload}
      className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
      disabled={downloading}
    >
      {downloading ? 'Generating PDF...' : '📥 Download All as PDF'}
    </button>
  )
}
