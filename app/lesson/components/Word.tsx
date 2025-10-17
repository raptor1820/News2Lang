import Es from './Es';

// the component that displays a word from a lesson's vocabulary
export default function Word(props : {
    word: {
        en: string,
        target: string,
    }
}) {
    const es = props.word.target;
    return <div className="flex justify-between bg-white border-2 border-blue-300 m-2 p-2 px-4 line-clamp-1 rounded-2xl shadow-lg">
        <Es>{es}</Es>
        <p className="inline text-right text-black">{props.word.en}</p>
    </div>
}