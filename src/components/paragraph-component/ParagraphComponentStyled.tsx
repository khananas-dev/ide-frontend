import { styled, Typography } from "@mui/material";
import { DefaultColors } from "../../common/constants/colors";

export const ParagraphComponentStyled = styled(Typography)`
  margin: 0px 0px 10px 0px;
  /* color: ${({ theme }) => DefaultColors.typoLightFn(theme.palette.mode)}; */
  color: #333333;
  font-size: 14px;
`;
