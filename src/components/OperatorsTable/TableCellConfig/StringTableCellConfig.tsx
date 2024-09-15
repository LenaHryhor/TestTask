import {TableCell} from "@mui/material";
import React from "react";
import {TableCellConfig} from "./TableCellConfig";
import {BoldTableCell} from "../BoldTableCell";

export interface StringTableCellOptions {
    bold?: boolean;
    minWidth?: number | string;
}

export class StringTableCellConfig implements TableCellConfig {
    constructor(private value: any, private options?: StringTableCellOptions) {
    }

    sortingValue = () => this.value;

    checkFilter = (searchTerm: string): boolean => false;

    component = () => {
        const Component = this.options?.bold ? BoldTableCell : TableCell;
        return <Component sx={{minWidth: this?.options?.minWidth}}>{this.value}</Component>;
    }
}