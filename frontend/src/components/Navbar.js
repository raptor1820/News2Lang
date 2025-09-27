import React from 'react';
import { Link } from 'react-router';

// The component for the navbar
export default function Navbar() {
    return ( <nav>
        <Link to="/">Home</Link>
        <Link to="/lesson">Lesson</Link>
    </nav> );
}


