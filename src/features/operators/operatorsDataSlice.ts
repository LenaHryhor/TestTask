import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Operator, OperatorAddon, Order, Pagination, Sorting} from "./types";

interface OperatorsDataState {
    operators: Operator [];
    operatorAddons: OperatorAddon [];
    status: 'idle' | 'loading' | 'failed';
    pagination: Pagination;
    sorting: Sorting;
    searchTerm: string;
}

const initialState: OperatorsDataState = {
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
        },
        getOperators: (state) => {
            state.status = 'loading';
        },
        getOperatorsSuccess: (state, action: PayloadAction<{operators: Operator[], operatorAddons: OperatorAddon[]}>) => {
            state.status = 'idle';
            state.operators = action.payload.operators;
            state.operatorAddons = action.payload.operatorAddons;
        },
        getOperatorsError: (state) => {
            state.status = 'failed';
        },
    }
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
    setSearchTerm,
    getOperators,
    getOperatorsSuccess,
    getOperatorsError
} = operatorsDataSlice.actions;

export default operatorsDataSlice.reducer;