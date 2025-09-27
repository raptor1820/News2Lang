import React from 'react';

// the component that displays the vocab for the current lesson
export default function VocabList({list}) {
    return ( <div>
        <h2>Vocabulary</h2>
        <ol>
            {list.map((word, i) => <li key={i}>{word}</li>)}
        </ol>
    </div> );
}
