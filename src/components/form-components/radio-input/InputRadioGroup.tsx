import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  SxProps,
} from "@mui/material";
import React from "react";
import { ControllerRenderProps, ControllerFieldState } from "react-hook-form";
import { StyledRadioGroup } from "./inputRadioStyled";

interface InputRadioGroupProps {
  value?: string | any;
  onChange?: any;
  children: React.ReactNode;
  id: string;
  name: string;
  label?: string | any;
  formField?: ControllerRenderProps<any, any>;
  formFieldState?: ControllerFieldState;
  onValueChange?: any;
  sx?: SxProps;
}
function InputRadioGroup(props: InputRadioGroupProps) {
  const inputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Disabled Input Validation
    console.log(event.target.value);
    props.onValueChange ? props.onValueChange(event.target.value) : void 0;
    props.onChange ? props.onChange(event) : void 0;
    props.formField ? props.formField.onChange(event) : void 0;
  };
  return (
    <FormControl>
      <StyledRadioGroup
        aria-labelledby={props.id}
        name={props.name}
        value={props.formField?.value ? props.formField.value : props.value}
        onChange={inputValueChange}
        sx={props?.sx}
      >
        <div className="radio-group">
          {props.label && (
            <label className="radio-group-label">{props.label}</label>
          )}
          {props.children}
        </div>
      </StyledRadioGroup>
    </FormControl>
  );
}

export default InputRadioGroup;
