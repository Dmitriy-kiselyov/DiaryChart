interface IRawData {
    start: string;
    max: number;
    nodes: IRawNode[];
}

type IRawNode = number | [string, number];

export interface IData {
    max: number;
    nodes: IDataNode[];
}

export interface IDataNode {
    date: IDataDate;
    value: number;
}

export type IDataDate = Date | [Date, Date];

let data: IData | null = null;

export function getData(): IData {
    if (data) {
        return data;
    }

    const rawData = loadData();
    data = transformData(rawData);

    return data;
}

function loadData(): IRawData {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './data.json', false);
    xhr.send();

    return JSON.parse(xhr.responseText) as IRawData;
}

function transformData(rawData: IRawData): IData {
    let prevDate = getDate(rawData.start);
    prevDate.setDate(prevDate.getDate() - 1);

    const nodes = rawData.nodes.map(rawNode => {
        let curDate: Date, value: number;

        prevDate.setDate(prevDate.getDate() + 1);

        if (Array.isArray(rawNode)) {
            curDate = getDate(rawNode[0]);
            value = rawNode[1];
        } else {
            curDate = cloneDate(prevDate);
            value = rawNode;
        }

        const date: IDataDate = curDate.getTime() === prevDate.getTime() ? curDate : [prevDate, curDate];

        prevDate = cloneDate(curDate);

        return { date, value };
    });

    return {
        max: rawData.max,
        nodes
    };
}

function cloneDate(date: Date): Date {
    return new Date(date.getTime());
}

function getDate(date: string): Date {
    const [day, month, year] = date.split('.').map(s => Number(s));

    return new Date(year, month - 1, day);
}
