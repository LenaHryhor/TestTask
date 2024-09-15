import React from "react";

export interface TableCellConfig {
    component: React.FC;
    checkFilter(searchTerm: string): boolean;
    sortingValue(): any;
}

