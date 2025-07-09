'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const difficultyLevels = [
  { value: 'easy', title: 'Easy', description: 'Suitable for beginners' },
  { value: 'medium', title: 'Medium', description: 'Somewhat challenging' },
  { value: 'hard', title: 'Hard', description: 'In-depth explanations' },
  { value: 'expert', title: 'Expert', description: 'Advanced content & depth' }
]

export default function DifficultySelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<null | typeof difficultyLevels[0]>(null)

  const toggleDropdown = () => setIsOpen((prev) => !prev)
  const handleSelect = (level: typeof difficultyLevels[0]) => {
    setSelected(level)
    setIsOpen(false)
  }

  return (
    <div className="relative mt-6">
      <p className="text-gray-700 font-medium mb-2">Select Difficulty Level:</p>

      <div
        onClick={toggleDropdown}
        className={`w-full border-2 border-dashed rounded-lg px-4 py-3 bg-white cursor-pointer
          ${isOpen ? 'border-purple-600' : 'border-black'}
          hover:border-purple-600 transition duration-300`}
      >
        <div className="flex justify-between items-center">
          <span>
            {selected ? selected.title : '-- Select difficulty --'}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 bg-white mt-1 w-full max-h-60 overflow-y-auto border border-purple-300 rounded-lg shadow-lg">
          {difficultyLevels.map((level) => (
            <div
              key={level.value}
              onClick={() => handleSelect(level)}
              className="px-4 py-2 hover:bg-purple-100 cursor-pointer border-b border-gray-100"
            >
              <p className="text-sm font-medium">{level.title}</p>
              <p className="text-xs text-gray-500">{level.description}</p>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <p className="text-sm text-green-600 mt-2">
          ✅ Difficulty set to: <strong>{selected.title}</strong>
        </p>
      )}
    </div>
  )
}
