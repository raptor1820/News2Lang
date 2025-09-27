import React from 'react';




// the component that displays the example sentences for the current lesson
export default function ExSentenceList({list}) {
    return ( <div>
        <h2>Example sentences</h2>
        <ol>
            {list.map((sentence, i) => <li key={i}>{sentence}</li>)}
        </ol>
    </div> );
}