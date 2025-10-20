"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type TooltipInfo = {
    text: string;
    left: number;
    top: number;
    width: number;
};

type Article = {
    id: number;
    title: string;
    content: string;
    source_url?: string;
    language?: string;
};

async function fetchArticle(id: string | number): Promise<Article | null> {
    try {
        const base = process.env.NEXT_PUBLIC_API_URL || "";
        const url = base
            ? `${base.replace(/\/$/, "")}/articles/${id}`
            : `/api/dev/articles/${id}`;
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.json();
    } catch (e) {
        return null;
    }
}

export default function ArticlePage({ params }: { params: { id: string } }) {
    const { id } = params;
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const spanRefs = useRef<Array<HTMLSpanElement | null>>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [statusMsg, setStatusMsg] = useState<string | null>(null);
    const [generating, setGenerating] = useState(false);

    // update tooltip position when hovered token changes
    useEffect(() => {
        if (hoveredIndex === null) {
            setTooltip(null);
            return;
        }
        const el = spanRefs.current[hoveredIndex];
        if (!el) {
            setTooltip(null);
            return;
        }
        const rect = el.getBoundingClientRect();
        setTooltip({
            text: el.innerText,
            left: rect.left + rect.width / 2,
            top: rect.top - 8,
            width: rect.width,
        });
    }, [hoveredIndex]);

    // allow selecting a phrase via double-click (native selection)
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(e.target as Node)) {
                setSelectedIndex(null);
            }
        };
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    // fetch article (kept as an effect so it runs client-side)
    useEffect(() => {
        let mounted = true;
        setLoading(true);

        // Dummy articles data
        const dummyArticles: { [key: string]: Article } = {
            "1": {
                id: 1,
                title: "Climate Change: New Study Reveals Alarming Trends",
                content:
                    "Scientists have discovered new evidence showing the accelerating pace of global warming and its impact on marine ecosystems. The study, published in a leading scientific journal, analyzed decades of data from ocean temperature monitoring stations around the world. Researchers found that marine ecosystems are experiencing unprecedented changes, with coral reefs bleaching at an alarming rate and fish populations migrating to cooler waters. The warming trend is affecting not only surface temperatures but also deep ocean currents that regulate global climate patterns. This comprehensive research highlights the urgent need for international cooperation to address climate change and protect vulnerable marine species.",
                source_url: "https://example.com/climate-change",
                language: "Spanish",
            },
            "2": {
                id: 2,
                title: "Tech Giants Announce Revolutionary AI Breakthrough",
                content:
                    "Major technology companies have unveiled a collaborative AI system that promises to transform healthcare diagnostics. The breakthrough involves advanced machine learning algorithms capable of detecting diseases at earlier stages than traditional methods. This revolutionary technology combines data from multiple sources, including medical imaging, genetic information, and patient history, to provide more accurate diagnoses. Healthcare professionals are optimistic that this development will significantly improve patient outcomes and reduce healthcare costs. The system has already shown promising results in clinical trials, correctly identifying various conditions with unprecedented accuracy.",
                source_url: "https://example.com/ai-breakthrough",
                language: "English",
            },
            "3": {
                id: 3,
                title: "Local Artists Showcase Traditional Crafts at Festival",
                content:
                    "The annual cultural festival brings together artisans from across the region to celebrate traditional craftwork. Visitors can observe master craftspeople demonstrating centuries-old techniques in pottery, weaving, and metalworking. The festival serves as an important platform for preserving cultural heritage and passing traditional skills to younger generations. Local authorities have invested in supporting these artisans, recognizing the economic and cultural value of traditional crafts. Interactive workshops allow festival-goers to try their hand at various crafts, creating memorable experiences and fostering appreciation for artisanal work.",
                source_url: "https://example.com/cultural-festival",
                language: "Spanish",
            },
            "4": {
                id: 4,
                title: "Economic Recovery Shows Promising Signs in Europe",
                content:
                    "European markets are showing renewed vigor as consumer confidence reaches pre-pandemic levels. Economic indicators suggest sustained growth across multiple sectors, with particularly strong performance in technology and renewable energy industries. Unemployment rates have decreased significantly, and business investment is increasing. Analysts attribute this recovery to effective government policies, successful vaccination campaigns, and the resilience of European businesses. However, experts caution that challenges remain, including supply chain disruptions and inflationary pressures that require careful management.",
                source_url: "https://example.com/economic-recovery",
                language: "English",
            },
            "5": {
                id: 5,
                title: "New Archaeological Discovery Rewrites Ancient History",
                content:
                    "Archaeologists have uncovered artifacts that challenge our understanding of early civilization trade routes. The discovery includes ancient coins, pottery, and tools that suggest far more extensive trade networks than previously believed. These findings indicate that ancient civilizations had sophisticated commercial relationships spanning thousands of miles. The artifacts show remarkable craftsmanship and provide evidence of cultural exchange between distant regions. Researchers are using advanced dating techniques and chemical analysis to learn more about the origins and significance of these remarkable discoveries.",
                source_url: "https://example.com/archaeology",
                language: "English",
            },
            "6": {
                id: 6,
                title: "Spanish Football Team Wins International Championship",
                content:
                    "In a thrilling final match, the national team secured victory with a last-minute goal. The championship game kept fans on the edge of their seats as both teams displayed exceptional skill and determination. The winning goal came in the 89th minute, sending supporters into jubilant celebration. This victory marks a historic achievement for Spanish football and caps off an impressive tournament performance. The team demonstrated exceptional teamwork, tactical discipline, and individual brilliance throughout the competition. Players and coaches credited their success to months of intensive preparation and unwavering support from fans.",
                source_url: "https://example.com/football-championship",
                language: "Spanish",
            },
        };

        // Use dummy data first, fallback to API
        const dummyArticle = dummyArticles[id];
        if (dummyArticle) {
            setArticle(dummyArticle);
            setLoading(false);
        } else {
            fetchArticle(id)
                .then((a) => {
                    if (!mounted) return;
                    if (a) setArticle(a);
                    else {
                        setArticle({
                            id: Number(id) || 0,
                            title: "Sample Article",
                            content:
                                "This is sample content used in development. Hover words to see quick tips. Click a word to pin a definition in the right-hand panel.",
                        });
                    }
                })
                .catch((e) => setError(String(e)))
                .finally(() => setLoading(false));
        }

        return () => {
            mounted = false;
        };
    }, [id]);

    if (loading) return <div className="p-8">Loading article…</div>;
    if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
    if (!article) return <div className="p-8">Article not found.</div>;

    const ARTICLE_TITLE = article.title;
    const ARTICLE_CONTENT = article.content;

    // Tokenize but preserve spaces & punctuation
    const tokens = ARTICLE_CONTENT.match(/\w+[-']?\w*|\s+|[^\s\w]+/g) || [];

    // Simple placeholder "definition" generator
    const getDefinition = (word: string) => {
        if (!word.trim() || /\s+/.test(word)) return null;
        return {
            lemma: word.replace(/[^\w'-]/g, ""),
            translation: `${word} (translation)`,
            explanation: `Short explanation for "${word}". Use this to explain meaning or usage.`,
            example: `Example sentence with "${word}".`,
        };
    };

    const handleWordClick = (idx: number) => {
        setSelectedIndex((prev) => (prev === idx ? null : idx));
    };

    const handleGenerateLesson = async () => {
        setGenerating(true);
        setStatusMsg("Triggering dev lesson generation...");
        try {
            const payload = {
                article_id: article.id,
                title: article.title,
                content: ARTICLE_CONTENT.trim(),
            };
            const res = await fetch("/api/dev/generate-lesson", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                const json = await res.json().catch(() => null);
                setStatusMsg(
                    json
                        ? `Lesson created (id: ${json.id ?? "unknown"})`
                        : "Lesson created (dev)"
                );
            } else {
                setStatusMsg(
                    "Dev endpoint not available — simulated lesson created locally."
                );
                await new Promise((r) => setTimeout(r, 700));
            }
        } catch (err) {
            setStatusMsg("Network error — lesson generation simulated.");
        } finally {
            setGenerating(false);
            setTimeout(() => setStatusMsg(null), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-blue-600">
                        {ARTICLE_TITLE}
                    </h1>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleGenerateLesson}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md text-sm font-medium"
                            title="Dev only: trigger lesson generation for this article"
                            disabled={generating}>
                            {generating
                                ? "Generating…"
                                : "DEV: Generate Lesson"}
                        </button>
                        {statusMsg && (
                            <div className="text-sm text-gray-600">
                                {statusMsg}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8">
                    <article
                        ref={containerRef}
                        className="prose max-w-none bg-white p-6 rounded-md shadow-sm relative"
                        aria-labelledby="article-title">
                        <h2 id="article-title" className="sr-only">
                            {ARTICLE_TITLE}
                        </h2>

                        <div className="mb-4 text-sm text-gray-500">
                            Hover words to see quick tips. Click a word to pin a
                            definition in the right-hand panel.
                        </div>

                        <div className="leading-7 text-lg">
                            {tokens.map((tok, idx) => {
                                const isSpace = /^\s+$/.test(tok);
                                const def = getDefinition(tok);
                                const isSelected = selectedIndex === idx;
                                const isHovered = hoveredIndex === idx;

                                if (isSpace) {
                                    return <span key={idx}>{tok}</span>;
                                }

                                return (
                                    <span
                                        key={idx}
                                        ref={(el) => {
                                            spanRefs.current[idx] = el;
                                        }}
                                        onMouseEnter={() =>
                                            setHoveredIndex(idx)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredIndex((prev) =>
                                                prev === idx ? null : prev
                                            )
                                        }
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleWordClick(idx);
                                        }}
                                        className={`relative cursor-pointer select-none px-0.5 rounded ${
                                            isSelected
                                                ? "bg-yellow-100"
                                                : isHovered
                                                ? "bg-gray-100"
                                                : ""
                                        }`}
                                        aria-label={
                                            def
                                                ? `Definition: ${def.translation}`
                                                : undefined
                                        }
                                        title={
                                            def ? def.translation : undefined
                                        }>
                                        {tok}
                                        {def && (
                                            <span className="ml-1 text-xs align-middle text-blue-500 hidden md:inline">
                                                ▾
                                            </span>
                                        )}
                                    </span>
                                );
                            })}
                        </div>

                        {tooltip && (
                            <div
                                className="pointer-events-none z-50 fixed transform -translate-x-1/2"
                                style={
                                    {
                                        left: tooltip.left,
                                        top: Math.max(tooltip.top - 6, 8),
                                    } as React.CSSProperties
                                }>
                                <div className="bg-black text-white text-xs rounded px-2 py-1 shadow">
                                    {tooltip.text.trim() || "•"}
                                </div>
                            </div>
                        )}
                    </article>

                    <aside className="space-y-4">
                        <div className="sticky top-24 bg-white p-4 rounded-md shadow-sm">
                            <h3 className="text-lg font-semibold">
                                Reader Tools
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Click a word to see a guided explanation.
                                Double-click or select text in the article to
                                try phrase selection.
                            </p>

                            <div className="border rounded-md p-3 bg-gray-50">
                                <h4 className="font-medium text-sm mb-2">
                                    Selected
                                </h4>
                                {!selectedIndex && (
                                    <div className="text-sm text-gray-500">
                                        No word selected.
                                    </div>
                                )}
                                {selectedIndex !== null &&
                                    (() => {
                                        const raw = tokens[selectedIndex];
                                        const def = getDefinition(raw)!;
                                        return (
                                            <div>
                                                <div className="text-sm font-semibold">
                                                    {def.lemma}
                                                </div>
                                                <div className="text-sm text-gray-700 mt-1">
                                                    {def.translation}
                                                </div>
                                                <div className="text-sm text-gray-600 mt-2">
                                                    {def.explanation}
                                                </div>
                                                <div className="text-sm italic text-gray-500 mt-2">
                                                    {def.example}
                                                </div>
                                                <div className="mt-3 flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard?.writeText(
                                                                `${def.lemma} — ${def.translation}`
                                                            );
                                                            setStatusMsg(
                                                                "Copied flashcard text"
                                                            );
                                                            setTimeout(
                                                                () =>
                                                                    setStatusMsg(
                                                                        null
                                                                    ),
                                                                1500
                                                            );
                                                        }}
                                                        className="text-sm px-2 py-1 bg-blue-600 text-white rounded">
                                                        Copy
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedIndex(
                                                                null
                                                            );
                                                            setStatusMsg(
                                                                "Highlight removed"
                                                            );
                                                            setTimeout(
                                                                () =>
                                                                    setStatusMsg(
                                                                        null
                                                                    ),
                                                                1000
                                                            );
                                                        }}
                                                        className="text-sm px-2 py-1 border rounded">
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })()}
                            </div>

                            <div className="mt-4">
                                <h4 className="font-medium text-sm mb-2">
                                    Article Summary
                                </h4>
                                <div className="text-sm text-gray-700">
                                    This is an interactive reading view for the
                                    article.
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-sm">
                            <h4 className="font-medium mb-2">Quick Glossary</h4>
                            <ul className="text-sm space-y-2">
                                {Array.from(
                                    new Set(
                                        tokens.filter(
                                            (t) =>
                                                /^\w+$/.test(t) && t.length > 5
                                        )
                                    )
                                )
                                    .slice(0, 6)
                                    .map((w, i) => {
                                        const def = getDefinition(w)!;
                                        return (
                                            <li
                                                key={i}
                                                className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-medium text-sm">
                                                        {def.lemma}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {def.translation}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const idx =
                                                            tokens.findIndex(
                                                                (t) => t === w
                                                            );
                                                        if (idx >= 0) {
                                                            spanRefs.current[
                                                                idx
                                                            ]?.scrollIntoView({
                                                                behavior:
                                                                    "smooth",
                                                                block: "center",
                                                            });
                                                            setSelectedIndex(
                                                                idx
                                                            );
                                                        }
                                                    }}
                                                    className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
                                                    Show
                                                </button>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
