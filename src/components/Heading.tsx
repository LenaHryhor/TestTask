import {Typography, TypographyProps} from "@mui/material";
import React from "react";

export default function Heading(props: TypographyProps) {
    return <Typography variant="h4" sx={{mt: 3, mb: 5}} {...props} />;
}
