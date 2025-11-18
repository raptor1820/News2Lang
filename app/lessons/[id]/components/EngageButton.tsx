import React from 'react';

const baseClassName = "h-min p-1 w-24 rounded-lg shadow-lg";

// the component that serves as a button to navigate between engagement activities in the Engage component
export default function EngageButton(props: {
    pressed: boolean
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    children: string
}) {
    return ( <button
        className={
            (props.pressed
                ? "bg-green-500 "
                : "bg-gray-300 hover:bg-gray-400 ")
            + baseClassName
        }
        onClick={props.onClick}
    >
        {props.children}
    </button>);
}

