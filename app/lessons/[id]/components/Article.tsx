// the component that displays the article for the current lesson, one page at a time

import ArticleSentence from './ArticleSentence';

function replaceAll(input: string, indexOf: string, replace: string): string {
    let output: string = "";
    while(input.length !== 0) {
        const foundI = input.indexOf(indexOf);
        if(foundI === -1) {
            output += input;
            input = "";
        }
        else {
            output += input.substring(0, foundI) + replace;
            input = input.substring(foundI + indexOf.length);
        }
    }
    return output;
}

function splitIntoSentences(input: string): string[] {
    const returnVal = [];
    while (input.length > 0) {
        const periodInd = (input.indexOf(". ") == -1) ? input.length - 2 : input.indexOf(". ");
        const questInd = (input.indexOf("? ") == -1) ? input.length - 2 : input.indexOf("? ");
        const exclInd = (input.indexOf("! ") == -1) ? input.length - 2 : input.indexOf("! ");
        const chopInd = Math.min(periodInd, questInd, exclInd) + 2;
        returnVal.push(input.substring(0, chopInd));
        input = input.substring(chopInd);
    }
    return returnVal;
}

// returns the index a given item would have if it were flat. Ex. flatIndex([[0, 1, 2], [3, 4], [5, 6, 7]]), 2, 1) -> 6 
function flatIndex(arr: Array<Array<any>>, i: number, j: number): number {
    var returnVal = 0;
    for (let a = 0; a < i; a++) {
        returnVal += arr[a].length;
    }
    returnVal += j;
    return returnVal;
}


export default function Article(props: {
    children: string,
    sentenceHighlight: number
}) {
    // result: a 2d array where a row is a paragraph and an entry is a sentence
    const paragraphs = ("    " + props.children).split("\n").map(splitIntoSentences);

    return ( <div className="shadow-lg">
        <div className="bg-white border-2 border-black m-4 mx-auto p-10 max-w-[850px] max-h-[700px] whitespace-pre-wrap overflow-y-auto rounded-lg">
            {
                paragraphs.map(
                    (paragraph, i) => 
                    <div className="whitespace-pre-wrap" key={i}>
                        {paragraph.map(
                            (sentence, j) =>
                            <ArticleSentence text={sentence} highlighted={flatIndex(paragraphs, i, j) == props.sentenceHighlight} key={j}/>
                        )}
                    </div>
                )
            }
        </div>
    </div> );
}
