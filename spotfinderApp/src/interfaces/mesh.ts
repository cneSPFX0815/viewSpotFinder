
export interface Mesh
{
    nodes: NodeObject[];
    elements: ElementObject[];
    values: ValueObject[];
}

export interface NodeObject
{
    id: string;
    x: number;
    y: number;
}

export interface ElementObject
{
    id: string;
    nodes: number[];
}


export interface ValueObject
{
    element_id: string;
    value: number;
}


