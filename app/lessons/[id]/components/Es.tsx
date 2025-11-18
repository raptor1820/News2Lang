// the component that displays Spanish text created by Ethan for the Lesson page: consider adopting this for the whole site!
export default function Es(props:
    {
        children: string
    }
) {
    return <p className="text-green-600 italic font-bold inline">{props.children}</p> ;
}
