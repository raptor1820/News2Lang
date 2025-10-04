import React from 'react';
import QuizOption from './QuizOption';
import QuizCorrectIncorrect from './QuizCorrectIncorrect';

enum Letter { A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z };

function capitalize(str: string) {
    if(str.length === 0) return str;
    if(str.length === 1) return str.toUpperCase();
    return str.charAt(0).toUpperCase() + str.slice(1, str.length).toLowerCase();
}

// component to display and process the answering of a quiz question
export default function QuizQuestion(
    props : {
        displayIndex: number
        question: {
            question: string,
            options: Array<string>,
            correct_answer: number,
            explanation: string
        }
    }
) {
    // state var: current selected answer, -1 if no selected answer
    const [selectedAnswer, setSelectedAnswer] : [number, Function] = React.useState<number>(-1);

    function selectAnswer(index : number) {
        setSelectedAnswer(index);
    }

    function clearAnswer() {
        setSelectedAnswer(-1);
    }

    return ( <div className="text-black">
        <div className="flex gap-2 bg-yellow-300 p-2 mb-4 border-t-4 border-gray-600">
            <p className="text-lg ml-4 text-gray-700">{props.displayIndex}.</p>
            <p className="text-lg">{props.question.question}</p>
        </div>
        <div className="grid grid-cols-2 mx-8 mb-12">
            {props.question.options.map((str, i) => 
                <QuizOption key={i} index={i} letter={Letter[i]} onClick={selectAnswer} selected={selectedAnswer === i} correct={i === props.question.correct_answer}>{capitalize(str)}</QuizOption>
            )}
        </div>
        <QuizCorrectIncorrect correct={true} explanation={props.question.explanation} show={selectedAnswer === props.question.correct_answer} closeCallback={clearAnswer}/>
        <QuizCorrectIncorrect correct={false} show={selectedAnswer !== -1 && selectedAnswer !== props.question.correct_answer} closeCallback={clearAnswer}/>
    </div> );
}
