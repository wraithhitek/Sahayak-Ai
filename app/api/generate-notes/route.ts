// app/api/generate-notes/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { subject, instructions } = await req.json();

    // ✅ Validate input
    if (!subject || !instructions) {
      return NextResponse.json(
        { error: 'Subject and instructions are required.' },
        { status: 400 }
      );
    }

    // ✅ Get Gemini Pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // ✅ Craft a clear and helpful prompt
    const prompt = `
You are an expert Indian teacher. Generate detailed, well-structured notes for the subject: "${subject}".
Follow these teacher instructions: ${instructions}

Your notes should include headings, bullet points, and explanations in simple, clear English.
Avoid unnecessary fluff. Format it in Markdown so it is easy to display.
    `;

    // ✅ Send prompt to Gemini API
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // ✅ Return the generated notes
    return NextResponse.json({ notes: text });
  } catch (error: any) {
    console.error('Gemini Notes Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate notes. Please try again.' },
      { status: 500 }
    );
  }
}
