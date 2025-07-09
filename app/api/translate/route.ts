import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text, targetLang } = await req.json()

    if (!text || !targetLang) {
      return NextResponse.json({ error: 'Missing text or target language' }, { status: 400 })
    }

    const response = await fetch('https://translate.argosopentech.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text',
      }),
    })

    const data = await response.json()

    if (!response.ok || !data.translatedText) {
      console.error('LibreTranslate error:', data)
      return NextResponse.json({ error: 'Translation failed', detail: data }, { status: 500 })
    }

    return NextResponse.json({ translatedText: data.translatedText })
  } catch (err: any) {
    console.error('API Crash:', err)
    return NextResponse.json({ error: 'Server crashed', message: err.message }, { status: 500 })
  }
}
