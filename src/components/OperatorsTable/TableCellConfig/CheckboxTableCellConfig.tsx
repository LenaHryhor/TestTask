import {Action} from "@reduxjs/toolkit";
import {useAppDispatch} from "../../../app/hooks";
import {Checkbox, TableCell} from "@mui/material";
import React from "react";
import {TableCellConfig} from "./TableCellConfig";

export class CheckboxTableCellConfig implements TableCellConfig {
    constructor(private checked: boolean, private onChangeAction: Action) {
    }

    sortingValue = () => this.checked;

    checkFilter = (searchTerm: string): boolean => false;

    component = () => {
        const dispatch = useAppDispatch();

        return <TableCell><Checkbox checked={this.checked} onChange={() => dispatch(this.onChangeAction)}/></TableCell>;
    }
}