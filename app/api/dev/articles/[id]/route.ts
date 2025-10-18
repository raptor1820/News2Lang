import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params

  // Return a sample article for development
  const sample = {
    id: Number(id) || 1,
    title: `Sample Article ${id}`,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.",
    source_url: 'https://example.com',
    language: 'english',
  }

  return NextResponse.json(sample)
}
