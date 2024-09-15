import {Box, CircularProgress, Typography} from "@mui/material";
import React from "react";

export default function LoadingContent() {
    return <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
    >
        <Typography>Завантаження...</Typography>
        <CircularProgress/>
    </Box>
}