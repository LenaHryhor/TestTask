import {createTheme} from '@mui/material/styles';
import {DefaultTheme} from "styled-components";

export const theme: DefaultTheme = createTheme({
    typography: {
        fontFamily: '"Rubik", sans-serif',
    },
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#F04259',
        },
        text: {
            primary: '#000',
            secondary: '#668099',
        },
    },
});