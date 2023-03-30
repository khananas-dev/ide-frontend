import { styled, Typography } from "@mui/material";
import { DefaultColors } from "../../common/constants/colors";

export const TitleComponentStyled = styled(Typography)`
  margin: 0px 0px 10px 0px;
  font-size: 24px;
  color: ${({ theme }) => DefaultColors.typoDefaultFn(theme.palette.mode)};
  font-weight: 500;
`;
