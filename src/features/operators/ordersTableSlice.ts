import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchOperatorAddons, fetchOperators, Operator, OperatorAddon} from './dataTableAPI';

export type Order = 'asc' | 'desc';

export interface Pagination {
    page: number;
    rowsPerPage: number;
}

export interface Sorting {
    sortBy: string;
    order: Order;
}

export interface OperatorsTableState {
    operators: Operator [];
    operatorAddons: OperatorAddon [];
    status: 'idle' | 'loading' | 'failed';
    columns: Column[];
    rows: Row[];
    pagination: Pagination;
    sorting: Sorting;
    searchTerm: string;
}

const initialState: OperatorsTableState = {
    operators: [],
    operatorAddons: [],
    status: 'idle',
    rows: [],
    columns: [],
    pagination: {
        page: 0,
        rowsPerPage: 5,
    },
    sorting: {
        sortBy: 'id',
        order: 'asc',
    },
    searchTerm: '',
};

export const dataLoad = createAsyncThunk(
    'operators/fetchData',
    async () => {
        const [operators, operatorAddons] = await Promise.all([
            fetchOperators(),
            fetchOperatorAddons()
        ]);
        return {operators, operatorAddons};
    }
);

export const ordersTableSlice = createSlice({
    name: 'ordersTable',
    initialState,
    reducers: {
        setOperatorIsWorking: (state, action: PayloadAction<string>) => {
            let operator = state.operators.find((operator) => operator.id === action.payload);
            if (operator) operator.isWorking = !operator.isWorking;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.page = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.pagination = {rowsPerPage: action.payload, page: 0};
        },
        setOrder: (state, action: PayloadAction<Order>) => {
            state.sorting.order = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sorting.sortBy = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataLoad.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(dataLoad.fulfilled, (state, action) => {
                state.status = 'idle';

                const operators = action.payload.operators;
                const operatorAddons = action.payload.operatorAddons;

                const {columns, rows} = initializeRowsAndColumns(operators, operatorAddons);
                state.rows = rows;
                state.columns = columns;
            })
            .addCase(dataLoad.rejected, (state) => {
                state.status = 'failed';
            });
    },

});

function initializeRowsAndColumns(operators: Operator[], operatorAddons: OperatorAddon[]) {
    const columns: Column[] = [
        {id: 'id', label: '#'},
        {id: 'name', label: 'Користувач'},
        {id: 'isWorking', label: 'Працює'},
        {id: 'createdAt', label: 'Дата/Час створення'},
        ...operatorAddons.map((addon) => ({
            id: addon.fieldName,
            label: addon.fieldName,
        }))
    ];

    const rows = operators.map((operator) => {
        const fieldsValue = operatorAddons.map((addon) => addon.text);
        const row: Row = {
            ...operator,
            fields: fieldsValue,
        };
        return row;
    });

    return {columns, rows};
}

export interface Column {
    id: string;
    label: string;
}

export interface Row {
    id: string;
    name: string;
    isWorking: boolean;
    createdAt: string;
    avatar: string;
    fields: string[]
}

export const selectStatus = (state: RootState) => state.ordersTable.status;
export const selectAllRows = (state: RootState) => state.ordersTable.rows;
export const selectColumns = (state: RootState) => state.ordersTable.columns;

export const selectPagination = (state: RootState) => state.ordersTable.pagination;
export const selectSorting = (state: RootState) => state.ordersTable.sorting;
export const selectSearchTerm = (state: RootState) => state.ordersTable.searchTerm;

export const selectRows = createSelector(
    [selectPagination, selectAllRows],
    (pagination, allRows) => {
        const rows = allRows.slice(pagination.page * pagination.rowsPerPage, pagination.page * pagination.rowsPerPage + pagination.rowsPerPage);
        const rowsCount = allRows.length;
        return {rows, rowsCount};
    }
);

export const {
    setOperatorIsWorking,
    setRowsPerPage,
    setPage,
    setOrder,
    setSortBy,
    setSearchTerm
} = ordersTableSlice.actions;

export default ordersTableSlice.reducer;