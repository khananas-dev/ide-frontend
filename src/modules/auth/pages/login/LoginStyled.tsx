import { BoxProps } from "@mui/material";
import { Box, styled } from "@mui/system";
import { DefaultColors } from "../../../../common/constants/colors";

export const LoginContainer = styled((props: BoxProps) => (
  <Box className={props.className}>{props.children}</Box>
))`
  .login-title {
    margin: 0px 0px 10px 0px;
    font-size: 24px;
    color: ${({ theme }) => DefaultColors.typoDefaultFn(theme.palette.mode)};
  }
  & > p {
    margin: 0px 0px 10px 0px;
    color: ${({ theme }) => DefaultColors.typoLightFn(theme.palette.mode)};
    font-size: 14px;
  }
`;
