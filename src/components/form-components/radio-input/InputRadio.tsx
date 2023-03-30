import React from "react";
import { StyledFormControlLabel, StyledInputRadio } from "./inputRadioStyled";

interface InputRadioProps {
  label: string | any;
  value: string | number | any;
  disabled?: boolean;
  name?: string;
  onChange?: any;
  checked?: any;
  dataModel?: any;
  dataModelKey?: string;
}
function InputRadio(props: InputRadioProps) {
  return (
    <>
      <StyledFormControlLabel
        value={
          props.dataModelKey ? props.dataModel[props.dataModelKey] : props.value
        }
        control={
          <StyledInputRadio
            onChange={props.onChange}
            name={props.name}
            checked={props.checked}
          />
        }
        label={props.label}
        disabled={props.disabled}
      />
    </>
  );
}

export default InputRadio;
