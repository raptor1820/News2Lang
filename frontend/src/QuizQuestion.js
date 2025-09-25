import React from 'react';

// enum to represent state of display message
const CorrectStateEnum = Object.freeze({
    NO_DISPLAY: 0,
    INCORRECT: 1,
    CORRECT: 2
});

// time to show "incorrect" upon incorrect answer in milliseconds
const INCORRECT_DELAY = 2000;



// component to display and process the answering of a quiz question
export default function QuizQuestion({question}) {
    const [correctState, setCorrectState] = React.useState(CorrectStateEnum.NO_DISPLAY);

    // onClick callback for incorrect answers
    function showIncorrect() {
        setCorrectState(CorrectStateEnum.INCORRECT);
        setTimeout(() => {setCorrectState(CorrectStateEnum.NO_DISPLAY)}, INCORRECT_DELAY)
    }

    // onClick callback for correct answers
    function showCorrect() {
        setCorrectState(CorrectStateEnum.CORRECT);
    }

    return ( <div>
        <p>{question.text}</p>
        <ol>
            {question.options.map((option, i) => <li key={i} onClick={option.correct ? showCorrect : showIncorrect}>{option.text}</li>)}
        </ol>
        <p>{correctState == CorrectStateEnum.INCORRECT && "Incorrect"}</p>
        <p>{correctState == CorrectStateEnum.CORRECT && "Correct"}</p>
    </div> );
}
