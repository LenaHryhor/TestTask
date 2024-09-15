import {TableCell} from "@mui/material";
import AvatarWithName from "../../AvatarWithName";
import React from "react";
import {TableCellConfig} from "./TableCellConfig";

export class AvatarTableCellConfig implements TableCellConfig {
    constructor(private avatar: string, private name: string) {
    }

    sortingValue = () => this.name;

    checkFilter = (searchTerm: string): boolean => this.name.toLowerCase().includes(searchTerm.toLowerCase());

    component = () => <TableCell><AvatarWithName name={this.name} avatar={this.avatar}/></TableCell>;
}