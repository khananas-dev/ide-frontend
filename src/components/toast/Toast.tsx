import styled from "@emotion/styled";
import { toast, ToastContainer } from "react-toastify";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ToastMsgComponent from "./ToastMsgComponent";

export const StyledToastContainer = styled(ToastContainer)`
  min-width: 350px;
  width: max-content;
  .Toastify__toast {
    border-radius: 5px;
    box-shadow: none;
    border: 1px solid #000;
    padding: 0px;
    height: 40px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    min-height: unset;
    .Toastify__close-button--light {
      opacity: 1;
    }
    &--success {
      background: #ddf0ea;
      border-color: #00823b;
      color: #20774c;
      .Toastify__close-button--light {
        color: #20774c;
        opacity: 1;
      }
    }
    &--info {
      background: #ddedfb;
      border-color: #0358a6;
      color: #0358a6;
      .Toastify__close-button--light {
        color: #0358a6;
        opacity: 1;
      }
    }
    &--warning {
      background: #fff5da;
      border-color: #905f00;
      color: #905f00;
      .Toastify__close-button--light {
        color: #905f00;
        opacity: 1;
      }
    }
    &--error {
      background: #fbe2e1;
      border-color: #ce0019;
      color: #ce0019;
      .Toastify__close-button--light {
        color: #ce0019;
        opacity: 1;
      }
    }

    &-body {
      padding: 0px;
      margin: 0px;
    }
    & .toast-msg {
      margin: 0px 10px 0px 0px;
      font-size: 14px;
      .toast-title {
        font-weight: 500;
        display: inline-block;
        margin: 0px;
      }
    }
    & .Toastify__close-button {
      align-self: unset;
    }
  }
`;

export const SuccessToast = (msg: string) => {
  toast.success(<ToastMsgComponent title="Success" msg={msg} />, {
    icon: <CheckCircleOutlineIcon />,
    toastId: msg,
  });
};
export const InfoToast = (msg: string) => {
  toast.info(<ToastMsgComponent title="Information" msg={msg} />, {
    icon: <InfoOutlinedIcon />,
    toastId: msg,
  });
};
export const WarningToast = (msg: string) => {
  toast.warn(<ToastMsgComponent title="Warning" msg={msg} />, {
    icon: <InfoOutlinedIcon />,
    toastId: msg,
  });
};
export const ErrorToast = (msg: string) => {
  toast.error(<ToastMsgComponent title="Error" msg={msg} />, {
    icon: <ErrorOutlineIcon />,
    toastId: msg,
  });
};
