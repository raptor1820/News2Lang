import React from 'react';
import QuizQuestion from './QuizQuestion';

// component to house quiz questions

export default function Quiz({questions}) {
    return ( <div>
        <h2>Quiz</h2>
        {questions.map((elem, i) => <QuizQuestion key={i} question={elem} />)}
    </div> );
}