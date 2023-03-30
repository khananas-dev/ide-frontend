import { SxProps } from "@mui/material";
import { TitleComponentStyled } from "./TitleComponentStyled";

interface TitleComponentProps {
  className?: string;
  children: React.ReactNode | any;
  sx?: SxProps;
}

function TitleComponent(props: TitleComponentProps) {
  return (
    <>
      <TitleComponentStyled
        sx={props?.sx}
        className={props.className}
        variant="h2"
      >
        {props.children}
      </TitleComponentStyled>
    </>
  );
}

export default TitleComponent;
