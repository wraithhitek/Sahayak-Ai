'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const gradeOptions = [
  { value: '1', title: 'Grade 1', description: 'Basic Introduction to Subjects' },
  { value: '2', title: 'Grade 2', description: 'Simple Concepts & Practice' },
  { value: '3', title: 'Grade 3', description: 'More Practice with Examples' },
  { value: '4', title: 'Grade 4', description: 'Start of Intermediate Concepts' },
  { value: '5', title: 'Grade 5', description: 'Pre-Middle School Topics' },
  { value: '6', title: 'Grade 6', description: 'Middle School Entry Level' },
  { value: '7', title: 'Grade 7', description: 'Slightly Complex Ideas' },
  { value: '8', title: 'Grade 8', description: 'Foundation for High School' },
  { value: '9', title: 'Grade 9', description: 'High School Concepts Start' },
  { value: '10', title: 'Grade 10', description: 'Important Board Year' },
  { value: '11', title: 'Grade 11', description: 'Streams Begin (Sci/Com/Arts)' },
  { value: '12', title: 'Grade 12', description: 'Board Exam Year & Revision' }
]

export default function GradeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGrade, setSelectedGrade] = useState<null | typeof gradeOptions[0]>(null)

  const toggleDropdown = () => setIsOpen((prev) => !prev)
  const handleSelect = (grade: typeof gradeOptions[0]) => {
    setSelectedGrade(grade)
    setIsOpen(false)
  }

  return (
    <div className="relative mt-6">
      <p className="text-gray-700 font-medium mb-2">Select Grade:</p>

      <div
        onClick={toggleDropdown}
        className={`w-full border-2 border-dashed rounded-lg px-4 py-3 bg-white cursor-pointer
          ${isOpen ? 'border-purple-600' : 'border-black'}
          hover:border-purple-600 transition duration-300`}
      >
        <div className="flex justify-between items-center">
          <span>
            {selectedGrade ? selectedGrade.title : '-- Select your grade --'}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 bg-white mt-1 w-full max-h-60 overflow-y-auto border border-purple-300 rounded-lg shadow-lg">
          {gradeOptions.map((grade) => (
            <div
              key={grade.value}
              onClick={() => handleSelect(grade)}
              className="px-4 py-2 hover:bg-purple-100 cursor-pointer border-b border-gray-100"
            >
              <p className="text-sm font-medium">{grade.title}</p>
              <p className="text-xs text-gray-500">{grade.description}</p>
            </div>
          ))}
        </div>
      )}

      {selectedGrade && (
        <p className="text-sm text-green-600 mt-2">
          ✅ You selected: <strong>{selectedGrade.title}</strong>
        </p>
      )}
    </div>
  )
}
