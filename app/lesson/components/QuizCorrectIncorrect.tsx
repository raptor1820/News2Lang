// the component that displays "Correct" + [explanation] after answering a quiz question correctly. 

export default function QuizCorrectIncorrect(props: {
    correct: boolean
    show: boolean,
    explanation?: string,
    closeCallback: React.MouseEventHandler<HTMLButtonElement>
}) {
    if(!props.show) {
        return props.correct
            ? ( <div className="max-h-0 bg-green-600"></div> )
            : ( <div className="max-h-0 bg-red-600"></div> );
    }
    else return ( <div className={`overflow-hidden transition-all duration-[2100ms] ease-in-out relative ${props.correct ? "bg-green-600" : "bg-red-600"}`} style={{
        maxHeight: props.show ? "1200px" : "0",
    }}>
        <p className="text-lg font-bold m-4">
            {props.correct ? `Correct` : "Incorrect"}
        </p>
        <button className="text-2xl absolute right-3 top-3" onClick={props.closeCallback}>×</button>
        {props.explanation && <p className="m-4">{props.explanation}</p>}
    </div> );
}
