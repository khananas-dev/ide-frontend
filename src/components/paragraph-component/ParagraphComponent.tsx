import { SxProps } from "@mui/material";
import React from "react";
import { ParagraphComponentStyled } from "./ParagraphComponentStyled";

interface ParagraphComponentProps {
  className?: string;
  children: React.ReactNode;
  sx?: SxProps;
}
function ParagraphComponent(props: ParagraphComponentProps) {
  return (
    <>
      <ParagraphComponentStyled
        sx={props.sx}
        className={props.className}
        variant="body1"
      >
        {props.children}
      </ParagraphComponentStyled>
    </>
  );
}

export default ParagraphComponent;
