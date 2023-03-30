import { Modal, Box, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import ButtonElement from "../../button/ButtonElement";
import { ModalComponentService, ModalProps } from "../services/ModalService";
import { ModalComponentContent } from "./ModalComponentStyled";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

function ModalComponent() {
  // States
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<ModalProps | any>({});
  // Functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headerTitle = useMemo(() => {
    switch (modal.type) {
      case "success":
        return "Success";
      case "info":
        return "Information";
      case "warning":
        return "Warning";
      case "error":
        return "Error";

      default:
        break;
    }
  }, [modal.type]);
  const iconRenderer = () => {
    switch (modal.type) {
      case "success":
        return <CheckCircleOutlineOutlinedIcon />;
      case "info":
        return <InfoOutlinedIcon />;
      case "warning":
        return <ErrorOutlineOutlinedIcon />;
      case "error":
        return <ErrorOutlineOutlinedIcon />;

      default:
        return <InfoOutlinedIcon />;
    }
  };
  //   Effects
  useEffect(() => {
    ModalComponentService.on("open", (props: any) => {
      setModal(props);
      handleOpen();
    });
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalComponentContent className={modal.type}>
        <div className={`modal-header modal-header-${modal.type}`}>
          <div className="modal-icon">{iconRenderer()}</div>
          <h4 className="modal-title">{headerTitle}</h4>
        </div>
        <div className="modal-body">
          <h5 className="title">{modal?.title}</h5>
          <p>{modal?.message}</p>
        </div>
        <div className="modal-footer">
          <ButtonElement
            buttonType="normal"
            label={modal?.secondaryBtn?.label || "No"}
            role="secondary"
            onClick={() => {
              if (modal?.secondaryBtn?.onClick) {
                modal?.secondaryBtn?.onClick("no");
              }
              handleClose();
            }}
            className="mr10"
          />
          <ButtonElement
            buttonType="normal"
            label={modal?.primaryBtn?.label || "Yes"}
            role="primary"
            onClick={() => {
              if (modal?.primaryBtn?.onClick) {
                modal?.primaryBtn?.onClick("yes");
              }
              handleClose();
            }}
          />
        </div>
      </ModalComponentContent>
    </Modal>
  );
}

export default ModalComponent;
