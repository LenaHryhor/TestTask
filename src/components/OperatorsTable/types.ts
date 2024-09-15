import {TableCellConfig} from "./TableCellConfig/TableCellConfig";
import {Order} from "../../features/operators/operatorsDataSlice";

export interface Column {
    id: number;
    label: string;
}

export interface Row {
    id: string;
    cells: TableCellConfig[];
}

function rowAscendingComparator(a: Row, b: Row, sortingColumnId: number) {
    let aValue = a.cells[sortingColumnId].sortingValue();
    let bValue = b.cells[sortingColumnId].sortingValue();

    if (aValue < bValue) {
        return -1;
    }
    if (aValue > bValue) {
        return 1;
    }
    return 0;
}

export function getRowComparator(order: Order, orderBy: number): (a: Row, b: Row) => number {
    return order === 'asc'
        ? (a, b) => rowAscendingComparator(a, b, orderBy)
        : (a, b) => -rowAscendingComparator(a, b, orderBy);
}