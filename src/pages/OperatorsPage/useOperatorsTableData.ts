import {useAppSelector} from "../../app/hooks";
import {
    selectOperatorAddons,
    selectOperators,
    selectPagination,
    selectSearchTerm,
    selectSorting,
    setOperatorIsWorking
} from "../../features/operators/operatorsDataSlice";
import {useMemo} from "react";
import {getRowComparator, Row} from "../../components/OperatorsTable/types";
import {TableCellConfig} from "../../components/OperatorsTable/TableCellConfig/TableCellConfig";
import {StringTableCellConfig} from "../../components/OperatorsTable/TableCellConfig/StringTableCellConfig";
import {AvatarTableCellConfig} from "../../components/OperatorsTable/TableCellConfig/AvatarTableCellConfig";
import {CheckboxTableCellConfig} from "../../components/OperatorsTable/TableCellConfig/CheckboxTableCellConfig";
import {DateTableCellConfig} from "../../components/OperatorsTable/TableCellConfig/DateTableCellConfig";
import {Operator, OperatorAddon} from "../../features/operators/types";

export function useOperatorsTableData() {
    const operators = useAppSelector(selectOperators);
    const operatorAddons = useAppSelector(selectOperatorAddons);
    const searchTerm = useAppSelector(selectSearchTerm);
    const sorting = useAppSelector(selectSorting);
    const pagination = useAppSelector(selectPagination);

    const columns = useMemo(() => {
        const columnLabels = [
            '#', 'Користувач', 'Працює', 'Дата/Час створення', ...operatorAddons.map(addon => addon.fieldName)
        ];
        return columnLabels.map((label, index) => ({id: index, label}));
    }, [operatorAddons]);

    const allRows = useMemo(
        () => operators.map(operator => operatorToRow(operator, operatorAddons)),
        [operators, operatorAddons]
    );

    const rows = useMemo(() => {
        const filteredRows = searchTerm
            ? allRows.filter(row => row.cells.some(cell => cell.checkFilter(searchTerm)))
            : allRows;
        return filteredRows.sort(getRowComparator(sorting.order, sorting.sortBy))
            .slice(pagination.page * pagination.rowsPerPage, pagination.page * pagination.rowsPerPage + pagination.rowsPerPage);
    }, [allRows, pagination, sorting, searchTerm]);

    const rowsCount = allRows.length;

    return {rows, rowsCount, columns, pagination, sorting, searchTerm};
}

function operatorToRow(operator: Operator, operatorAddons: OperatorAddon[]): Row {
    const rowCells: TableCellConfig[] = [
        new StringTableCellConfig(parseInt(operator.id), {bold: true}),
        new AvatarTableCellConfig(operator.avatar, operator.name),
        new CheckboxTableCellConfig(operator.isWorking, setOperatorIsWorking(operator.id)),
        new DateTableCellConfig(operator.createdAt),
        ...(operatorAddons.map((addon) => new StringTableCellConfig(addon.text, { minWidth: 250})))
    ];

    return {
        id: operator.id,
        cells: rowCells,
    };
}
