import React from "react";
import { StyledCheckBox, StyledFormControlLabel } from "./InputCheckBoxStyled";

interface InputCheckBoxProps {
  id?: string;
  name?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  checked?: any;
  onChange?: any;
  inputProps?: any;
  label?: string;
  indeterminate?: boolean;
  value?: string;
  dataModel?: any;
  dataModelKey?: string;
  labelClassName?: string;
}
function InputCheckBox(props: InputCheckBoxProps) {
  return (
    <>
      <StyledFormControlLabel
        className={props.labelClassName}
        control={
          <StyledCheckBox
            id={props.id}
            name={props.name}
            defaultChecked={props.defaultChecked}
            checked={props.checked}
            disabled={props.disabled}
            onChange={props.onChange}
            inputProps={props.inputProps}
            indeterminate={props.indeterminate}
            value={
              props.dataModelKey
                ? props.dataModel[props.dataModelKey]
                : props.value
            }
          />
        }
        label={props.label}
      />
    </>
  );
}

export default InputCheckBox;
