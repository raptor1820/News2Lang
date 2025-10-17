"use client";

import React from 'react';
import Title from './components/Title';
import Flags from './components/Flags';
import VocabList from './components/VocabList';
import NoteList from './components/NoteList';
import Article from './components/Article';
import Engage from './components/Engage';

// dummy data for use before we connect to backend
type lessonSchema = {
    article_id: number,
    title: string,
    content: string,
    vocabulary: Array<{
        en: string,
        target: string
    }>,
    grammar_points: Array<string>,
    difficulty: string,
    estimated_time_minutes: number,
    id: number,
    created_at: string,
    updated_at: string
}
const dummyLesson : lessonSchema = {
    article_id: 9872309342,
    title: "Interview with Ana",
    content: "Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo.\nHola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo.\nHola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo.\nHola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo. Hola, me llamo Ana. Vivo en una casa pequeña con mi familia. Tengo un perro y un gato, y me gusta jugar con ellos en el jardín. Todos los días voy a la escuela y estudio matemáticas y español. Después de la escuela, camino al parque con mis amigos. Estoy muy contenta porque el sol brilla y hace buen tiempo.",
    vocabulary: [
        { en: "cat", target: "gato" },
        { en: "dog", target: "perro" },
        { en: "to be", target: "ser" },
        { en: "to have", target: "tener" },
        { en: "to like", target: "gustar" },
        { en: "to travel", target: "viajar" },
    ],
    grammar_points: [
        "'Ser' and 'tener' are irregular, while 'gustar' and 'viajar' are regular.",
        "'Gustar' is conjugated backwards from in English: it is conjugated based on the thing that is liked, not the thing that likes it. In the mind of a Spanish speaker, the thing that is liked is the active one in that scenario, so it's the subject of the sentence. That's why you conjugate based on it.",
        "The present-tense conjugation pattern for regular -ar verbs is: -o, -as, -a, -amos, -áis, -an.",
    ],
    difficulty: "beginner",
    estimated_time_minutes: 5,
    id: 3298709384,
    created_at: "2025-10-01T05:49:26.296Z",
    updated_at: "2025-10-01T05:49:26.296Z",
}
type quizSchema = {
    lesson_id: number,
    title: string,
    questions: Array<{
        question: string,
        options: Array<string>,
        correct_answer: number,
        explanation: string
    }>,
    difficulty: string,
    id: number,
    created_at: string,
    updated_at: string
}
const dummyQuiz = {
    lesson_id: 3298709384,
    title: "Conjugation in the present tense",
    questions: [
        {
            question: "Fill in the blank: ¿Te ___ la comida?",
            options: [ "encantas", "amas", "gustas", "gusta" ],
            correct_answer: 3,
            explanation: "The question translates to 'Do you like the food?' The use of 'te' instead of 'tú' to start the sentence suggests that 'you' is actually not the subject: it's the indirect object. There are two verbs that require us to pick a different subject from English and that make sense here: gustar and encantar. Both of these verbs conjugate based on the thing being liked, and since that thing is 'comida,' the verb should be conjugated in the third-person singular. The only option that satisfies that is 'gusta.'"
        },
        {

            question: "Fill in the blank: Usted no ___ hacer ese.",
            options: [ "es", "podéis", "puede", "está" ],
            correct_answer: 2,
            explanation: "The questions translates to 'You cannot do that.' 'Poder' is used to express 'can' in Spanish, and it should be conjugated in its third-person singular form, 'puede,' because the verb 'usted' always uses third-person singular conjugations."
        },
        {
            question: "Fill in the blank: Nosotros ___ en la casa.",
            options: [ "soy", "somos", "estoy", "estamos" ],
            correct_answer: 3,
            explanation: "The question translates to 'We are in the house.' Estar is the version of 'to be' used for location. Estar's 'nosotros' form is regular, yielding 'estamos.'"
        },
    ],
    difficulty: "beginner",
    id: 34098734092,
    created_at: "2025-10-01T05:49:26.296Z",
    updated_at: "2025-10-01T05:49:26.296Z",
}




// The component for the Lesson page
export default function Lesson() {
    return ( <div className="bg-gray-50 p-10">
        <div className="relative w-fit mx-auto">
            <Title>{dummyLesson.title}</Title>
            <Flags time={dummyLesson.estimated_time_minutes} difficulty={dummyLesson.difficulty}/>
            <Article>{dummyLesson.content}</Article>
        </div>
        <div className="flex flex-grow items-stretch gap-12 mt-10">
            <VocabList list={dummyLesson.vocabulary} />
            <NoteList list={dummyLesson.grammar_points} />
        </div>
        <Engage quiz={dummyQuiz} />
        
    </div> );
}
