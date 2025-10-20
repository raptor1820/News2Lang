"use client";

import Link from "next/link";
import { useState } from "react";

const DUMMY_ARTICLES = [
    {
        id: 1,
        title: "Climate Change: New Study Reveals Alarming Trends",
        source: "El País",
        difficulty: "Intermediate",
        language: "Spanish",
        date: "2025-10-18",
        processed: true,
        excerpt:
            "Scientists have discovered new evidence showing the accelerating pace of global warming and its impact on marine ecosystems.",
    },
    {
        id: 2,
        title: "Tech Giants Announce Revolutionary AI Breakthrough",
        source: "BBC News",
        difficulty: "Advanced",
        language: "English",
        date: "2025-10-17",
        processed: true,
        excerpt:
            "Major technology companies have unveiled a collaborative AI system that promises to transform healthcare diagnostics.",
    },
    {
        id: 3,
        title: "Local Artists Showcase Traditional Crafts at Festival",
        source: "El País",
        difficulty: "Beginner",
        language: "Spanish",
        date: "2025-10-16",
        processed: false,
        excerpt:
            "The annual cultural festival brings together artisans from across the region to celebrate traditional craftwork.",
    },
    {
        id: 4,
        title: "Economic Recovery Shows Promising Signs in Europe",
        source: "Financial Times",
        difficulty: "Advanced",
        language: "English",
        date: "2025-10-15",
        processed: true,
        excerpt:
            "European markets are showing renewed vigor as consumer confidence reaches pre-pandemic levels.",
    },
    {
        id: 5,
        title: "New Archaeological Discovery Rewrites Ancient History",
        source: "National Geographic",
        difficulty: "Intermediate",
        language: "English",
        date: "2025-10-14",
        processed: false,
        excerpt:
            "Archaeologists have uncovered artifacts that challenge our understanding of early civilization trade routes.",
    },
    {
        id: 6,
        title: "Spanish Football Team Wins International Championship",
        source: "El País",
        difficulty: "Beginner",
        language: "Spanish",
        date: "2025-10-13",
        processed: true,
        excerpt:
            "In a thrilling final match, the national team secured victory with a last-minute goal.",
    },
];

export default function ArticlesPage() {
    const [filter, setFilter] = useState<string>("all");
    const [search, setSearch] = useState("");

    const filteredArticles = DUMMY_ARTICLES.filter((article) => {
        const matchesFilter =
            filter === "all" ||
            article.difficulty.toLowerCase() === filter.toLowerCase();
        const matchesSearch =
            article.title.toLowerCase().includes(search.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case "beginner":
                return "border-green-500 bg-green-50";
            case "intermediate":
                return "border-blue-500 bg-blue-50";
            case "advanced":
                return "border-purple-500 bg-purple-50";
            default:
                return "border-gray-500 bg-gray-50";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        News Articles
                    </h1>
                    <p className="text-gray-600">
                        Browse and explore news articles that have been
                        transformed into language learning content.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="difficulty-filter"
                                className="block text-sm font-medium text-gray-700 mb-2">
                                Difficulty
                            </label>
                            <select
                                id="difficulty-filter"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="all">All Levels</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">
                                    Intermediate
                                </option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="text-3xl font-bold text-blue-600">
                            {DUMMY_ARTICLES.length}
                        </div>
                        <div className="text-gray-600">Total Articles</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="text-3xl font-bold text-green-600">
                            {DUMMY_ARTICLES.filter((a) => a.processed).length}
                        </div>
                        <div className="text-gray-600">With Lessons</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="text-3xl font-bold text-purple-600">
                            2
                        </div>
                        <div className="text-gray-600">Languages</div>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid gap-6">
                    {filteredArticles.map((article) => (
                        <div
                            key={article.id}
                            className={`bg-white rounded-lg shadow-md border-l-4 ${getDifficultyColor(
                                article.difficulty
                            )} transition-all hover:shadow-lg`}>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <Link
                                            href={`/articles/${article.id}`}
                                            className="hover:text-blue-600 transition-colors">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {article.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 text-sm mb-3">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                                        📰 {article.source}
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                        📊 {article.difficulty}
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                                        🌐 {article.language}
                                    </span>
                                    <span className="text-gray-500">
                                        📅 {article.date}
                                    </span>
                                    {article.processed && (
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700">
                                            ✓ Lesson Available
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <Link
                                        href={`/articles/${article.id}`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                                        Read Article
                                    </Link>
                                    {article.processed && (
                                        <Link
                                            href={`/lessons/${article.id}`}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                                            View Lesson
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-gray-500 text-lg">
                            No articles found matching your criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
