import React from 'react';
import OperatorsPage from './pages/OperatorsPage';
import {theme} from "./styles/theme";
import { ThemeProvider } from "styled-components";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <OperatorsPage />;
        </ThemeProvider>
    );
}

export default App;
