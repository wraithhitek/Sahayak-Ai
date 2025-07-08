'use client'

interface StudyOptionsCheckboxesProps {
  createPlan: boolean
  setCreatePlan: (value: boolean) => void
  numLectures: string
  setNumLectures: (value: string) => void
  lectureDuration: string
  setLectureDuration: (value: string) => void
  includeQuizzes: boolean
  setIncludeQuizzes: (value: boolean) => void
  includeDiagrams: boolean
  setIncludeDiagrams: (value: boolean) => void
  includeOther: boolean
  setIncludeOther: (value: boolean) => void
}

export default function StudyOptionsCheckboxes({
  createPlan,
  setCreatePlan,
  numLectures,
  setNumLectures,
  lectureDuration,
  setLectureDuration,
  includeQuizzes,
  setIncludeQuizzes,
  includeDiagrams,
  setIncludeDiagrams,
  includeOther,
  setIncludeOther,
}: StudyOptionsCheckboxesProps) {
  return (
    <div className="mt-8 space-y-4">
      <label className="block text-gray-700 font-semibold text-lg mb-2">
        Select Additional Options:
      </label>

      {/* Checkboxes */}
      <div className="space-y-3">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={createPlan}
            onChange={(e) => setCreatePlan(e.target.checked)}
            className="w-5 h-5 text-purple-600"
          />
          <span>Create Study Plan</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeQuizzes}
            onChange={(e) => setIncludeQuizzes(e.target.checked)}
            className="w-5 h-5 text-purple-600"
          />
          <span>Include Interactive Quizzes</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeDiagrams}
            onChange={(e) => setIncludeDiagrams(e.target.checked)}
            className="w-5 h-5 text-purple-600"
          />
          <span>Include Diagrams and Flowcharts</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeOther}
            onChange={(e) => setIncludeOther(e.target.checked)}
            className="w-5 h-5 text-purple-600"
          />
          <span>Include Fun Facts / Differences Tables</span>
        </label>
      </div>

      {/* Conditional Inputs if Study Plan Checked */}
      {createPlan && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              No. of Lectures:
            </label>
            <input
              type="number"
              placeholder="e.g. 30"
              value={numLectures}
              onChange={(e) => setNumLectures(e.target.value)}
              className="w-full border-2 border-dashed border-black rounded-lg px-4 py-2 focus:outline-none hover:border-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Duration of each Lecture (mins):
            </label>
            <input
              type="number"
              placeholder="e.g. 40"
              value={lectureDuration}
              onChange={(e) => setLectureDuration(e.target.value)}
              className="w-full border-2 border-dashed border-black rounded-lg px-4 py-2 focus:outline-none hover:border-purple-600"
            />
          </div>
        </div>
      )}
    </div>
  )
}
