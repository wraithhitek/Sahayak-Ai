'use client'

export default function SubjectAndInstructionInputs({
  subject,
  setSubject,
  instructions,
  setInstructions,
}: {
  subject: string
  setSubject: (value: string) => void
  instructions: string
  setInstructions: (value: string) => void
}) {
  return (
    <div className="mt-6 space-y-4">
      <div>
        <label className="block text-gray-700 font-medium mb-1">Subject Name:</label>
        <input
          type="text"
          placeholder="Type subject name..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border-2 border-dashed border-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 hover:border-purple-600 transition duration-300"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">Instructions for Notes Generation:</label>
        <textarea
          placeholder="Type instructions for content generation (e.g. Make the notes interesting, use real-life examples)"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full border-2 border-dashed border-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 hover:border-purple-600 transition duration-300"
          rows={3}
        />
      </div>
    </div>
  )
}
