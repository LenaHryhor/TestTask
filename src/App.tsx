import React from 'react';
import OperatorsPage from './pages/OperatorsPage/OperatorsPage';
import {theme} from "./styles/theme";
import {ThemeProvider} from "@mui/material";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <OperatorsPage />;
        </ThemeProvider>
    );
}

export default App;
