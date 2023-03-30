import {
  AppBar,
  Drawer,
  List,
  ListItemButton,
  ListItemButtonProps,
  styled,
} from "@mui/material";
import React from "react";
import { DefaultColors } from "../../constants/colors";

export const NavHeaderStyled = styled(AppBar)`
  &.MuiAppBar-root {
    background-color: ${(props) =>
      DefaultColors.backgroundColorFn(props.theme.palette.mode)};
    color: ${(props) => DefaultColors.typoDefaultFn(props.theme.palette.mode)};
    background-image: none;
    box-shadow: 0px 3px 5px rgb(0 0 0 / 5%);
    border-bottom: 1px solid ${DefaultColors.divider};
    /* z-index: ${(props) => props.theme.zIndex.drawer + 1}; */
    .MuiToolbar-root {
      padding-left: 12px;
      height: 65px;
    }
  }
`;

export const NavContainerStyled = styled(
  (props: {
    isNavOpen: boolean;
    children: React.ReactElement;
    className?: string;
    isFullView?: boolean;
  }) => <div className={props.className}>{props.children}</div>
)((props) => ({
  "&.nav-container": {
    backgroundColor: DefaultColors.appBackgroundColorFn(
      props.theme.palette.mode
    ),
    color: DefaultColors.typoDefaultFn(props.theme.palette.mode),
    height: "calc(100% - 66px)",
    position: "relative",
    width: props.isFullView ? "100%" : "calc(100% - 64px)",
    left: props.isFullView ? "0" : "64px",
    "&.pinned": {
      width: props.isFullView ? "100%" : "calc(100% - 300px)",
      left: props.isFullView ? "0" : "300px",
    },
  },
}));

export const NavDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background-image: none;
    background-color: ${(props) => props.theme.palette.primary.main};
    width: ${(props) => (props.open ? "300px" : "64px")};
    top: 66px;
    height: calc(100% - 66px);
    overflow: hidden;
    transition: ${(props) =>
      props.theme.transitions.create(["margin", "width"], {
        easing: props.theme.transitions.easing.sharp,
        duration: props.theme.transitions.duration.leavingScreen,
      })};
  }
`;

export const NavListBox = styled(List)``;

export const NavListItem = styled(
  (props: ListItemButtonProps & { open: boolean }) => (
    <ListItemButton {...props}>{props.children}</ListItemButton>
  )
)((props) => ({
  "&.MuiListItemButton-root": {
    paddingLeft: "20px",
    height: "46px",
    "&.Mui-selected": {
      backgroundColor: props.theme.palette.primary.dark,
    },
    ".MuiListItemText-root": {
      width: props.open ? "auto" : "0",
      marginLeft: !props.open ? "100px" : "0",
      transition: props.theme.transitions.create(["margin", "width"], {
        easing: props.theme.transitions.easing.sharp,
        duration: props.theme.transitions.duration.leavingScreen,
      }),
      "*": {
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    ".MuiListItemIcon-root": {
      minWidth: "40px",
    },
    "*": {
      color: props.theme.palette.primary.contrastText,
    },
  },
}));

export const NavNestedListItem = styled((props: ListItemButtonProps) => (
  <ListItemButton {...props}>{props.children}</ListItemButton>
))((props) => ({
  "&.MuiListItemButton-root": {
    paddingLeft: "60px",
    height: "30px",
    "&:hover": {
      backgroundColor: props.theme.palette.primary.dark,
    },
    "&:active": {
      backgroundColor: props.theme.palette.primary.dark,
    },
    "&.Mui-selected": {
      backgroundColor: props.theme.palette.primary.dark,
      filter: "brightness(1.1)",
    },
    ".MuiListItemText-root": {
      "*": {
        fontSize: "14px",
      },
    },
    ".MuiListItemIcon-root": {
      minWidth: "40px",
    },
    "*": {
      color: props.theme.palette.primary.contrastText,
    },
  },
}));
