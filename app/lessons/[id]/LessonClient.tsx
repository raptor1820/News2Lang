"use client";

import React from 'react';
import Title from './components/Title';
import Flags from './components/Flags';
import VocabList from './components/VocabList';
import NoteList from './components/NoteList';
import CultureNotes from './components/CultureNotes';
import Article from './components/Article';
import Engage from './components/Engage';

export default function LessonClient(props: { lesson: any }) {
    const lesson = props.lesson;
    const [sentenceHighlight, setSentenceHighlight] = React.useState(-1);

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
        <div className="bg-gray-50 p-10">
            <div className="relative w-fit mx-auto">
                <Title>{lesson.title}</Title>
                <Flags time={lesson.estimated_time_minutes} difficulty={lesson.difficulty} />
                <Article sentenceHighlight={sentenceHighlight}>{lesson.content}</Article>
            </div>
            <div className="flex flex-grow items-stretch gap-12 mt-10">
                <VocabList list={lesson.vocabulary} setSentenceHighlight={setSentenceHighlight} />
                <NoteList list={lesson.grammar_points} setSentenceHighlight={setSentenceHighlight} />
                <CultureNotes list={lesson.culture_notes} setSentenceHighlight={setSentenceHighlight} />
            </div>
            <Engage quiz={dummyQuiz} />
        </div>
    );
}
