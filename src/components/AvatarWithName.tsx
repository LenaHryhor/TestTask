import {Avatar, Stack, useTheme} from "@mui/material";

interface Props {
    name: string;
    avatar: string;
}

export default function AvatarWithName({name, avatar}: Props) {
    const theme = useTheme();

    return (
        <Stack direction="row">
            <Avatar alt={name} src={avatar}
                    sx={{marginRight: theme.spacing(3)}}/>
            {name}
        </Stack>
    );
}