import Word from './Word';

// the component that displays the vocab for the current lesson
export default function VocabList(
    props : {
        list: Array<{
            en: string,
            target: string,
            sentenceRef: number
        }>
        setSentenceHighlight : (sentence: number) => void
    },
) {
    return ( <div className="flex flex-col w-1/2">
        <p className="text-black text-2xl text-center mb-1">Vocabulary</p>
        <div className="grow justify-center p-5 bg-gray-200 border-y-4 border-y-blue-500 shadow-md">
            <ul className="grid gap-4 grid-cols-[repeat(auto-fill,250px)] justify-center">
                {
                    props.list.map(
                        (word, i) => 
                        <li key={i}>
                            <Word
                                word={word}
                                onHoverStart={() => {props.setSentenceHighlight(word.sentenceRef)}}
                                onHoverEnd={() => {props.setSentenceHighlight(-1)}}
                            />
                        </li>
                    )
                }   
            </ul>
        </div>
    </div> );
}
