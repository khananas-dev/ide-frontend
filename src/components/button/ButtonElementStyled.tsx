import { Button, ButtonGroup } from "@mui/material";
import { styled } from "@mui/material";
import { DefaultColors } from "../../common/constants/colors";
import { shouldForwardProp as baseShouldForwardProp } from "@mui/system";

const shouldForwardProp = (prop: any) =>
  baseShouldForwardProp(prop) && prop !== "customColor";
export const StyledButton = styled(Button, { shouldForwardProp })<{
  customColor?: string;
}>`
  &.btn-loadng {
    pointer-events: none !important;
  }
  box-shadow: none;
  &.tertiary-btn {
    padding: 5px 10px 5px 10px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #c2c2c2;
    background-color: #f9f9f9;
  }
  height: ${(props) =>
    props.size === "medium"
      ? "34px"
      : props.size === "small"
      ? "30px"
      : "unset"};

  border-radius: 4px;
  text-transform: none;
  line-height: normal;
  border: 1px solid
    ${(props) =>
      props.className?.includes("tertiary-btn")
        ? DefaultColors.typoLightest
        : props.customColor
        ? props.customColor
        : props?.theme?.palette?.primary?.main};
  color: ${(props) =>
    props.className?.includes("tertiary-btn")
      ? DefaultColors.typoLightFn()
      : props?.theme?.palette?.primary?.contrastText};

  &:not(:is(.Mui-disabled)):hover {
    background-color: ${(props) =>
      props.className?.includes("tertiary-btn")
        ? "#ededee"
        : props.customColor
        ? props.customColor
        : props?.theme?.palette?.primary?.dark};
    border: 1px solid
      ${(props) =>
        props.className?.includes("tertiary-btn")
          ? "#c2c2c2"
          : props?.theme?.palette?.primary?.main};
  }
  .MuiButton-startIcon {
    margin-right: 0;
    margin-left: -8px;
  }
  &.MuiButton-outlined {
    color: ${(props) =>
      props.className?.includes("tertiary-btn")
        ? DefaultColors.typoLightFn()
        : props.customColor
        ? props.customColor
        : props?.theme?.palette?.primary?.main};
    &:not(:is(.Mui-disabled)):hover {
      border-color: ${(props) =>
        props.className?.includes("tertiary-btn")
          ? "#c2c2c2"
          : props.customColor
          ? props.customColor
          : props?.theme?.palette?.primary?.main};
      background-color: ${(props) =>
        props.className?.includes("tertiary-btn")
          ? "#ededee"
          : props.customColor
          ? props.customColor + "1f"
          : props?.theme?.palette?.primary?.light};
    }
  }
  &.Mui-disabled {
    pointer-events: unset;
    cursor: not-allowed;
    border-color: ${({ theme }) =>
      theme.palette.mode === "light"
        ? "rgb(224 224 224)"
        : "rgba(255, 255, 255, 0.12)"} !important;
    color: ${({ theme }) =>
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.26)"
        : "rgba(255, 255, 255, 0.3)"};
    box-shadow: none;
    background-color: ${({ theme }) =>
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.12)"
        : "rgba(255, 255, 255, 0.12)"};
  }
`;

export const StyledButtonGroup = styled(ButtonGroup)`
  &.btn-loadng {
    pointer-events: none !important;
  }
  box-shadow: none;
  pointer-events: unset;
  & .MuiButtonBase-root {
    text-transform: none;
  }
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  & .MuiButtonGroup-grouped:not(:last-of-type).Mui-disabled {
    border-color: ${DefaultColors.typoLightest};
  }
`;
