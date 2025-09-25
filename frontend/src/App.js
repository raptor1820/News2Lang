import React from 'react';
import VocabList from './VocabList';
import NoteList from './NoteList';
import ExSentenceList from './ExSentenceList';
import Quiz from './Quiz';

// dummy data for use before we connect to backend
const vocab = ["cat", "dog", "pizza", "explosion", "person", "cheese", "hyperbolic cosine"];
const notes = ["Use the imperfect tense for repeated past actions", "Comma splices are sometimes legal, unlike in English", "Use 'conocer' to mean 'to know' as in being familiar with someone/thing, and use 'saber' to mean 'to know' as in possessing information"];
const exSentences = ["Me encanta tu gato.", "Vamos al parque.", "Todo sería diferente si tú me quisieras."];
const questions = [
    {
        text: "Which of the following sentences is grammatically incorrect?",
        options: [
            {
                text: "Me encantan sus parientes.",
                correct: false
            },
            {
                text: "Me encanta cuándo me llamas señorita.",
                correct: false
            },
            {
                text: "Lo encanta el pastel amarillo.",
                correct: false
            },
            {
                text: "Te encantas el libro.",
                correct: true
            }
        ]
    },
    {
        text: "Which of the following sentences should use the imperfect tense when translated to Spanish?",
        options: [
            {
                text: "I'm doing my homework right now.",
                correct: false
            },
            {
                text: "Jose called me all of a sudden.",
                correct: false
            },
            {
                text: "You didn't go to work today.",
                correct: false
            },
            {
                text: "They ate at a restaurant every week.",
                correct: true
            }
        ]
    }
]

// The main component for the app
export default function App() {
    return ( <div>
        <h1>Hello world!</h1>
        <VocabList list={vocab} />
        <NoteList list={notes} />
        <ExSentenceList list={exSentences} />
        <Quiz questions={questions} />
    </div> );
}
