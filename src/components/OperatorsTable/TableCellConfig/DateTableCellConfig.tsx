import {TableCell} from "@mui/material";
import {format} from "date-fns";
import React from "react";
import {TableCellConfig} from "./TableCellConfig";

export class DateTableCellConfig implements TableCellConfig {
    private static dataFormat = 'dd.MM.yyyy HH:mm';

    constructor(private value: string) {
    }

    sortingValue = () => this.value;

    checkFilter = (searchTerm: string): boolean => false;

    component = () => {
        return <TableCell>{format(new Date(this.value), DateTableCellConfig.dataFormat)}</TableCell>;
    }
}