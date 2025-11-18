import GrammarNote from './GrammarNote';

// the component that displays the culture notes for the current lesson
export default function CultureNotes(props : {list: Array<{text: string, sentenceRef: number}>, setSentenceHighlight : (sentence: number) => void}) {
    return ( <div className="flex flex-col text-black w-full">
        <p className="text-2xl text-center mb-1">Culture notes</p>
        <div className="grow bg-gray-100 rounded-lg p-5 shadow">
            <ol className="">
                {props.list.map((note, i, arr) => 
                    <GrammarNote
                        key={i}
                        displayIndex={i + 1}
                        hasMargin={i !== arr.length - 1}
                        onHoverStart={() => {props.setSentenceHighlight(note.sentenceRef)}}
                        onHoverEnd={() => {props.setSentenceHighlight(-1)}}
                    >{note.text}</GrammarNote>
                )}
            </ol>
        </div>
    </div> );
}
