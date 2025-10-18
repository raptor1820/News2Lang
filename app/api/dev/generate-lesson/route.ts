import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))

    // Simulate creating a lesson and return a toy lesson object
    const lesson = {
      id: Math.floor(Math.random() * 100000),
      article_id: body.article_id ?? null,
      title: body.title ? `Lesson: ${body.title}` : 'Generated Lesson (dev)',
      content: `Auto-generated lesson for article ${body.article_id ?? 'unknown'}`,
      vocabulary: [],
      grammar_points: [],
      difficulty: body.difficulty ?? 'intermediate',
      estimated_time_minutes: 10,
      created_at: new Date().toISOString(),
    }

    return NextResponse.json(lesson)
  } catch (err) {
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
