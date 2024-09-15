import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchOperatorAddons, fetchOperators, Operator, OperatorAddon} from './operatorsAPI';

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

export interface OperatorsTableState {
    operators: Operator [];
    operatorAddons: OperatorAddon [];
    status: 'idle' | 'loading' | 'failed';
    pagination: Pagination;
    sorting: Sorting;
    searchTerm: string;
}

const initialState: OperatorsTableState = {
    operators: [],
    operatorAddons: [],
    status: 'idle',
    pagination: {
        page: 0,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 25],
    },
    sorting: {
        sortBy: 0,
        order: 'asc',
    },
    searchTerm: '',
};

export const loadData = createAsyncThunk(
    'operators/fetchData',
    async () => {
        const [operators, operatorAddons] = await Promise.all([
            fetchOperators(),
            fetchOperatorAddons()
        ]);
        return {operators, operatorAddons};
    }
);

export const operatorsDataSlice = createSlice({
    name: 'operatorsData',
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
            state.pagination.rowsPerPage = action.payload;
            state.pagination.page = 0;
        },
        setOrder: (state, action: PayloadAction<Order>) => {
            state.sorting.order = action.payload;
        },
        setSortBy: (state, action: PayloadAction<number>) => {
            state.sorting.sortBy = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadData.fulfilled, (state, action) => {
                state.status = 'idle';
                state.operators = action.payload.operators;
                state.operatorAddons = action.payload.operatorAddons;
            })
            .addCase(loadData.rejected, (state) => {
                state.status = 'failed';
            });
    },

});

export const selectOperators = (state: RootState) => state.operatorsData.operators;
export const selectOperatorAddons = (state: RootState) => state.operatorsData.operatorAddons;

export const selectPagination = (state: RootState) => state.operatorsData.pagination;
export const selectSorting = (state: RootState) => state.operatorsData.sorting;
export const selectSearchTerm = (state: RootState) => state.operatorsData.searchTerm;

export const selectLoadingStatus = (state: RootState) => state.operatorsData.status;

export const {
    setOperatorIsWorking,
    setRowsPerPage,
    setPage,
    setOrder,
    setSortBy,
    setSearchTerm
} = operatorsDataSlice.actions;

export default operatorsDataSlice.reducer;