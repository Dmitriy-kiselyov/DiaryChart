import React from 'react';

import './Title.scss';

interface ITitleProps {
    text: string;
}

export function Title(props: ITitleProps) {
    return <div className="Title">{props.text}</div>
}
