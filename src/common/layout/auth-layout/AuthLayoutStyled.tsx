import { BoxProps } from "@mui/material";
import { Box, styled } from "@mui/system";
import { DefaultColors } from "../../constants/colors";

export const AuthLayoutStyled = styled((props: BoxProps) => (
<Box className={props.className}> 
{props.children}
</Box>
))((props) => ({
    backgroundColor: DefaultColors.backgroundColorFn(props.theme.palette.mode),
    color: DefaultColors.typoDefaultFn(props.theme.palette.mode)
}))