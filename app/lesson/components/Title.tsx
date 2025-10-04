// the component that displays the title of the lesson
export default function Title(props: {
    children: string
}) {
    return (
        <p className="text-black text-3xl font-bold italic text-center max-w-[calc(100%-300px)] mx-auto">{props.children}</p>
    );
}
