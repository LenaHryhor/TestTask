import {Checkbox} from "@mui/material"
import styled from "styled-components"

const StyledCheckbox = styled(Checkbox)`
    &.Mui-checked {
        color: ${({theme}) => theme.palette.secondary.main};
    }
`

export default StyledCheckbox
