// the component that displays an option in a quiz question

export default function QuizOption(props: {
    index: number,
    letter: string,
    selected: boolean,
    correct: boolean,
    onClick: Function,
    children: string 
}) {
    return ( <div className="flex gap-4 m-4 w-[calc(100%-2rem)] mx-auto p-2 px-3 rounded-lg cursor-pointer bg-gray-400 hover:bg-gray-500 shadow-md" style={props.selected ? {
        backgroundColor: props.correct ? "#16a34a" : "#dc2626",
    } : {}} onClick={() => {props.onClick(props.index)}}>
        <p className="font-bold">{props.letter}</p>
        <p>{props.children}</p>
    </div> );
}
