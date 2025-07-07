import { type NextRequest, NextResponse } from "next/server"
import { generateContent } from "@/lib/google-ai"

export async function POST(request: NextRequest) {
  try {
    const { prompt, language } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const content = await generateContent(prompt, language)

    return NextResponse.json({ content })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}
