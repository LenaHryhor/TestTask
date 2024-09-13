import {Row} from "../features/operators/ordersTableSlice";
import {TableCell, TableRow} from "@mui/material";
import {format} from "date-fns";
import {BoldTableCell} from "./BoldTableCell";
import AvatarWithName from "./AvatarWithName";
import StyledCheckbox from "./StyledCheckBox";

interface Props {
    row: Row;
    onOperatorIsWorkingChange: (rowId: string) => void;
}

export default function OperatorsTableRow({row, onOperatorIsWorkingChange}: Props) {
    const dataFormat = 'dd.MM.yyyy HH:mm';
    return (
        <TableRow>
            <BoldTableCell>{row.id}</BoldTableCell>
            <TableCell>
                <AvatarWithName name={row.name} avatar={row.avatar}/>
            </TableCell>
            <TableCell>
                <StyledCheckbox checked={row.isWorking}
                                onChange={() => onOperatorIsWorkingChange(row.id)}/>
            </TableCell>
            <TableCell>{format(row.createdAt, dataFormat)}</TableCell>
            {row.fields.map((field, index) => (
                <TableCell key={index}>{field}</TableCell>
            ))}
        </TableRow>
    );
}