'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import FloatingElements from '@/components/ui/floating-elements'
import SyllabusUpload from '@/components/syllabus-upload'
import GradeSelector from '@/components/grade-selector'
import DifficultySelector from '@/components/difficulty-selector'
import NotesLimitSelector from '@/components/notes-limit-selector'
import SubjectAndInstructionInputs from '@/components/subject-and-instruction-inputs'
import StudyOptionsCheckboxes from '@/components/Study-options-checkboxes'
import GenerateControls from '@/components/generate-controls'
import NotesOutput from '@/components/notes-output'
import StudyPlanDisplay from '@/components/study-plan'
import FunFactsBox from '@/components/fun-facts'
import VisualSection from '@/components/visual-section'
import InteractiveQuizzes from '@/components/interactive-quizzes'
import PDFExport from '@/components/pdf-export'
import StudyPlanGenerator from '@/components/study-plan-generator'

export default function TeachingAssistant() {
  const [showFirstText, setShowFirstText] = useState(false)
  const [showSecondText, setShowSecondText] = useState(false)
  const [showInterface, setShowInterface] = useState(false)

  const [createPlan, setCreatePlan] = useState(false)
  const [notesGenerated, setNotesGenerated] = useState(false)
  const [mergeAndDownload, setMergeAndDownload] = useState(false)

  const [numLectures, setNumLectures] = useState('')
  const [lectureDuration, setLectureDuration] = useState('')
  const [includeQuizzes, setIncludeQuizzes] = useState(false)
  const [includeDiagrams, setIncludeDiagrams] = useState(false)
  const [includeOther, setIncludeOther] = useState(false)
  const [subject, setSubject] = useState('')
const [instruction, setInstruction] = useState('')
  useEffect(() => {
    const t1 = setTimeout(() => setShowFirstText(true), 1000)
    const t2 = setTimeout(() => setShowSecondText(true), 3000)
    const t3 = setTimeout(() => setShowInterface(true), 5000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  const allContentReady =
    notesGenerated &&
    (!createPlan || (numLectures && lectureDuration)) &&
    (!includeQuizzes || includeQuizzes) &&
    (!includeDiagrams || includeDiagrams) &&
    (!includeOther || includeOther)

  if (!showInterface) {
    return (
      <>
        <FloatingElements />
        <main>
          <div className="min-h-screen flex items-center justify-center bg-white px-6 py-10 relative">
            <div className="relative w-[400px] h-[400px] ml-[200px]">
              <Image
                src="/images/small-robot.png"
                alt="Teaching Robot"
                width={400}
                height={400}
                className="object-contain ml-[20px]"
              />
              <div className="absolute -top-10 -left-40 w-[300px] bg-white border-2 border-purple-300 shadow-md rounded-xl px-4 py-3">
                {showFirstText && (
                  <p className="text-sm font-semibold text-gray-800 animate-fade-in">
                    Hello! I am Your Personal Teaching Companion
                  </p>
                )}
                {showSecondText && (
                  <p className="text-sm text-purple-600 mt-1 animate-fade-in">
                    How can I help you today?
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <FloatingElements />
      <div className="space-y-4 px-8 py-6 min-h-screen bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">
          🎓 AI Assistant for Indian Teachers
        </h2>

        <div id="pdf-content">
          <SyllabusUpload />
          <GradeSelector />
          <DifficultySelector />
          <NotesLimitSelector />
          <StudyOptionsCheckboxes
            createPlan={createPlan}
            setCreatePlan={setCreatePlan}
            numLectures={numLectures}
            setNumLectures={setNumLectures}
            lectureDuration={lectureDuration}
            setLectureDuration={setLectureDuration}
            includeQuizzes={includeQuizzes}
            setIncludeQuizzes={setIncludeQuizzes}
            includeDiagrams={includeDiagrams}
            setIncludeDiagrams={setIncludeDiagrams}
            includeOther={includeOther}
            setIncludeOther={setIncludeOther}
          />

          <SubjectAndInstructionInputs 
          subject={subject}
  setSubject={setSubject}
  instruction={instruction}
  setInstruction={setInstruction} />
          <GenerateControls createPlanChecked={createPlan} setNotesGenerated={setNotesGenerated} />

          <NotesOutput />
          <StudyPlanDisplay createPlan={createPlan} subject={subject} />
          <FunFactsBox notesGenerated={notesGenerated} />
          <VisualSection notesGenerated={notesGenerated} />
          <InteractiveQuizzes showQuizzes={includeQuizzes} />

          {allContentReady && (
            <>
              <div className="mt-6">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={mergeAndDownload}
                    onChange={(e) => setMergeAndDownload(e.target.checked)}
                    className="mr-2"
                  />
                  Merge all generated content and download as PDF
                </label>
              </div>

              <PDFExport enabled={mergeAndDownload && notesGenerated && createPlan} />

              {createPlan && numLectures && lectureDuration && (
                <StudyPlanGenerator
                  numLectures={numLectures}
                  lectureDuration={lectureDuration}
                />
              )}

              <div className="mt-10 text-center">
                <div className="text-green-600 text-5xl mb-2 animate-bounce">✅</div>
                <h4 className="text-lg font-semibold text-gray-700">
                  All content generated successfully!
                </h4>
                <div className="mt-4 flex justify-center gap-4 flex-wrap">
                  <button
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                    onClick={() => window.print()}
                  >
                    🖨️ Print
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    🔁 Edit Inputs
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => window.location.reload()}
                  >
                    🔄 Start Over
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <p className="text-gray-400 italic text-center mt-10">
          (More options coming soon: grade selector, difficulty, content limit, quizzes, diagrams, PDF export...)
        </p>
      </div>
    </>
  )
}
