
export interface Operator {
    createdAt: string;
    name: string;
    avatar: string;
    isWorking: boolean;
    id: string;
}

export interface OperatorAddon {
    fieldName: string;
    text: string;
    isChecked: boolean;
    id: string;
}

export type Order = 'asc' | 'desc';

export interface Pagination {
    page: number;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
}

export interface Sorting {
    sortBy: number;
    order: Order;
}
