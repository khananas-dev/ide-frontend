import { Checkbox, FormControlLabel, styled } from "@mui/material";
import { DefaultColors } from "../../../common/constants/colors";

export const StyledCheckBox = styled(Checkbox)(({ theme }) => ({
  "&.MuiCheckbox-root": {
    padding: "0px",
    marginRight: "8px",
    display: "inline-flex",
    alignItem: "center",
    color: DefaultColors.typoDefaultFn(theme.palette.mode),

    "&.Mui-checked , &.MuiCheckbox-indeterminate": {
      color: theme.palette.primary.main,
    },
    "&.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.3)",
    },
    "&.Mui-checked.Mui-disabled": {
      color: theme.palette.primary.light,
    },
  },
  "& .MuiSvgIcon-root": {
    fontSize: 21.33,
  },
}));

export const StyledFormControlLabel = styled(FormControlLabel)`
  margin: 0px;
  display: flex;
  align-items: center;
  user-select: none;
  .MuiCheckbox-root {
    margin-right: 4px !important;
  }
  &.heading-label {
    .MuiFormControlLabel-label {
      font-weight: 500;
    }
  }
  & .MuiFormControlLabel-label {
    font-size: 14px;
    &.Mui-disabled {
      color: ${({ theme }) => DefaultColors.typoDefaultFn(theme.palette.mode)};
    }
  }
`;
