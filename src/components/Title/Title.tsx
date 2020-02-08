import React from 'react';

import './Title.scss';

interface ITitleProps {
    text: string;
}

export function Title(props: ITitleProps) {
    return <span className="Title">{props.text}</span>
}
