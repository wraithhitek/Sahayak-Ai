'use client'

interface StudyPlanGeneratorProps {
  numLectures: string
  lectureDuration: string
}

export default function StudyPlanGenerator({
  numLectures,
  lectureDuration,
}: StudyPlanGeneratorProps) {
  const totalLectures = parseInt(numLectures)
  const duration = parseInt(lectureDuration)

  if (!totalLectures || !duration) return null

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🗓️ Study Plan:</h3>
      <ul className="space-y-2">
        {Array.from({ length: totalLectures }).map((_, index) => (
          <li
            key={index}
            className="border-l-4 border-purple-600 pl-4 py-2 bg-purple-50 text-sm text-gray-700 rounded-md shadow-sm"
          >
            <strong>Lecture {index + 1}:</strong> {duration} mins – Topic: (To be generated)
          </li>
        ))}
      </ul>
    </div>
  )
}
