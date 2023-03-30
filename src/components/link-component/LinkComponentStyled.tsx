import styled from "@emotion/styled";
import { SxProps } from "@mui/material";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { DefaultColors } from "../../common/constants/colors";

export interface LinkComponentProps {
  to?: string;
  target?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: any;
  style?: CSSProperties;
}
export const LinkComponentStyled = styled((props: LinkComponentProps) => (
  <a
    href={props.to}
    onClick={props.onClick}
    target={props?.target}
    style={props?.style}
    className={`cursor-pointer ${props.className}`}
  >
    {props.children}
  </a>
))`
  text-decoration: none;
  font-size: 14px;
  color: ${DefaultColors.link};
  line-height: normal;
  &:hover {
    color: ${DefaultColors.linkHover};
  }
`;
