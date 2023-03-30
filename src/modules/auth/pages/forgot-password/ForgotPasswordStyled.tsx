import { BoxProps } from "@mui/material";
import { Box, styled } from "@mui/system";
import { DefaultColors } from "../../../../common/constants/colors";

export const ForgotPasswordContainer = styled((props: BoxProps) => (
  <Box className={props.className}>{props.children}</Box>
))`
  .otp-container {
    margin: 45px 0px 20px 0px;
    max-width: 390px;
    & .otp-input {
      width: 23%;
      height: 45px;
    }
  }
`;

export const ResetPasswordContainer = styled((props: BoxProps) => (
  <Box className={props.className}>{props.children}</Box>
))``;
