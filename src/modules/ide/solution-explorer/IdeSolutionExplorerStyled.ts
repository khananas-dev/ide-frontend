import { TreeView } from "@mui/lab";
import { styled } from "@mui/material";

export const StyledTreeViewPanel = styled(TreeView)`
  height: 100%;
  width: 100%;
  max-width: auto;
  overflow-x: hidden;
  overflow-y: auto;
  .Mui-selected,
  .Mui-focused {
    background-color: transparent !important;
    &:hover {
      background-color: rgba(0, 0, 0, 0.04) !important;
    }
  }
`;
