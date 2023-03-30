import { alpha, styled } from "@mui/material/styles";
import { FormControl, FormHelperText, MenuItem } from "@mui/material";

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: 16,
  marginTop: 8,
  position: "relative",
  backgroundColor: "#fff",
  "& .MuiFormLabel-root": {
    // maxWidth: "calc(100% - 42px)",
    "& .MuiFormLabel-asterisk": {
      color: theme.palette.error.main,
    },
    transform: "translate(8px, 15px) scale(1)",
    fontSize: "14px",
    "&.Mui-focused, &.MuiFormLabel-filled": {
      transform: "translate(8px, 4px) scale(.75)",
      fontSize: "14px",
    },
  },
  "& .MuiList-root": {
    padding: "16px 0px",
  },
  "& .MuiFilledInput-root": {
    "& .MuiFilledInput-input": {
      paddingTop: 18,
      paddingBottom: 4,
      fontSize: 14,
      paddingLeft: 8,
    },

    "& .MuiSelect-select.MuiInputBase-input.MuiFilledInput-input": {
      "&:focus": {
        backgroundColor: "transparent",
      },
    },
    border: "1px solid #e2e2e1",
    "&.Mui-error": {
      border: "1px solid #d32f2f",
    },
    "&.Mui-disabled": {
      "& .MuiFilledInput-input.Mui-disabled": {
        cursor: "not-allowed",
        pointerEvents: "unset",
        backgroundColor: "rgba(0, 0, 0, 0.12)",
      },
      "&::before": {
        borderBottomStyle: "none",
      },
      "&:hover": {
        // backgroundColor: "rgba(0, 0, 0, 0.12)",
      },
    },
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "transparent",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),

    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
    "&::before , &::after , &:hover::after, &:hover::before": {
      borderBottom: "none !important",
    },
  },
}));

export const SimpleStyledFormControl = styled(FormControl)`
  /* min-width: 153px; */
  overflow: "hidden";
  border-radius: 4;
  background-color: #fff;
  transition: ${(props) =>
    props.theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ])};

  & .MuiInputBase-root {
    background-color: transparent;
    border: 1px solid #e2e2e1;
    border-radius: 4px;
    &:hover {
      background-color: transparent;
    }
    &.Mui-focused {
      border: 1px solid ${(props) => props.theme.palette.primary.main};
      background-color: transparent;
    }
    &::before,
    &::after {
      display: none;
    }
  }
  & .MuiSelect-select {
    &.MuiFilledInput-input {
      padding: 4px 30px 4px 10px;
      font-size: 14px;
      color: #5c5c5c;

      background-color: transparent;
    }
  }

  &.Mui-disabled {
    & .MuiFilledInput-input.Mui-disabled {
      cursor: "not-allowed";
      pointer-events: "unset";
    }
    &::before {
      border-bottom-style: "none";
    }
    &:hover {
      background-color: "rgba(0, 0, 0, 0.12)";
    }
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  font-size: 14px;
`;

export const StyledFormHelperText = styled(FormHelperText)`
  font-size: 10px;
  margin-top: 0;
  margin-left: 8px;
  position: absolute;
  bottom: -16px;
  white-space: nowrap;
`;
