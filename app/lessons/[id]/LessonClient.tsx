"use client";

import React from 'react';

import Title from './components/Title';
import Flags from './components/Flags';
import VocabList from './components/VocabList';
import NoteList from './components/NoteList';
import CultureNotes from './components/CultureNotes';
import Article from './components/Article';
import Quiz from './components/Quiz';

export default function LessonClient(props: { lesson: any }) {
    const lesson = props.lesson;
    const [sentenceHighlight, setSentenceHighlight] = React.useState(-1);
    const [tab, setTab] = React.useState<'vocab' | 'grammar' | 'culture' | 'quiz'>('vocab');

    const dummyQuiz = {
        lesson_id: lesson.id,
        title: "Quick Quiz",
        questions: [
            { question: "Sample Q?", options: ["A","B","C"], correct_answer: 0, explanation: "demo" }
        ],
        difficulty: lesson.difficulty,
        id: 1000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6 flex flex-col">
            <div className="flex flex-row gap-8 w-full max-w-6xl mx-auto">
                {/* Left: Article */}
                <div className="flex-1 min-w-0">
                    <div className="mb-4">
                        <Title>{lesson.title}</Title>
                        <Flags time={lesson.estimated_time_minutes} difficulty={lesson.difficulty} />
                    </div>
                    <Article sentenceHighlight={sentenceHighlight}>{lesson.content}</Article>
                </div>
                {/* Right: Tabbed Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-row justify-center gap-2 mb-4">
                        <button
                            className={`px-4 py-2 rounded-t-lg font-semibold transition-colors text-black border-b-2 ${tab === 'vocab' ? 'bg-gray-300 border-gray-400' : 'bg-gray-500 hover:bg-gray-600 border-transparent'}`}
                            onClick={() => setTab('vocab')}
                        >Vocabulary</button>
                        <button
                            className={`px-4 py-2 rounded-t-lg font-semibold transition-colors text-black border-b-2 ${tab === 'grammar' ? 'bg-gray-300 border-gray-400' : 'bg-gray-500 hover:bg-gray-600 border-transparent'}`}
                            onClick={() => setTab('grammar')}
                        >Grammar</button>
                        <button
                            className={`px-4 py-2 rounded-t-lg font-semibold transition-colors text-black border-b-2 ${tab === 'culture' ? 'bg-gray-300 border-gray-400' : 'bg-gray-500 hover:bg-gray-600 border-transparent'}`}
                            onClick={() => setTab('culture')}
                        >Culture</button>
                        <button
                            className={`px-4 py-2 rounded-t-lg font-semibold transition-colors text-black border-b-2 ${tab === 'quiz' ? 'bg-gray-300 border-gray-400' : 'bg-gray-500 hover:bg-gray-600 border-transparent'}`}
                            onClick={() => setTab('quiz')}
                        >Quiz</button>
                    </div>
                    <div className="rounded-b-lg rounded-tr-lg bg-white shadow p-6 min-h-[350px]">
                        {tab === 'vocab' && (
                            <VocabList list={lesson.vocabulary} setSentenceHighlight={setSentenceHighlight} />
                        )}
                        {tab === 'grammar' && (
                            <NoteList list={lesson.grammar_points} setSentenceHighlight={setSentenceHighlight} />
                        )}
                        {tab === 'culture' && (
                            <CultureNotes list={lesson.culture_notes} setSentenceHighlight={setSentenceHighlight} />
                        )}
                        {tab === 'quiz' && (
                            <Quiz title={dummyQuiz.title} difficulty={dummyQuiz.difficulty} questions={dummyQuiz.questions} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
