"use client";

import Link from "next/link";
import { useState } from "react";

const DUMMY_LESSONS: { [key: string]: any } = {
    "1": {
        id: 1,
        articleId: 1,
        title: "Climate Change Vocabulary and Environmental Terminology",
        articleTitle: "Climate Change: New Study Reveals Alarming Trends",
        difficulty: "Intermediate",
        language: "Spanish",
        estimatedTime: 25,
        vocabulary: [
            {
                word: "calentamiento",
                translation: "warming",
                definition: "The process of becoming warmer",
                example: "El calentamiento global es un problema serio.",
                exampleTranslation: "Global warming is a serious problem.",
            },
            {
                word: "ecosistema",
                translation: "ecosystem",
                definition: "A biological community of interacting organisms",
                example: "Los ecosistemas marinos están en peligro.",
                exampleTranslation: "Marine ecosystems are in danger.",
            },
            {
                word: "evidencia",
                translation: "evidence",
                definition: "Facts or information indicating something is true",
                example: "La evidencia científica es clara.",
                exampleTranslation: "The scientific evidence is clear.",
            },
            {
                word: "acelerar",
                translation: "to accelerate",
                definition: "To increase in speed or rate",
                example: "El cambio climático se está acelerando.",
                exampleTranslation: "Climate change is accelerating.",
            },
        ],
        grammarPoints: [
            {
                title: "Present Progressive Tense",
                explanation: "Used to describe ongoing actions in the present",
                example: "El planeta se está calentando.",
                translation: "The planet is warming up.",
            },
            {
                title: "Reflexive Verbs",
                explanation:
                    "Verbs that indicate the subject performs an action on itself",
                example: "Los científicos se preocupan por el medio ambiente.",
                translation: "Scientists worry about the environment.",
            },
        ],
        culturalNotes: [
            {
                title: "Environmental Movement in Spain",
                content:
                    "Spain has been at the forefront of renewable energy adoption in Europe, particularly in solar and wind power.",
            },
        ],
        quizQuestions: [
            {
                question: 'What does "calentamiento global" mean?',
                options: [
                    "Global cooling",
                    "Global warming",
                    "Global economy",
                    "Global politics",
                ],
                correctAnswer: 1,
                explanation:
                    '"Calentamiento" means warming, so "calentamiento global" translates to global warming.',
            },
            {
                question: 'Which verb form is used in "se está calentando"?',
                options: [
                    "Simple present",
                    "Present progressive",
                    "Past tense",
                    "Future tense",
                ],
                correctAnswer: 1,
                explanation:
                    'The construction "está + -ando/-iendo" indicates the present progressive tense.',
            },
        ],
    },
    "2": {
        id: 2,
        articleId: 2,
        title: "Advanced Technology and AI Terminology",
        articleTitle: "Tech Giants Announce Revolutionary AI Breakthrough",
        difficulty: "Advanced",
        language: "English",
        estimatedTime: 35,
        vocabulary: [
            {
                word: "breakthrough",
                translation: "avance revolucionario",
                definition:
                    "A sudden, dramatic, and important discovery or development",
                example: "This AI breakthrough could transform healthcare.",
                exampleTranslation:
                    "Este avance de IA podría transformar la atención médica.",
            },
            {
                word: "diagnostics",
                translation: "diagnósticos",
                definition: "The practice or techniques of diagnosis",
                example: "AI is improving medical diagnostics.",
                exampleTranslation:
                    "La IA está mejorando los diagnósticos médicos.",
            },
            {
                word: "collaborative",
                translation: "colaborativo",
                definition: "Involving two or more parties working together",
                example: "The collaborative effort led to success.",
                exampleTranslation:
                    "El esfuerzo colaborativo condujo al éxito.",
            },
        ],
        grammarPoints: [
            {
                title: "Modal Verbs for Possibility",
                explanation:
                    "Could, might, may are used to express possibility",
                example: "This technology could revolutionize the industry.",
                translation:
                    "Esta tecnología podría revolucionar la industria.",
            },
            {
                title: "Present Perfect Tense",
                explanation:
                    "Used for actions that have relevance to the present",
                example: "Companies have unveiled new AI systems.",
                translation:
                    "Las empresas han presentado nuevos sistemas de IA.",
            },
        ],
        culturalNotes: [
            {
                title: "Silicon Valley Innovation Culture",
                content:
                    "The tech industry, particularly in Silicon Valley, emphasizes rapid innovation, disruption, and collaborative development.",
            },
        ],
        quizQuestions: [
            {
                question: 'What does "breakthrough" mean in this context?',
                options: [
                    "A broken window",
                    "A major discovery",
                    "A failure",
                    "A delay",
                ],
                correctAnswer: 1,
                explanation:
                    "A breakthrough is a sudden, important discovery or development.",
            },
        ],
    },
    "4": {
        id: 4,
        articleId: 4,
        title: "Business and Economic Language Essentials",
        articleTitle: "Economic Recovery Shows Promising Signs in Europe",
        difficulty: "Advanced",
        language: "English",
        estimatedTime: 30,
        vocabulary: [
            {
                word: "recovery",
                translation: "recuperación",
                definition:
                    "A return to a normal state after a period of difficulty",
                example: "The economic recovery is stronger than expected.",
                exampleTranslation:
                    "La recuperación económica es más fuerte de lo esperado.",
            },
            {
                word: "vigor",
                translation: "vigor",
                definition:
                    "Physical strength and good health; effort and energy",
                example: "Markets are showing renewed vigor.",
                exampleTranslation: "Los mercados muestran un vigor renovado.",
            },
        ],
        grammarPoints: [
            {
                title: "Comparative Adjectives",
                explanation: "Used to compare two things",
                example: "The recovery is stronger than last year.",
                translation: "La recuperación es más fuerte que el año pasado.",
            },
        ],
        culturalNotes: [
            {
                title: "European Economic Integration",
                content:
                    "The European Union represents one of the world's largest integrated economic zones, with shared monetary policy in the Eurozone.",
            },
        ],
        quizQuestions: [
            {
                question: 'What does "economic recovery" refer to?',
                options: [
                    "Economic decline",
                    "Economic improvement after downturn",
                    "Economic stability",
                    "Economic growth",
                ],
                correctAnswer: 1,
                explanation:
                    "Recovery specifically means improvement after a period of difficulty or decline.",
            },
        ],
    },
    "6": {
        id: 6,
        articleId: 6,
        title: "Sports Vocabulary: Football and Competition Terms",
        articleTitle: "Spanish Football Team Wins International Championship",
        difficulty: "Beginner",
        language: "Spanish",
        estimatedTime: 20,
        vocabulary: [
            {
                word: "partido",
                translation: "match/game",
                definition: "A sporting contest between two teams or players",
                example: "El partido fue emocionante.",
                exampleTranslation: "The match was exciting.",
            },
            {
                word: "gol",
                translation: "goal",
                definition: "A point scored in football",
                example: "Marcaron un gol en el último minuto.",
                exampleTranslation: "They scored a goal in the last minute.",
            },
            {
                word: "victoria",
                translation: "victory",
                definition: "Success in a competition or battle",
                example: "La victoria fue merecida.",
                exampleTranslation: "The victory was deserved.",
            },
        ],
        grammarPoints: [
            {
                title: "Preterite Tense",
                explanation: "Used to describe completed actions in the past",
                example: "El equipo ganó el campeonato.",
                translation: "The team won the championship.",
            },
        ],
        culturalNotes: [
            {
                title: "Football in Spanish Culture",
                content:
                    "Football (fútbol) is deeply embedded in Spanish culture, with passionate fan bases and historic rivalries between clubs like Real Madrid and FC Barcelona.",
            },
        ],
        quizQuestions: [
            {
                question: 'What is "gol" in English?',
                options: ["Game", "Goal", "Team", "Player"],
                correctAnswer: 1,
                explanation:
                    '"Gol" is a cognate word that means "goal" in English.',
            },
        ],
    },
};

export default function LessonPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const lesson = DUMMY_LESSONS[id];

    const [activeTab, setActiveTab] = useState<
        "vocabulary" | "grammar" | "culture" | "quiz"
    >("vocabulary");
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    if (!lesson) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Lesson Not Found
                    </h1>
                    <p className="text-gray-600 mb-6">
                        This lesson doesn't exist yet.
                    </p>
                    <Link
                        href="/lessons"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                        Back to Lessons
                    </Link>
                </div>
            </div>
        );
    }

    const handleAnswerSelect = (answerIndex: number) => {
        if (showExplanation) return;
        setSelectedAnswer(answerIndex);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === null) return;

        const correct =
            selectedAnswer ===
            lesson.quizQuestions[currentQuestion].correctAnswer;
        if (correct) {
            setScore(score + 1);
        }
        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < lesson.quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const resetQuiz = () => {
        setQuizStarted(false);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setScore(0);
        setQuizCompleted(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <Link
                        href="/lessons"
                        className="text-blue-600 hover:text-blue-700 text-sm mb-2 inline-block">
                        ← Back to Lessons
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {lesson.title}
                    </h1>
                    <p className="text-gray-600">
                        From article: {lesson.articleTitle}
                    </p>
                    <div className="flex gap-3 mt-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            {lesson.difficulty}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                            🌐 {lesson.language}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                            ⏱️ {lesson.estimatedTime} min
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab("vocabulary")}
                                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === "vocabulary"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}>
                                📚 Vocabulary ({lesson.vocabulary.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("grammar")}
                                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === "grammar"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}>
                                📝 Grammar ({lesson.grammarPoints.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("culture")}
                                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === "culture"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}>
                                🌍 Culture ({lesson.culturalNotes.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("quiz")}
                                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === "quiz"
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}>
                                🧠 Quiz ({lesson.quizQuestions.length})
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {/* Vocabulary Tab */}
                        {activeTab === "vocabulary" && (
                            <div className="space-y-4">
                                {lesson.vocabulary.map(
                                    (item: any, index: number) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {item.word}
                                                </h3>
                                                <span className="text-sm text-blue-600 font-medium">
                                                    {item.translation}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-3">
                                                {item.definition}
                                            </p>
                                            <div className="bg-blue-50 rounded-lg p-3">
                                                <p className="text-gray-800 mb-1 italic">
                                                    "{item.example}"
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    Translation:{" "}
                                                    {item.exampleTranslation}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {/* Grammar Tab */}
                        {activeTab === "grammar" && (
                            <div className="space-y-4">
                                {lesson.grammarPoints.map(
                                    (item: any, index: number) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600 mb-3">
                                                {item.explanation}
                                            </p>
                                            <div className="bg-green-50 rounded-lg p-3">
                                                <p className="text-gray-800 mb-1 font-medium">
                                                    {item.example}
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    Translation:{" "}
                                                    {item.translation}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {/* Culture Tab */}
                        {activeTab === "culture" && (
                            <div className="space-y-4">
                                {lesson.culturalNotes.map(
                                    (item: any, index: number) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg p-4">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-700">
                                                {item.content}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        )}

                        {/* Quiz Tab */}
                        {activeTab === "quiz" && (
                            <div>
                                {!quizStarted ? (
                                    <div className="text-center py-8">
                                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                            Ready to test your knowledge?
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            This quiz has{" "}
                                            {lesson.quizQuestions.length}{" "}
                                            questions.
                                        </p>
                                        <button
                                            onClick={() => setQuizStarted(true)}
                                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                            Start Quiz
                                        </button>
                                    </div>
                                ) : quizCompleted ? (
                                    <div className="text-center py-8">
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Quiz Complete!
                                        </h3>
                                        <div className="text-5xl font-bold text-blue-600 mb-4">
                                            {score}/
                                            {lesson.quizQuestions.length}
                                        </div>
                                        <p className="text-xl text-gray-600 mb-6">
                                            You got{" "}
                                            {Math.round(
                                                (score /
                                                    lesson.quizQuestions
                                                        .length) *
                                                    100
                                            )}
                                            % correct!
                                        </p>
                                        <div className="flex gap-4 justify-center">
                                            <button
                                                onClick={resetQuiz}
                                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                                Try Again
                                            </button>
                                            <Link
                                                href="/lessons"
                                                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                                                Back to Lessons
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="mb-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm text-gray-600">
                                                    Question{" "}
                                                    {currentQuestion + 1} of{" "}
                                                    {
                                                        lesson.quizQuestions
                                                            .length
                                                    }
                                                </span>
                                                <span className="text-sm font-medium text-blue-600">
                                                    Score: {score}/
                                                    {
                                                        lesson.quizQuestions
                                                            .length
                                                    }
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                                    style={
                                                        {
                                                            width: `${
                                                                ((currentQuestion +
                                                                    1) /
                                                                    lesson
                                                                        .quizQuestions
                                                                        .length) *
                                                                100
                                                            }%`,
                                                        } as React.CSSProperties
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                                {
                                                    lesson.quizQuestions[
                                                        currentQuestion
                                                    ].question
                                                }
                                            </h3>
                                            <div className="space-y-3">
                                                {lesson.quizQuestions[
                                                    currentQuestion
                                                ].options.map(
                                                    (
                                                        option: string,
                                                        index: number
                                                    ) => (
                                                        <button
                                                            key={index}
                                                            onClick={() =>
                                                                handleAnswerSelect(
                                                                    index
                                                                )
                                                            }
                                                            disabled={
                                                                showExplanation
                                                            }
                                                            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                                                                selectedAnswer ===
                                                                index
                                                                    ? showExplanation
                                                                        ? index ===
                                                                          lesson
                                                                              .quizQuestions[
                                                                              currentQuestion
                                                                          ]
                                                                              .correctAnswer
                                                                            ? "border-green-500 bg-green-50"
                                                                            : "border-red-500 bg-red-50"
                                                                        : "border-blue-500 bg-blue-50"
                                                                    : "border-gray-200 hover:border-gray-300"
                                                            } ${
                                                                showExplanation &&
                                                                index ===
                                                                    lesson
                                                                        .quizQuestions[
                                                                        currentQuestion
                                                                    ]
                                                                        .correctAnswer
                                                                    ? "border-green-500 bg-green-50"
                                                                    : ""
                                                            }`}>
                                                            {option}
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {showExplanation && (
                                            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                                <h4 className="font-semibold text-gray-900 mb-2">
                                                    Explanation:
                                                </h4>
                                                <p className="text-gray-700">
                                                    {
                                                        lesson.quizQuestions[
                                                            currentQuestion
                                                        ].explanation
                                                    }
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex justify-between">
                                            <button
                                                onClick={resetQuiz}
                                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                Exit Quiz
                                            </button>
                                            {!showExplanation ? (
                                                <button
                                                    onClick={handleSubmitAnswer}
                                                    disabled={
                                                        selectedAnswer === null
                                                    }
                                                    className={`px-6 py-2 rounded-lg transition-colors ${
                                                        selectedAnswer === null
                                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                                    }`}>
                                                    Submit Answer
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleNextQuestion}
                                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                    {currentQuestion <
                                                    lesson.quizQuestions
                                                        .length -
                                                        1
                                                        ? "Next Question"
                                                        : "Finish Quiz"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Article */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Related Article
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Want to read the original article?
                    </p>
                    <Link
                        href={`/articles/${lesson.articleId}`}
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Read Article
                    </Link>
                </div>
            </div>
        </div>
    );
}
