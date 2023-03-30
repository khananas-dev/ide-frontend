import { Avatar } from "@mui/material";
import React from "react";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export interface IAvatorComponentProps {
  name: string;
  image?: string;
  onClick?: any;
}

function AvatarComponent(props: IAvatorComponentProps) {
  return (
    <>
      {props.image ? (
        <Avatar src={props.image} />
      ) : (
        <Avatar {...stringAvatar(props.name)} title={props?.name} />
      )}
    </>
  );
}

export default AvatarComponent;