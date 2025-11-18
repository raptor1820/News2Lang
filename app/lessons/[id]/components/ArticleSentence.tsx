// this represents a sentence in the article with the capability of being highlighted by hovering on a vocabulary or grammar item

export default function ArticleSentence(props: {
    text: string,
    highlighted: boolean
}) {
    return ( <p className="text-black inline" style={{
        backgroundColor: (props.highlighted) ? "yellow" : "white"
    }}>
        {props.text}
    </p> );
}

