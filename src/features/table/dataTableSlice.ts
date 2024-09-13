import {createAsyncThunk, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchOperators, fetchOperatorAddons, Operator, OperatorAddon} from './dataTableAPI';

export interface DataTableState {
    operators: Operator [];
    operatorAddons: OperatorAddon [];
    status: 'idle' | 'loading' | 'failed';
    page: number;
    rowsPerPage: number;
    columns: Column[];
    rows: Row[];
}

const initialState: DataTableState = {
    operators: [],
    operatorAddons: [],
    status: 'idle',
    page: 0,
    rowsPerPage: 5,
    columns: [],
    rows: []
};

export const dataLoad = createAsyncThunk(
    'table/fetchData',
    async () => {
        const [operators, operatorAddons] = await Promise.all([
            fetchOperators(),
            fetchOperatorAddons()
        ]);
        return {operators, operatorAddons};
    }
);

export const dataTableSlice = createSlice({
    name: 'dataTable',
    initialState,
    reducers: {
        setOperatorIsWorking: (state, action: PayloadAction<string>) => {
            let operator = state.operators.find((operator) => operator.id === action.payload);
            if (operator) operator.isWorking = !operator.isWorking;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
            state.rowsPerPage = action.payload;
            state.page = 0;
        },
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

export const selectPage = (state: RootState) => state.dataTable.page;
export const selectRowsPerPage = (state: RootState) => state.dataTable.rowsPerPage;
export const selectAllRows = (state: RootState) => state.dataTable.rows;
export const selectColumns = (state: RootState) => state.dataTable.columns;

export const selectRows = createSelector(
    [selectPage, selectRowsPerPage, selectAllRows],
    (page, rowsPerPage, allRows) => {
        const rows = allRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        const rowsCount = allRows.length;
        return {rows, rowsCount};
    }
);

export const {setOperatorIsWorking, setRowsPerPage, setPage} = dataTableSlice.actions;

export default dataTableSlice.reducer;