import React from "react";
import { LinkComponentProps, LinkComponentStyled } from "./LinkComponentStyled";

function LinkComponent(props: LinkComponentProps) {
  return (
    <>
      <LinkComponentStyled {...props} />
    </>
  );
}

export default LinkComponent;
