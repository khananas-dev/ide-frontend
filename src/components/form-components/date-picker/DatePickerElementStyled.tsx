import { Box, styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import { createGlobalStyle } from "styled-components";

export const StyledDatePickerField = styled(TextField)((props) => ({
  marginBottom: 16,
  marginTop: 8,
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    height:
      props.size === "small"
        ? props.multiline
          ? "auto"
          : "34px"
        : props.multiline
        ? "auto"
        : "46px",
    borderRadius: 4,
    backgroundColor: "transparent",
    transition: props.theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover:not(.Mui-disabled)": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused:not(.Mui-disabled):not(.Mui-error)": {
      backgroundColor: "transparent",
      // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: props.theme.palette.primary.main,
    },
    "&.Mui-disabled": {
      backgroundColor:
        props.theme.palette.mode === "light" ? "#e0e0e0" : "#2b2b2b",
      borderColor: "#a8a8a8",
    },
    "&.Mui-error": {
      borderColor: "#ce0019",
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
    "&.Mui-focused, &.MuiFormLabel-filled": {
      transform: `translate(${
        props.InputProps?.startAdornment ? "38px" : "8px"
      }, ${props.size == "small" ? "2px" : "4px"}) scale(${
        props.size == "small" ? ".65" : ".75"
      })`,
      fontSize: "14px",
    },
  },
}));

export const CalendarContainer = styled(Box)`
  width: 100%;
`;

export const CalendarGlobalStyle: any = createGlobalStyle`
   .p-datepicker {
    & *{
      box-sizing: border-box;
    }
    border: 1px solid #e0e0e0 !important;
    background-color: #ffffff !important;
    box-sizing: border-box !important;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2) !important;
    padding: 14px 15px 10px 15px;
    // width: 310px !important;
    border-radius: 0px;
    z-index: 1300 !important;

    &:not(.p-disabled) {
      .p-yearpicker {
        .p-yearpicker-year {
          &.p-highlight {
            background: ${(props: any) => props.themeData.palette.primary.main};
            color: #fff;
          }
          &:not(.p-disabled):not(.p-highlight):hover {
            background: ${(props: any) =>
              props?.theme?.palette?.primary?.lightShade1};
          }
        }
      }
      .p-monthpicker {
        .p-monthpicker-month {
          &.p-highlight {
            background: ${(props: any) => props.themeData.palette.primary.main};
            color: #fff;
          }
          &:not(.p-disabled):not(.p-highlight):hover {
            background: ${(props: any) =>
              props?.theme?.palette?.primary?.lightShade1};
          }
        }
      }
      & table {
        & td {
          & span:not(.p-highlight):not(.p-disabled):hover {
            background: ${(props: any) =>
              props?.theme?.palette?.primary?.lightShade1} !important;
          }
        }
      }
    }

    table {
      td {
        & > span.p-highlight {
          background: ${(props: any) => props.themeData.palette.primary.main};
          color: #fff;
        }
      }
    }

    & .p-datepicker-header {
      padding: 0;
      border: 0px;
      display: block;
      position: relative;
      text-align: center;
      .date-picker-custom-header {
        border-bottom: 1px solid #e0e0e0;
        margin-bottom: 10px;

        & > p {
          margin: 0px;
          color: #5c5c5c;
          font-size: 14px;
          font-family: "Roboto", sans-serif;
          font-weight: 500;
          padding: 10px;
        }
        .date-info-container {
          border: 1px solid ${(props: any) =>
            props.themeData.palette.primary.main};
          border-radius: 4px;
          display: flex;
          margin: 0px 0px 10px 0px;

          .date-toggel-button {
            width: 50%;
            display: inline-block;
            font-size: 14px;
            font-family: "Roboto", sans-serif;
            text-transform: uppercase;
            font-weight: 500;
            input[type="radio"] {
              display: none;
            }
            input[type="radio"]:checked + label {
              background: ${(props: any) =>
                props.themeData.palette.primary.main};
              color: #fff;
            }
            label {
              cursor: pointer;
              z-index: 9;
              width: 100%;
              display: inline-block;
              padding: 6px 0px;
            }
          }
        }
      }

      .p-datepicker-prev {
        position: absolute;
        left: 0px;
      }
      .p-datepicker-next {
        position: absolute;
        right: 0px;
      }
      .p-datepicker-month,
      .p-datepicker-year {
        font-family: "Roboto", sans-serif;
        color: #191919 !important;
        font-weight: 500 !important;
      }

      .p-datepicker-title {
        display: inline-block;
        .p-datepicker-month {
          margin: 0px;
        }
      }
      & .p-link {
        font-size: 14px;
      }
    }
    & .p-datepicker-calendar {
      font-size: 14px;
      font-family: "Roboto", sans-serif;
      color: #5c5c5c;
      & td,
      & th {
        padding: 0px;
        height: 40px;
        width: 40px;
      }
      & th {
        color: #191919;
        font-weight: 500;
      }
      td {
        & > span {
          border-radius: 4px !important;
        }

        &.p-datepicker-today {
          & > span {
            background: transparent;
            border: 1px solid ${(props: any) =>
              props.themeData.palette.primary.main};
          }
          & .p-highlight {
            border-radius: 0%;
            border: 1px solid ${(props: any) =>
              props.themeData.palette.primary.main};
            background-color: transparent;
          }
        }
      }
    }

    & .p-timepicker {
      span {
        font-size: 16px;
      }
      & div.p-separator {
        padding: 0px;
        font-size: 18px;
        &:nth-of-type(4) {
          display: none;
        }
      }
      button {
        width: 16px;
        height: 16px;
        color: #797979;
        margin: 0px;
        border-radius: 0% !important;
        &:hover {
          background: transparent !important;
        }
      }
      & .p-hour-picker,
      & .p-minute-picker {
        & > span {
          padding: 8px 10px 8px 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #c2c2c2;
          font-family: "Roboto", sans-serif;
          font-size: 14px;
          display: inline-block;
          margin: 5px 0px;
          border-radius: 4px;
        }
      }

      & .p-ampm-picker {
        & > span {
          padding: 9px 15px 9px 15px;
          border-radius: 4px;
          background-color: ${(props: any) =>
            props.themeData.palette.primary.main};
          box-sizing: border-box;
          font-family: "Roboto", sans-serif;
          font-weight: 500;
          color: #ffffff;
          text-align: center;
          line-height: 16px;
          font-size: 14px;
        }
        & .p-link {
          display: none;
        }
      }
    }

    & .p-datepicker-footer {
      padding: 10px 0px 0px 0px;
      margin-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
  }

  .p-input-icon-right {
    border-radius: 4px;
    & > i {
      cursor: pointer;
    }
    .p-calendar {
      .p-inputtext {
        font-size: 14px;
        padding: 15px 8px 9px 8px;
        border-radius: 4px;
        min-width: 210px;
        &:focus {
          box-shadow: rgba(150, 43, 176, 0.25) 0 0 0 2px;
        }
      }
    }
    &.p-float-label {
      & > label {
        left: 8px;
      }
      label {
        font-size: 14px;
        margin-top: 0px;
        transform: translateY(-50%);
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        letter-spacing: 0.00938em;
      }
      .p-inputwrapper-filled ~ label,
      .p-inputwrapper-focus ~ label {
        top: 12px;
        font-size: 11px;
        color: ${(props: any) => props.themeData.palette.primary.main};
      }
    }
    &.input-disabled {
      background-color: rgba(0, 0, 0, 0.12);
      .p-float-label {
        label {
          color: rgba(0, 0, 0, 0.38);
        }
      }
      cursor: not-allowed;
      & > i {
        cursor: unset;
      }
    }
  }
`;
