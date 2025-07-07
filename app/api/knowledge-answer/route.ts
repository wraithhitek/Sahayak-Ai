import { type NextRequest, NextResponse } from "next/server"
import { generateKnowledgeAnswer } from "@/lib/google-ai"

export async function POST(request: NextRequest) {
  try {
    const { question, language, gradeLevel } = await request.json()

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 })
    }

    const answer = await generateKnowledgeAnswer(question, language, gradeLevel)

    return NextResponse.json(answer)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to generate answer" }, { status: 500 })
  }
}
