// the component that displays the article for the current lesson, one page at a time

function replaceAll(input: string, search: string, replace: string): string {
    let output: string = "";
    while(input.length !== 0) {
        const foundI = input.indexOf(search);
        if(foundI === -1) {
            output += input;
            input = "";
        }
        else {
            output += input.substring(0, foundI) + replace;
            input = input.substring(foundI + search.length);
        }
    }
    return output;
}




export default function Article(props: {
    children: string
}) {
    return ( <div className="shadow-lg">
        <p className="text-black bg-white border-2 border-black m-4 mx-auto p-10 max-w-[850px] max-h-[700px] whitespace-pre-wrap overflow-y-auto">{"        " + replaceAll(props.children, "\n", "\n        ")}</p>
    </div> );
}
