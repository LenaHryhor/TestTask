import {Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, useTheme} from "@mui/material";
import {
    Column,
    Pagination,
    Row,
    setOperatorIsWorking,
    setOrder,
    setPage,
    setRowsPerPage,
    setSortBy,
    Sorting
} from "../features/operators/ordersTableSlice";
import OperatorsTableRow from "./OperatorsTableRow";
import {BoldTableCell} from "./BoldTableCell";
import {useAppDispatch} from "../app/hooks";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import * as React from "react";

interface Props {
    rows: Row[];
    columns: Column[];
    pagination: Pagination;
    sorting: Sorting;
    rowsPerPageOptions: number[];
    totalPages: number;
}

export function OperatorsTable({
                                   rows,
                                   columns,
                                   pagination,
                                   sorting,
                                   rowsPerPageOptions,
                                   totalPages
                               }: Props) {
    const {page, rowsPerPage} = pagination;
    const {sortBy, order} = sorting;

    const dispatch = useAppDispatch();
    const theme = useTheme();

    function handlePageChange(event: React.MouseEvent<HTMLButtonElement> | null, page: number) {
        dispatch(setPage(page));
    }

    function handleRowsPerPageChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        dispatch(setRowsPerPage(+event.target.value));
    }

    function handleOperatorIsWorkingChange(id: string) {
        dispatch(setOperatorIsWorking(id))
    }

    const handleSort = (field: string) => {
        const isAsc = sortBy === field && order === 'asc';

        dispatch(setOrder(isAsc ? 'desc' : 'asc'))
        dispatch(setSortBy(field))
    };

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <BoldTableCell key={index}
                                               sortDirection={sortBy === column.id ? order : false}>
                                    <TableSortLabel
                                        active={sortBy === column.id}
                                        direction={sortBy === column.id ? order : 'asc'}
                                        onClick={() => handleSort(column.id)}>
                                        {column.label}
                                        {sortBy === column.id ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </BoldTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <OperatorsTableRow key={index}
                                               row={row}
                                               onOperatorIsWorkingChange={handleOperatorIsWorkingChange}/>))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalPages}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                sx={{
                    '& .MuiTablePagination-selectLabel': {
                        color: theme.palette.text.secondary,
                    },
                }}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </Paper>
    );
}

