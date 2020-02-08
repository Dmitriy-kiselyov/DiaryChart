import React from 'react';

import { Title } from '../Title/Title';
import { Chart } from '../Chart/Chart';

import './Root.scss';

export function Root() {
    return (
        <div className="Root">
            <Title text="Diary Chart"/>
            <Chart />
        </div>
    );
}
