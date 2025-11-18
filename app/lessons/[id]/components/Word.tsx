import Es from './Es';

// the component that displays a word from a lesson's vocabulary
export default function Word(props : {
    word: {
        en: string,
        target: string,
        sentenceRef: number
    },
    onHoverStart: () => void,
    onHoverEnd: () => void
}) {
    const es = props.word.target;
    return <div
        className="flex justify-between bg-white hover:bg-yellow-100 border border-gray-300 m-2 p-2 px-4 line-clamp-1 rounded-xl shadow cursor-default"
        onMouseEnter={props.onHoverStart}
        onMouseLeave={props.onHoverEnd}
    >
        <Es>{es}</Es>
        <p className="inline text-right text-black">{props.word.en}</p>
    </div>
}