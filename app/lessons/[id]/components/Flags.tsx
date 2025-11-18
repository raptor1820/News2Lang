import Flag from './Flag';

// the component that shows a list of short information flags, including options for lesson time and difficulty
export default function Flags(props: {
    difficulty?: string
    time?: number, 
}) {
    let difficulty
    let diffColor = "";
    if(props.difficulty === "beginner") {
        difficulty = "Beginner";
        diffColor = "#3b82f6";
    }
    else if(props.difficulty === "intermediate") {
        difficulty = "Intermediate";
        diffColor = "#fde047";
    }
    else if(props.difficulty === "advanced") {
        difficulty = "Advanced",
        diffColor = "#ef4444";
    }
    return ( <div className="flex gap-4 pr-4 absolute top-2 right-0">
        { props.difficulty !== undefined
            ? <Flag color={diffColor}>{difficulty + ""}</Flag>
            : ""
        }
        { props.time !== undefined
            ? <Flag color="#aaaaaa">{props.time + "min"}</Flag>
            : ""
        }
    </div> );
}
