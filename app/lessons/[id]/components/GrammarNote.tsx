// the component that stores a grammar note in the Lesson page

export default function GrammarNote(props: {
    displayIndex: number,
    hasMargin: boolean,
    children: string,
    onHoverStart: () => void,
    onHoverEnd: () => void
}) {
    const outerStyle = `cursor-default relative${props.hasMargin ? " mb-4" : ""}`;
    return ( <div
        className={outerStyle}
        onMouseEnter={props.onHoverStart}
        onMouseLeave={props.onHoverEnd}
    >
        <p className="text-lg absolute -top-[3px]">{props.displayIndex}.</p>
        <p className="pl-8 hover:bg-[yellow]">{props.children}</p>
    </div> );
}
