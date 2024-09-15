import {Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";
import OperatorsTableRow from "./OperatorsTableRow";
import {BoldTableCell} from "./BoldTableCell";
import * as React from "react";
import {Sorting} from "../../features/operators/operatorsDataSlice";
import {Column, Row} from "./types";


interface Props {
    rows: Row[];
    columns: Column[];
    sorting: Sorting;
    onSort: (columnId: number) => void;
}

export function OperatorsTable(props: Props) {
    const {sortBy, order} = props.sorting;
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {props.columns.map((column, index) => (
                            <BoldTableCell key={index}
                                           sortDirection={sortBy === column.id ? order : undefined}
                            >
                                <TableSortLabel
                                    active={sortBy === column.id}
                                    direction={sortBy === column.id ? order : 'asc'}
                                    onClick={() => props.onSort(column.id)}>
                                    {column.label}
                                </TableSortLabel>
                            </BoldTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, index) => <OperatorsTableRow key={index} row={row}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

