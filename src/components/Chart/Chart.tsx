import React from 'react';

import { getData, IData } from '../../lib/getData';

import './Chart.scss';

export class Chart extends React.PureComponent<{}> {
    private data: IData = getData();
    private percentages: string[] = new Array(this.data.max + 1).fill(0).map((_, i) => (100 - i / this.data.max * 100).toFixed(3));

    render() {
        return (
            <div className="Chart">
                <div className="Chart-Scale">
                    {this.renderScaleValues()}
                </div>
                <div className="Chart-Content">
                    <div className="Chart-Header">
                        {this.renderHeaderCells()}
                    </div>
                    <div className="Chart-Table">
                        {this.renderStripes()}
                        {this.renderTableCells()}
                        <svg className="Chart-Line" xmlns="http://www.w3.org/2000/svg">
                            {this.renderPath()}
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

    private renderPath(): React.ReactElement[] {
        const { nodes } = this.data;
        const width = 30;
        const path = [];

        for (let i = 1; i < nodes.length; i++) {
            const prev = nodes[i - 1];
            const cur = nodes[i];
            const x = width / 2 + width * (i - 1);

            path.push(
                <line
                    key={'path-' + i}
                    x1={x}
                    y1={this.percentages[prev.value] + '%'}
                    x2={x + width}
                    y2={this.percentages[cur.value] + '%'}
                    stroke="blue"
                    strokeWidth="2"
                />
            );
        }

        nodes.forEach((node, i) => {
            path.push(
                <circle
                    key={'circle-' + i}
                    cx={width / 2 + width * i}
                    cy={this.percentages[node.value] + '%'}
                    r="5"
                    fill="red"
                />
            )
        });

        return path;
    }

    private renderHeaderCells(): React.ReactElement[] {
        return this.data.nodes.map((node, i) => {
            let text: React.ReactNode = '';

            if (Array.isArray(node.date)) {
                text = (
                    <>
                        {this.getDateText(node.date[0])}
                        <br/>
                        {this.getDateText(node.date[1])}
                    </>
                );
            } else {
                text = this.getDateText(node.date);
            }

            return (
                <span key={i} className="Chart-HeaderCell">
                    {text}
                </span>
            )
        });
    }

    private getDateText(date: Date): string {
        let day: string | number = date.getDate();
        let month: string | number = date.getMonth() + 1;

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return `${day}.${month}`;
    }

    private renderScaleValues(): React.ReactElement[] {
        return this.percentages.map((percent, i) => (
            <span
                className="Chart-Values"
                key={i}
                style={{ top: percent + '%' }}
            >
                {i}
            </span>
        ));
    }

    private renderStripes(): React.ReactElement[] {
        return this.percentages.map((percent, i) => (
            <div
                className="Chart-Stripe"
                key={i}
                style={{ top: percent + '%' }}
            />
        ));
    }

    private renderTableCells(): React.ReactElement[] {
        return this.data.nodes.map((_, i) => (
            <div key={i} className={'Chart-TableCell' + (i === 0 ? ' Chart-TableCell_first' : '')}/>
        ));
    }
}
