import { styled } from "@mui/material/styles";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export const StyledFormControlLabel = styled(FormControlLabel)`
  margin: 0px;
  margin-right: 20px;
  & .MuiTypography-root {
    font-size: 14px;
    line-height: normal;
  }
`;
export const StyledInputRadio = styled(Radio)(({ theme }) => ({
  padding: "0px 5px 0px 0px",
  "& .MuiSvgIcon-root": {
    fontSize: 17,
  },
  "& .MuiTypography-root": {
    fontSize: 14,
  },
  "&.MuiRadio-root": {
    "&.Mui-checked.Mui-disabled": {
      color: theme.palette.primary.main,
      opacity: 0.6,
    },
  },
}));

export const StyledRadioGroup = styled(RadioGroup)`
  display: block;
  .radio-group {
    padding: 9px 0px;
    & > .radio-group-label {
      font-size: 14px;
      color: #333333;
      margin-right: 15px;
      line-height: normal;
    }
  }
`;
