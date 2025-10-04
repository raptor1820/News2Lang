// the component that stores a grammar note in the Lesson page

export default function GrammarNote(props: {
    displayIndex: number,
    hasMargin: boolean,
    children: string
}) {
    const outerStyle = `relative${props.hasMargin ? " mb-4" : ""}`;
    return ( <div className={outerStyle}>
        <p className="text-lg absolute -top-[3px]">{props.displayIndex}.</p>
        <p className="pl-8">{props.children}</p>
    </div> );
}
