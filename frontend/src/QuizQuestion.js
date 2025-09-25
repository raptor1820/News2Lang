import React from 'react';

// component to display and process the answering of a quiz question

export default function QuizQuestion({question}) {
    return ( <div>
        <p>{question.text}</p>
    </div> );
}
