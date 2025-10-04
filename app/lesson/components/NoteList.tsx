import GrammarNote from './GrammarNote';

// the component that displays the grammar notes for the current lesson
export default function NoteList(props : {list: Array<string>}) {
    return ( <div className="flex flex-col text-black w-1/2">
        <p className="text-2xl text-center mb-1">Grammar notes</p>
        <div className="grow bg-gray-200 border-y-4 border-y-red-500 p-5 shadow-md">
            <ol className="">
                {props.list.map((word, i, arr) => 
                    <GrammarNote key={i} displayIndex={i + 1} hasMargin={i !== arr.length - 1}>{word}</GrammarNote>
                )}
            </ol>
        </div>
    </div> );
}