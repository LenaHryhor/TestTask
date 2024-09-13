import {
    Avatar,
    Checkbox, Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow, Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    dataLoad, selectColumns, selectPage,
    selectRows, selectRowsPerPage,
    setPage, setRowsPerPage, Row, setOperatorIsWorking
} from "./dataTableSlice";
import styled from "styled-components";
import {format} from "date-fns";
import {useEffect} from "react";

const BoldTableCell = styled(TableCell)`
    font-weight: bold !important;
`;

const rowsPerPageOptions = [5, 10, 15];

export function DataTable() {
    const {rows, rowsCount} = useAppSelector(selectRows);
    const columns = useAppSelector(selectColumns);
    const page = useAppSelector(selectPage);
    const rowsPerPage = useAppSelector(selectRowsPerPage);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(dataLoad());
    }, [dispatch]);

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <BoldTableCell key={index}>{column.label}</BoldTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <DataTableRow row={row} key={index}
                                      onOperatorIsWorkingChange={() => dispatch(setOperatorIsWorking(row.id))}/>))
                    }
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={rowsCount}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={rowsPerPageOptions}
                labelRowsPerPage={(<Typography variant='body1' sx={{color: '#668099'}}>Rows per page:</Typography>)}
                page={page}
                onPageChange={(e, newPage) => dispatch(setPage(newPage))}
                onRowsPerPageChange={(e) => dispatch(setRowsPerPage(+e.target.value))}
            />
        </>
    );
}

function DataTableRow({row, onOperatorIsWorkingChange}: {
    row: Row,
    onOperatorIsWorkingChange: () => void
}) {
    return (
        <TableRow>
            <BoldTableCell>{row.id}</BoldTableCell>
            <TableCell>
                <Stack direction="row">
                    <Avatar alt={row.name} src={row.avatar}
                            sx={{marginRight: '1.5rem'}}/>
                    {row.name}
                </Stack>
            </TableCell>
            <TableCell>
                <Checkbox checked={row.isWorking}
                          onChange={onOperatorIsWorkingChange}/>
            </TableCell>
            <TableCell>{format(row.createdAt, 'dd.MM.yyyy HH:mm')}</TableCell>
            {row.fields.map((field, index) => (
                <TableCell key={index}>{field}</TableCell>
            ))}
        </TableRow>
    );
}