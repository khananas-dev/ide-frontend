import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { StyledButton, StyledButtonGroup } from "./ButtonElementStyled";
import Spinner from "../spinner/spinner";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

interface CommonProps {
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  className?: string;
  customColor?: string;
  form?: string;
  isTabletView?: boolean;
}
type ConditionalProps =
  | {
      role: "primary" | "secondary";
      label: string;
      buttonType: "normal";
      onClick?: any;
    }
  | {
      role: "tertiary";
      icon?: JSX.Element;
      label: string;
      buttonType: "normal";
      onClick?: any;
    }
  | {
      buttonType: "with-icon";
      role?: "primary" | "secondary";
      label: string;
      icon: JSX.Element;
      onClick?: any;
    }
  // | {
  //     buttonType: "only-icon";
  //     role?: never;
  //     icon: JSX.Element;
  //     label: string;
  //     onClick: any;
  //   }
  | {
      buttonType: "split-button";
      role?: never;
      label: string;
      onClick?: any;
      children: JSX.Element;
    };

type ButtonElementProps = CommonProps & ConditionalProps;

function ButtonElement(props: ButtonElementProps) {
  // Variable
  const matches = useMediaQuery("(max-width:1200px)");
  // States
  const [open, setOpen] = React.useState(false);
  // UseRef
  const anchorRef = React.useRef<any>(null);

  return (
    <>
      {/* Normal Button */}
      {props.buttonType === "normal" ? (
        props.role !== "tertiary" ? (
          <StyledButton
            disableRipple
            disableElevation
            customColor={props.customColor}
            type={props.type}
            size={props.size}
            disabled={props.disabled}
            color={"primary"}
            variant={
              props.role === "primary" && !props.loading
                ? "contained"
                : "outlined"
            }
            onClick={props.onClick}
            className={
              props.loading
                ? `btn-loadng ${props.className}`
                : `${props.className}`
            }
            form={props.form}
          >
            {props.loading ? <Spinner /> : null}
            {props.loading ? "LOADING..." : props.label}
          </StyledButton>
        ) : (
          <StyledButton
            disableRipple
            customColor={props.customColor}
            type={props.type}
            size={props.size}
            disabled={props.disabled}
            variant="outlined"
            startIcon={!props.loading ? props.icon : null}
            className={
              props.loading
                ? `btn-loadng tertiary-btn ${props.className}`
                : `tertiary-btn ${props.className}`
            }
            onClick={props.onClick}
            form={props.form}
          >
            {props.isTabletView ? (
              <>
                {!matches ? (
                  <>
                    {props.loading ? <Spinner /> : null}
                    {props.loading ? "LOADING..." : props.label}
                  </>
                ) : null}
              </>
            ) : (
              <>
                {props.loading ? <Spinner /> : null}
                {props.loading ? "LOADING..." : props.label}
              </>
            )}
          </StyledButton>
        )
      ) : props.buttonType === "with-icon" ? (
        // Button With Icon
        <StyledButton
          disableRipple
          disableElevation
          customColor={props.customColor}
          type={props.type}
          size={props.size}
          disabled={props.disabled}
          variant={
            props.role === "primary" && !props.loading
              ? "contained"
              : "outlined"
          }
          startIcon={!props.loading ? props.icon : null}
          onClick={props.onClick}
          className={
            props.loading
              ? `btn-loadng ${props.className}`
              : `${props.className}`
          }
          form={props.form}
        >
          {/* {props.isTabletView ? (
            <>
              {matches ? (
                <>
                  {props.loading ? <Spinner /> : null}
                  {props.loading ? "LOADING..." : props.label}
                </>
              ) : null}
            </>
          ) : null} */}
          {props.loading ? <Spinner /> : null}
          {props.loading ? "LOADING..." : props.label}
        </StyledButton>
      ) : (
        // Only Icon Button
        //  props.buttonType === "only-icon" ? (
        //   <IconButton aria-label={props.label} onClick={props.onClick}>
        //     {props.icon}
        //   </IconButton>
        // ) :
        <>
          {/* Split Button */}
          <StyledButtonGroup
            // customColor={props.customColor}
            disableRipple
            disableElevation
            size={props.size}
            variant={!props.loading ? "contained" : "outlined"}
            ref={anchorRef}
            aria-label={props.label}
            disabled={props.disabled}
            className={
              props.loading
                ? `btn-loadng ${props.className}`
                : `${props.className}`
            }
          >
            <Button type={props.type} onClick={props.onClick}>
              {props.loading ? <Spinner /> : null}
              {props.loading ? "LOADING..." : props.label}
            </Button>
            <Button
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="menu"
              onClick={() => {
                setOpen((prevOpen) => !prevOpen);
              }}
            >
              <ArrowDropDownOutlinedIcon />
            </Button>
          </StyledButtonGroup>
          <Popper
            sx={{
              zIndex: 1,
              width: anchorRef?.current?.offsetWidth,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }: any) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener
                    onClickAway={(event: any) => {
                      setOpen(false);
                    }}
                  >
                    {props.children}
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      )}
    </>
  );
}

ButtonElement.defaultProps = {
  size: "medium",
};
export default ButtonElement;
