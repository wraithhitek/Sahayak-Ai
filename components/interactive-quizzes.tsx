'use client'

import { useState } from 'react'

type Question = {
  question: string
  options: string[]
  answer: string
}

export default function InteractiveQuizzes({ showQuizzes }: { showQuizzes: boolean }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})

  const demoQuestions: Question[] = [
    {
      question: "What causes water to evaporate?",
      options: ["Wind", "Sun's Heat", "Rain", "Clouds"],
      answer: "Sun's Heat"
    },
    {
      question: "Which process turns vapor into liquid?",
      options: ["Condensation", "Evaporation", "Precipitation", "Collection"],
      answer: "Condensation"
    }
  ]

  const handleOptionClick = (qIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: option }))
  }

  if (!showQuizzes) {
    return null
  }

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🧠 Interactive Quizzes:</h3>

      {questions.length === 0 ? (
        <div className="p-4 border-2 border-dashed border-gray-400 text-gray-500 text-center rounded-lg">
          No quiz generated. Click below to generate demo questions.
        </div>
      ) : (
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-lg">
              <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt) => {
                  const isSelected = selectedAnswers[index] === opt
                  const isCorrect = opt === q.answer
                  const isWrong = isSelected && !isCorrect

                  return (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(index, opt)}
                      className={`px-4 py-2 rounded border 
                        ${isCorrect && isSelected ? 'bg-green-200 border-green-600' :
                          isWrong ? 'bg-red-200 border-red-600' :
                          'bg-white border-gray-300 hover:border-purple-600'}
                      `}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setQuestions(demoQuestions)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Generate Demo Quiz
        </button>
        {questions.length > 0 && (
          <button
            onClick={() => {
              setQuestions([])
              setSelectedAnswers({})
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Clear Quiz
          </button>
        )}
      </div>
    </div>
  )
}
