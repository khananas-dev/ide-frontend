import { FormControlLabel, styled, Switch } from "@mui/material";
import { DefaultColors } from "../../../common/constants/colors";

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 24,
  height: 14,
  padding: 0,
  display: "flex",
  marginRight: "8px",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translate(9px,0.8px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 0,
    width: 12,
    height: 12,
    transform: "translate(2px,0.8px)",
    "&.Mui-checked": {
      transform: "translate(10px,0.8px)",
      color: "#fff",
      "&.Mui-disabled": {
        opacity: 0.5,
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 0.5,
          backgroundColor: theme.palette.primary.main,
        },
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },
    "&.Mui-disabled": {
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: DefaultColors.typoLightest,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : DefaultColors.typoLight,
    boxSizing: "border-box",
  },
}));

export const StyledFormControlLabel = styled(FormControlLabel)`
  display: inline-flex;
  margin: 0px 5px 0px 0px;
  & .MuiTypography-root {
    font-size: 14px;
  }
`;
