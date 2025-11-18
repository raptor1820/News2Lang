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


export default function Article(props: {
    children: string,
    sentenceHighlight: number
}) {
    const intermediateText = "        " + replaceAll(props.children, "\n", "\n        ");
    const sentences = splitIntoSentences(intermediateText);

    return ( <div className="shadow-lg">
        <div className="bg-white border-2 border-black m-4 mx-auto p-10 max-w-[850px] max-h-[700px] whitespace-pre-wrap overflow-y-auto">
            {
                sentences.map(
                    (sentence, i) =>
                    <ArticleSentence text={sentence} highlighted={i == props.sentenceHighlight} key={i}/>
                )
            }
        </div>
    </div> );
}
