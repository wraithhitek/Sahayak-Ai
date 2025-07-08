'use client'

export default function SubjectAndInstructionInputs({
  subject,
  setSubject,
  instruction,
  setInstruction
}: {
  subject: string
  setSubject: (value: string) => void
  instruction: string
  setInstruction: (value: string) => void
}) {
  return (
    <div className="mt-6 space-y-4">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Subject Name:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Type subject name..."
          className="w-full border-2 border-dashed border-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 hover:border-purple-600 transition duration-300"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Instructions for Notes Generation:</label>
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Type instructions for content generation (e.g. Make the notes interesting, use real-life examples)"
          className="w-full border-2 border-dashed border-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 hover:border-purple-600 transition duration-300"
          rows={3}
        />
      </div>
    </div>
  )
}
