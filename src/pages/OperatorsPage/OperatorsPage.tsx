import {Box, Paper, TablePagination, useTheme} from "@mui/material";
import {OperatorsTable} from "../../components/OperatorsTable/OperatorsTable";
import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    loadData,
    selectLoadingStatus,
    setOrder,
    setPage,
    setRowsPerPage,
    setSearchTerm,
    setSortBy
} from "../../features/operators/operatorsDataSlice";
import SearchBar from "../../components/SearchBar";
import {useOperatorsTableData} from "./useOperatorsTableData";
import Heading from "../../components/Heading";
import LoadingContent from "../../components/LoadingContent";

export default function OperatorsPage() {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadData());
    }, [dispatch]);

    const loadingStatus = useAppSelector(selectLoadingStatus);

    const {rows, rowsCount, columns, pagination, sorting, searchTerm} = useOperatorsTableData();

    const handleSearch = useCallback((searchTerm: string) => dispatch(setSearchTerm(searchTerm)), []);

    const handlePageChange = useCallback(
        (event: React.MouseEvent<HTMLButtonElement> | null, page: number) =>
            dispatch(setPage(page)),
        []);

    const handleRowsPerPageChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            dispatch(setRowsPerPage(+event.target.value)),
        []);

    const handleSort = useCallback((columnId: number) => {
        const isAsc = sorting.sortBy === columnId && sorting.order === 'asc';
        dispatch(setOrder(isAsc ? 'desc' : 'asc'))
        dispatch(setSortBy(columnId))
    }, [sorting]);

    return (
        <Box p={3}>
            <Heading>Оператори</Heading>
            {loadingStatus === 'loading'
                ? <LoadingContent />
                : <Paper>
                    <SearchBar label="Пошук"
                               placeholder="Ім’я користувача…"
                               value={searchTerm}
                               onSearch={handleSearch}
                               sx={{m: 2, minWidth: 300}}
                    />
                    <OperatorsTable rows={rows}
                                    columns={columns}
                                    sorting={sorting}
                                    onSort={handleSort}
                    />
                    <TablePagination
                        component="div"
                        count={rowsCount}
                        rowsPerPage={pagination.rowsPerPage}
                        rowsPerPageOptions={pagination.rowsPerPageOptions}
                        sx={{
                            '& .MuiTablePagination-selectLabel': {
                                color: theme.palette.text.secondary,
                            },
                        }}
                        page={pagination.page}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </Paper>
            }
        </Box>
    );
}
