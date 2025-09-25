import React from 'react';
import VocabList from './VocabList';

const vocab = ["cat", "dog", "pizza", "explosion", "person", "cheese", "hyperbolic cosine"];

// The main component for the app
export default function App() {
    return ( <div>
        <h1>Hello world!</h1>
        <VocabList list={vocab} />
    </div> );
}
