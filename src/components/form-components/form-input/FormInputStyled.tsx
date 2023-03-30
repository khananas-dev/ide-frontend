import { alpha, styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { Box } from "@mui/material";
import { IFormInputProps } from "./FormInput";
import { DefaultColors } from "../../../common/constants/colors";
import { EncryptSensitiveInfo } from "../../../utils/string-encryption";

export const StyledTextField = styled(
  ({ defaultWidth, size, ...others }: TextFieldProps & IFormInputProps) => (
    <TextField
      style={{
        marginBottom: size === "small" ? 0 : 16,
        marginTop: size === "small" ? 0 : 8,
        width: defaultWidth || undefined,
      }}
      variant="filled"
      InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
      {...others}
    />
  )
)((props) => ({
  "& .MuiFilledInput-root": {
    border: `1px solid ${DefaultColors.divider}`,
    overflow: "hidden",
    height:
      props.size == "small"
        ? props.multiline
          ? "auto"
          : "34px"
        : props.multiline
        ? "auto"
        : "46px",
    borderRadius: 4,
    backgroundColor: props.theme.palette.mode === "light" ? "#fff" : "#2b2b2b",
    transition: props.theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover:not(.Mui-disabled)": {
      backgroundColor:
        props.theme.palette.mode === "light" ? "transparent" : "#2b2b2b",
    },
    "&.Mui-focused:not(.Mui-disabled):not(.Mui-error)": {
      backgroundColor:
        props.theme.palette.mode === "light" ? "transparent" : "#2b2b2b",
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor:
        props.theme.palette.mode === "light"
          ? props.theme.palette.primary.main
          : props.theme.palette.primary.light,
    },
    "&.Mui-disabled": {
      backgroundColor:
        props.theme.palette.mode === "light"
          ? DefaultColors.divider
          : "#2b2b2b",
      borderColor: "#a8a8a8",
    },
    "&.Mui-error": {
      borderColor: DefaultColors.statusError,
    },
    ".MuiFilledInput-input": {
      paddingTop: props.multiline ? "0" : "15px",
      fontSize: "14px",
      marginTop: props.multiline
        ? /* Textarea */ props.label
          ? "-4px"
          : "-18px"
        : /* Inputbox */ props.label
        ? props.size == "small"
          ? "6px"
          : "8px"
        : "-8px",
      marginLeft: props.multiline
        ? "-4px"
        : props.InputProps?.startAdornment
        ? "-8px"
        : "0",
      paddingLeft: props.multiline ? "0" : "8px",
      paddingRight: props.multiline ? "0" : "8px",
      paddingBottom: "6px",
      height: "43.3px",
      color: DefaultColors.typoDefaultFn(props.theme.palette.mode),
    },
    ".MuiInputAdornment-root": {
      marginTop: "2px !important",
      marginLeft: "-5px",
    },
    "&:before, &:after": {
      display: "none",
    },
  },
  ".MuiFormHelperText-root": {
    fontSize: "10px",
    marginTop: 0,
    marginLeft: "8px",
    position: "absolute",
    bottom: "-16px",
    whiteSpace: "nowrap",
  },
  ".MuiInputLabel-root": {
    transform: `translate(${
      props.InputProps?.startAdornment ? "38px" : "8px"
    }, ${props.size == "small" ? "8px" : "12px"}) scale(1)`,
    fontSize: "14px",
    "& .MuiFormLabel-asterisk": {
      color: props.theme.palette.error.main,
    },
    color: DefaultColors.typoLightFn(props.theme.palette.mode),
    "&.Mui-focused": {
      color:
        props.theme.palette.mode === "light"
          ? props.theme.palette.primary.main
          : props.theme.palette.primary.light,
    },
    "&.Mui-focused, &.MuiFormLabel-filled": {
      transform: `translate(${
        props.InputProps?.startAdornment ? "38px" : "8px"
      }, ${props.size == "small" ? "2px" : "4px"}) scale(${
        props.size == "small" ? ".65" : ".75"
      })`,
      fontSize: "14px",
    },
  },
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "input[type=number]": {
    MozAppearance: "textfield",
  },

  // /* Firefox */
  // input[type=number] {
  //   -moz-appearance: textfield;
  // }
}));

export const StyledReadOnlyTextBox = styled(
  (props: {
    label?: string;
    value?: string;
    className?: string;
    isMasked?: boolean;
    type?: string | "password";
  }) => (
    <Box className={props.className}>
      <div className="readonly-textbox-label">{props.label}</div>
      <div className="readonly-textbox-value">
        {props.isMasked
          ? EncryptSensitiveInfo(props.value)
          : props.type === "password"
          ? "*".repeat(props.value?.length || 0)
          : props.value}
      </div>
    </Box>
  )
)((props) => ({
  fontFamily: props.theme.typography.fontFamily,
  "&.readonly-textbox": {
    marginTop: "2px",
    ".readonly-textbox-label": {
      fontSize: "12px",
      color: DefaultColors.typoLightFn(),
    },
    ".readonly-textbox-value": {
      marginTop: "2px",
    },
  },
  "&.d-inline-block.readonly-textbox": {
    "& .readonly-textbox-value": {
      display: "inline-block",
    },
  },
}));
