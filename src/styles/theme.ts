import {createTheme} from '@mui/material/styles';
import {DefaultTheme} from "styled-components";

export const theme: DefaultTheme = createTheme({
    typography: {
        fontFamily: '"Rubik", sans-serif',
    },
    palette: {
        primary: {
            main: '#F04259',
        },
        secondary: {
            main: '#cb5d68',
        },
        text: {
            primary: '#000',
            secondary: '#668099',
        },
    },
});
