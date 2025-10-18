'use client'

import React, { useEffect, useRef, useState } from 'react'

type TooltipInfo = {
  text: string
  left: number
  top: number
  width: number
}

// ...existing code...
const ARTICLE_ID = 'lorem-1'
const ARTICLE_TITLE = 'Lorem Ipsum — Sample Article'
const ARTICLE_CONTENT = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
`

export default function Page() {
  // Tokenize but preserve spaces & punctuation
  const tokens = ARTICLE_CONTENT.match(/\w+[-']?\w*|\s+|[^\s\w]+/g) || []

  const spanRefs = useRef<Array<HTMLSpanElement | null>>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [statusMsg, setStatusMsg] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)

  // Simple placeholder "definition" generator
  const getDefinition = (word: string) => {
    if (!word.trim() || /\s+/.test(word)) return null
    return {
      lemma: word.replace(/[^\w'-]/g, ''),
      translation: `${word} (translation)`,
      explanation: `Short explanation for "${word}". Use this to explain meaning or usage.`,
      example: `Example sentence with "${word}".`,
    }
  }

  useEffect(() => {
    if (hoveredIndex === null) {
      setTooltip(null)
      return
    }
    const el = spanRefs.current[hoveredIndex]
    if (!el) {
      setTooltip(null)
      return
    }
    const rect = el.getBoundingClientRect()
    setTooltip({
      text: el.innerText,
      left: rect.left + rect.width / 2,
      top: rect.top - 8,
      width: rect.width,
    })
  }, [hoveredIndex])

  // allow selecting a phrase via double-click (native selection)
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      // if click outside tokens, clear selection
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) {
        setSelectedIndex(null)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  const handleWordClick = (idx: number) => {
    setSelectedIndex((prev) => (prev === idx ? null : idx))
  }

  const handleGenerateLesson = async () => {
    setGenerating(true)
    setStatusMsg('Triggering dev lesson generation...')
    try {
      // Dev-only: attempt to call a dev API route (may not exist yet). Fallback to local simulation.
      const payload = {
        article_id: ARTICLE_ID,
        title: ARTICLE_TITLE,
        content: ARTICLE_CONTENT.trim(),
      }
      const res = await fetch('/api/dev/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        const json = await res.json().catch(() => null)
        setStatusMsg(json ? `Lesson created (id: ${json.id ?? 'unknown'})` : 'Lesson created (dev)')
      } else {
        // fallback message if endpoint missing
        setStatusMsg('Dev endpoint not available — simulated lesson created locally.')
        // simulate delay
        await new Promise((r) => setTimeout(r, 700))
      }
    } catch (err) {
      setStatusMsg('Network error — lesson generation simulated.')
    } finally {
      setGenerating(false)
      setTimeout(() => setStatusMsg(null), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-blue-600">{ARTICLE_TITLE}</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateLesson}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md text-sm font-medium"
              title="Dev only: trigger lesson generation for this article"
              disabled={generating}
            >
              {generating ? 'Generating…' : 'DEV: Generate Lesson'}
            </button>
            {statusMsg && <div className="text-sm text-gray-600">{statusMsg}</div>}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8">
          <article
            ref={containerRef}
            className="prose max-w-none bg-white p-6 rounded-md shadow-sm relative"
            aria-labelledby="article-title"
          >
            <h2 id="article-title" className="sr-only">
              {ARTICLE_TITLE}
            </h2>

            <div className="mb-4 text-sm text-gray-500">
              Hover words to see quick tips. Click a word to pin a definition in the right-hand panel.
            </div>

            <div className="leading-7 text-lg">
              {tokens.map((tok, idx) => {
                const isSpace = /^\s+$/.test(tok)
                const def = getDefinition(tok)
                const isSelected = selectedIndex === idx
                const isHovered = hoveredIndex === idx

                // keep spaces as plain text to preserve spacing
                if (isSpace) {
                  return <span key={idx}>{tok}</span>
                }

                return (
                  <span
                    key={idx}
                    ref={(el) => { spanRefs.current[idx] = el }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex((prev) => (prev === idx ? null : prev))}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleWordClick(idx)
                    }}
                    className={`relative cursor-pointer select-none px-0.5 rounded ${
                      isSelected ? 'bg-yellow-100' : isHovered ? 'bg-gray-100' : ''
                    }`}
                    aria-label={def ? `Definition: ${def.translation}` : undefined}
                    title={def ? def.translation : undefined}
                  >
                    {tok}
                    {/* small inline hint for words we have "definitions" for */}
                    {def && (
                      <span className="ml-1 text-xs align-middle text-blue-500 hidden md:inline">
                        ▾
                      </span>
                    )}
                  </span>
                )
              })}
            </div>

            {/* floating tooltip */}
            {tooltip && (
              <div
                className="pointer-events-none z-50 fixed transform -translate-x-1/2"
                style={{
                  left: tooltip.left,
                  top: Math.max(tooltip.top - 6, 8),
                }}
              >
                <div className="bg-black text-white text-xs rounded px-2 py-1 shadow">
                  {tooltip.text.trim() || '•'}
                </div>
              </div>
            )}
          </article>

          {/* Right panel */}
          <aside className="space-y-4">
            <div className="sticky top-24 bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-semibold">Reader Tools</h3>
              <p className="text-sm text-gray-600 mb-3">
                Click a word to see a guided explanation. Double-click or select text in the article to
                try phrase selection.
              </p>

              <div className="border rounded-md p-3 bg-gray-50">
                <h4 className="font-medium text-sm mb-2">Selected</h4>
                {!selectedIndex && <div className="text-sm text-gray-500">No word selected.</div>}
                {selectedIndex !== null && (
                  (() => {
                    const raw = tokens[selectedIndex]
                    const def = getDefinition(raw)!
                    return (
                      <div>
                        <div className="text-sm font-semibold">{def.lemma}</div>
                        <div className="text-sm text-gray-700 mt-1">{def.translation}</div>
                        <div className="text-sm text-gray-600 mt-2">{def.explanation}</div>
                        <div className="text-sm italic text-gray-500 mt-2">{def.example}</div>
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(`${def.lemma} — ${def.translation}`)
                              setStatusMsg('Copied flashcard text')
                              setTimeout(() => setStatusMsg(null), 1500)
                            }}
                            className="text-sm px-2 py-1 bg-blue-600 text-white rounded"
                          >
                            Copy
                          </button>
                          <button
                            onClick={() => {
                              // quick highlight toggle for the clicked word
                              setSelectedIndex(null)
                              setStatusMsg('Highlight removed')
                              setTimeout(() => setStatusMsg(null), 1000)
                            }}
                            className="text-sm px-2 py-1 border rounded"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )
                  })()
                )}
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-sm mb-2">Article Summary</h4>
                <div className="text-sm text-gray-700">
                  This is a sample article (Lorem ipsum) used for testing the guided-reading UI. When the
                  backend is available, the DEV button will trigger lesson generation for the real article.
                </div>
              </div>
            </div>

            {/* quick glossary area */}
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h4 className="font-medium mb-2">Quick Glossary</h4>
              <ul className="text-sm space-y-2">
                {/* show a few automatically chosen words */}
                {Array.from(new Set(tokens.filter((t) => /^\w+$/.test(t) && t.length > 5))).slice(
                  0,
                  6
                ).map((w, i) => {
                  const def = getDefinition(w)!
                  return (
                    <li key={i} className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">{def.lemma}</div>
                        <div className="text-xs text-gray-500">{def.translation}</div>
                      </div>
                      <button
                        onClick={() => {
                          // find first token index matching this word
                          const idx = tokens.findIndex((t) => t === w)
                          if (idx >= 0) {
                            spanRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                            setSelectedIndex(idx)
                          }
                        }}
                        className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded"
                      >
                        Show
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}