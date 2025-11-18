import React from 'react';
import EngageButton from './EngageButton';
import Quiz from './Quiz';

const FEATURES = ["Quiz", "Chat", "Game", "Translate", "Roleplay"];

// the component that displays all interactive learning elements, such as quizzes
export default function Engage(props: {
    quiz?: {
        title: string,
        difficulty: string,
        questions: Array<{
            question: string,
            options: Array<string>,
            correct_answer: number,
            explanation: string
        }>
    }
}) {
    const [currentFeature, setCurrentFeature] : [string, Function] = React.useState(FEATURES[0]);
    return ( <div className="border-y-4 border-y-green-500 text-black p-2 px-4 my-16 max-w-[900px] mx-auto">
        
        <div className="flex justify-between gap-2">
            <p className="text-2xl text-center my-4" key="0">Engage</p>
            <div className="flex justify-around gap-4 items-center px-4 border-x-2 border-x-gray-400 grow max-w-[700px]">
                {FEATURES.map((name, i) =>
                    <EngageButton key={i + 1} pressed={currentFeature === name} onClick={() => {setCurrentFeature(name)}}>{name}</EngageButton>
                )}
            </div>
        </div>
        
        {
            (currentFeature == "Quiz" && props.quiz !== undefined) && <Quiz title={props.quiz.title} difficulty={props.quiz.difficulty} questions={props.quiz.questions} />
        }
    </div> );
}
