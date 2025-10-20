"use client";

import Link from "next/link";
import { useState } from "react";

const DUMMY_LESSONS = [
    {
        id: 1,
        articleId: 1,
        title: "Climate Change Vocabulary and Environmental Terminology",
        articleTitle: "Climate Change: New Study Reveals Alarming Trends",
        difficulty: "Intermediate",
        language: "Spanish",
        estimatedTime: 25,
        vocabularyCount: 15,
        grammarPoints: 3,
        quizQuestions: 10,
        completed: false,
    },
    {
        id: 2,
        articleId: 2,
        title: "Advanced Technology and AI Terminology",
        articleTitle: "Tech Giants Announce Revolutionary AI Breakthrough",
        difficulty: "Advanced",
        language: "English",
        estimatedTime: 35,
        vocabularyCount: 20,
        grammarPoints: 4,
        quizQuestions: 12,
        completed: true,
    },
    {
        id: 4,
        articleId: 4,
        title: "Business and Economic Language Essentials",
        articleTitle: "Economic Recovery Shows Promising Signs in Europe",
        difficulty: "Advanced",
        language: "English",
        estimatedTime: 30,
        vocabularyCount: 18,
        grammarPoints: 5,
        quizQuestions: 15,
        completed: false,
    },
    {
        id: 6,
        articleId: 6,
        title: "Sports Vocabulary: Football and Competition Terms",
        articleTitle: "Spanish Football Team Wins International Championship",
        difficulty: "Beginner",
        language: "Spanish",
        estimatedTime: 20,
        vocabularyCount: 12,
        grammarPoints: 2,
        quizQuestions: 8,
        completed: true,
    },
];

export default function LessonsPage() {
    const [filter, setFilter] = useState<string>("all");

    const filteredLessons = DUMMY_LESSONS.filter(
        (lesson) =>
            filter === "all" ||
            lesson.difficulty.toLowerCase() === filter.toLowerCase()
    );

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case "beginner":
                return "bg-green-100 text-green-800";
            case "intermediate":
                return "bg-blue-100 text-blue-800";
            case "advanced":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getDifficultyBorder = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case "beginner":
                return "border-green-500";
            case "intermediate":
                return "border-blue-500";
            case "advanced":
                return "border-purple-500";
            default:
                return "border-gray-500";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Language Lessons
                    </h1>
                    <p className="text-gray-600">
                        Interactive lessons generated from news articles to
                        enhance your language learning.
                    </p>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <label className="text-sm font-medium text-gray-700">
                            Filter by Difficulty:
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setFilter("all")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filter === "all"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}>
                                All Lessons
                            </button>
                            <button
                                onClick={() => setFilter("beginner")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filter === "beginner"
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}>
                                Beginner
                            </button>
                            <button
                                onClick={() => setFilter("intermediate")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filter === "intermediate"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}>
                                Intermediate
                            </button>
                            <button
                                onClick={() => setFilter("advanced")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filter === "advanced"
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}>
                                Advanced
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="text-3xl font-bold text-blue-600">
                            {DUMMY_LESSONS.length}
                        </div>
                        <div className="text-gray-600">Total Lessons</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="text-3xl font-bold text-green-600">
                            {DUMMY_LESSONS.filter((l) => l.completed).length}
                        </div>
                        <div className="text-gray-600">Completed</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="text-3xl font-bold text-orange-600">
                            {DUMMY_LESSONS.reduce(
                                (sum, l) => sum + l.estimatedTime,
                                0
                            )}
                        </div>
                        <div className="text-gray-600">Total Minutes</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <div className="text-3xl font-bold text-purple-600">
                            {DUMMY_LESSONS.reduce(
                                (sum, l) => sum + l.vocabularyCount,
                                0
                            )}
                        </div>
                        <div className="text-gray-600">Vocabulary Words</div>
                    </div>
                </div>

                {/* Lessons Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredLessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className={`bg-white rounded-lg shadow-md border-l-4 ${getDifficultyBorder(
                                lesson.difficulty
                            )} transition-all hover:shadow-lg`}>
                            <div className="p-6">
                                {lesson.completed && (
                                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium mb-3">
                                        ✓ Completed
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {lesson.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    From: {lesson.articleTitle}
                                </p>

                                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span>⏱️</span>
                                        <span className="text-gray-600">
                                            {lesson.estimatedTime} min
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>📚</span>
                                        <span className="text-gray-600">
                                            {lesson.vocabularyCount} words
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>📝</span>
                                        <span className="text-gray-600">
                                            {lesson.grammarPoints} grammar
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>🧠</span>
                                        <span className="text-gray-600">
                                            {lesson.quizQuestions} questions
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                                            lesson.difficulty
                                        )}`}>
                                        {lesson.difficulty}
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                                        🌐 {lesson.language}
                                    </span>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/lessons/${lesson.id}`}
                                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium text-center">
                                        {lesson.completed
                                            ? "Review Lesson"
                                            : "Start Lesson"}
                                    </Link>
                                    <Link
                                        href={`/articles/${lesson.articleId}`}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                                        View Article
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredLessons.length === 0 && (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-gray-500 text-lg">
                            No lessons found matching your criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
