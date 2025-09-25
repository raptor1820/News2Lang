import React from 'react';
import QuizQuestion from './QuizQuestion';

// component to house quiz questions

export default function Quiz({questions}) {
    return ( <div>
        <h1>Quiz</h1>
        {questions.map((elem, i) => <QuizQuestion key={i} question={elem} />)}
    </div> );
}