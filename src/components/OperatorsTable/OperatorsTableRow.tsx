import {TableRow} from "@mui/material";
import {Row} from "./types";

interface Props {
    row: Row;
}

export default function OperatorsTableRow({row}: Props) {
    return (
        <TableRow>
            {row.cells.map((cell, index) => <cell.component key={index}/>)}
        </TableRow>
    );
}