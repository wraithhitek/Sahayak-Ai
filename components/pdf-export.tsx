'use client'

import { useState } from 'react'
// @ts-ignore
import html2pdf from 'html2pdf.js'

export default function PDFExport({ enabled }: { enabled: boolean }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = () => {
    const element = document.getElementById('pdf-content')
    if (!element) return

    setDownloading(true)

    const opt = {
      margin:       0.5,
      filename:     'Teaching_Material.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .finally(() => {
        setDownloading(false)
        alert('✅ PDF downloaded successfully!')
      })
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
