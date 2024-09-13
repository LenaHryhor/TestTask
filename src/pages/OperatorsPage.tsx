import {Box, Typography} from "@mui/material";
import {OperatorsTable} from "../components/OperatorsTable";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {
    dataLoad,
    selectColumns,
    selectPagination,
    selectRows,
    selectSearchTerm,
    selectSorting,
    setSearchTerm
} from "../features/operators/ordersTableSlice";
import SearchBar from "../components/SearchBar";

export default function OperatorsPage() {
    const {rows, rowsCount} = useAppSelector(selectRows);
    const columns = useAppSelector(selectColumns);

    const pagination = useAppSelector(selectPagination);
    const sorting = useAppSelector(selectSorting);
    const searchTerm = useAppSelector(selectSearchTerm);
    const rowsPerPageOptions = [5, 10, 15];

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(dataLoad());
    }, [dispatch]);


    function handleSearch(searchTerm: string) {
        dispatch(setSearchTerm(searchTerm));
    }

    return (<Box p={3}>
            <Typography variant="h4">Оператори</Typography>
            <SearchBar label="Пошук"
                       placeholder="Ім’я користувача…"
                       value={searchTerm}
                       onSearch={handleSearch}
            />
            <OperatorsTable rows={rows}
                            columns={columns}
                            pagination={pagination}
                            rowsPerPageOptions={rowsPerPageOptions}
                            totalPages={rowsCount}
                            sorting={sorting}/>
        </Box>
    );
}