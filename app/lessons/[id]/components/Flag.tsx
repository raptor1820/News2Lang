// the component that displays various short information, such as estimated time or difficulty
export default function Flag(props: {
    color: string,
    children: string
}) {
    return ( <p className="text-xs rounded-xl p-1 px-2 text-black w-fit shadow-lg" style={{
        backgroundColor: props.color
    }}>
        {props.children}
    </p> );
}
