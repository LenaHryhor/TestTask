import {Avatar, Stack} from "@mui/material";
import styled from "styled-components";

const StyledStack = styled(Stack)`
    white-space: nowrap;
    align-items: baseline;
`;

interface Props {
    name: string;
    avatar: string;
}

export default function AvatarWithName({ name, avatar }: Props) {
    return (
        <StyledStack direction="row">
            <Avatar alt={name} src={avatar} sx={{ mr: 3 }} />
            {name}
        </StyledStack>
    );
}