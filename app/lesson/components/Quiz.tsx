import QuizQuestion from './QuizQuestion';
import Flags from './Flags';

// component to house quiz questions
export default function Quiz(
    props : {
        title: string,
        difficulty: string,
        questions: Array<{
            question: string,
            options: Array<string>,
            correct_answer: number,
            explanation: string
        }>
    }
) {
    return ( <div className="text-black border-4 border-gray-600 my-10 max-w-[800px] mx-auto shadow-lg relative">
        <Flags key="0" difficulty={props.difficulty}/>
        <div className="w-fit mx-auto my-4 max-w-[calc(100%-200px)]">
            <p className="text-2xl text-gray-700 inline whitespace-pre-wrap">Quiz: </p>
            <p className="text-2xl font-bold inline">{props.title}</p>
        </div> 
        {props.questions.map((elem, i) => <QuizQuestion key={i+1} displayIndex={i+1} question={elem} />)}
    </div> );
}