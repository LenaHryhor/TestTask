import {Operator, OperatorAddon} from "./types";

const API_TOKEN = '66a7f07b53c13f22a3d17fb1';
const url = (endpoint: string) => `https://${API_TOKEN}.mockapi.io/api/${endpoint}`;

async function fetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(url(endpoint));
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    return response.json();
}

export function fetchOperators(): Promise<Operator[]> {
    return fetchData<Operator[]>('operator');
}

export function fetchOperatorAddons(): Promise<OperatorAddon[]> {
    return fetchData<OperatorAddon[]>('operatorAddon');
}
