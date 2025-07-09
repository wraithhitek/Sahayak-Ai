// app/api/generate-study-plan/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { subject, instructions } = await req.json();

    if (!subject || !instructions) {
      return NextResponse.json(
        { error: 'Subject and instructions are required.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
You are an expert Indian teacher creating a study plan for students.
Create a structured, day-wise study plan for the subject: "${subject}".
Follow these instructions: ${instructions}

Include topics, goals, and outcomes in a clear list format. Be simple, friendly, and concise.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ studyPlan: text });
  } catch (error) {
    console.error('Study plan generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate study plan.' },
      { status: 500 }
    );
  }
}
