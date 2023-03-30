import { styled } from "@mui/material";
import { DefaultColors } from "../../../common/constants/colors";

export const SingleOTPInputStyled = styled("input")`
  padding: 2px;
  border-radius: 2px;
  border: 1px solid ${DefaultColors.typoLightest};
  background-color: transparent;
  box-sizing: border-box;
  text-align: center;
  color: ${({ theme }) => DefaultColors.typoLightFn(theme.palette.mode)};
  user-select: none;

  &.otp-input {
    /* &:not(:last-child) {
      margin-right: 10px;
    } */
  }
  &:focus-visible {
    user-select: none;
    outline: none;
    border: 1px solid ${(props) => props.theme.palette.primary.main};
  }
`;
