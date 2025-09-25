import React from 'react';

// the component that displays the notes for the current lesson
export default function NoteList({list}) {
    return ( <div>
        <h2>Grammar notes</h2>
        <ol>
            {list.map((word, i) => <li key={i}>{word}</li>)}
        </ol>
    </div> );
}