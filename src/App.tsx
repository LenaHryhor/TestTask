import React from 'react';
import './App.css';
import {DataTable} from "./features/table/DataTable";
import {Typography} from "@mui/material";

function App() {
    return (
        <div className="App">
            <Typography
                variant="h4"
                align='left'
                sx={{padding: '1rem 0'}}
            >Оператори</Typography>
            <DataTable/>
        </div>
    );
}

export default App;
