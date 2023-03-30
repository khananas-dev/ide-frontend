import React from "react";
import { StyledFormControlLabel, StyledSwitch } from "./ToggleButtonStyled";

interface ToggleButtonProps {
  label?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange: any;
  name?: string;
  disabled?: boolean;
}
function ToggleButton(props: ToggleButtonProps) {
  return (
    <>
      <StyledFormControlLabel
        disabled={props.disabled}
        control={
          <StyledSwitch
            defaultChecked={props.defaultChecked}
            checked={props.checked}
            onChange={props.onChange}
            name={props.name}
          />
        }
        label={props.label ? props.label : null}
      />
    </>
  );
}

export default ToggleButton;
