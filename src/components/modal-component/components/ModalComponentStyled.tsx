import { Box, styled } from "@mui/material";
import { DefaultColors } from "../../../common/constants/colors";

export const ModalComponentContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 250px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;

  box-sizing: border-box;
  &:focus-visible {
    outline: none;
  }
  &.success {
    border: 2px solid ${({ theme }) => theme.palette.success.main};
  }

  &.info {
    border: 2px solid ${({ theme }) => theme.palette.info.main};
  }
  &.warning {
    border: 2px solid #f5a400;
  }
  &.error {
    border: 2px solid ${({ theme }) => theme.palette.error.main};
  }
  .modal-header {
    display: flex;
    align-items: center;
    /* margin-bottom: 10px; */
    height: 50px;
    &-success {
      color: ${({ theme }) => theme.palette.success.main};
      .modal-icon {
        svg {
          path {
            fill: ${({ theme }) => theme.palette.success.main};
          }
        }
      }
    }
    &-info {
      color: ${({ theme }) => theme.palette.info.main};
      .modal-icon {
        svg {
          path {
            fill: ${({ theme }) => theme.palette.info.main};
          }
        }
      }
    }
    &-warning {
      color: #c28000;
      .modal-icon {
        svg {
          path {
            fill: #c28000;
          }
        }
      }
    }
    &-error {
      color: ${({ theme }) => theme.palette.error.main};
      .modal-icon {
        svg {
          path {
            fill: ${({ theme }) => theme.palette.error.main};
          }
        }
      }
    }
    .modal-icon {
      display: flex;
      align-items: center;
      & > .MuiBox-root,
      svg {
        height: 40px;
        width: 40px;
      }
    }
    .modal-title {
      margin: 0px 0px 0px 15px;
      font-size: 18px;
      font-weight: 500;
      line-height: normal;
    }
  }
  .modal-footer {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .modal-body {
    padding: 10px 0px;
    .title {
      margin: 0px 0px 5px 0px;
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => DefaultColors.typoDefaultFn(theme.palette.mode)};
    }
    p {
      font-size: 14px;
      color: ${({ theme }) => DefaultColors.typoDefaultFn(theme.palette.mode)};
      margin: 0px;
    }
  }
`;
