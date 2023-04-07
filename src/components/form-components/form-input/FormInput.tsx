import { IconButton, InputAdornment } from "@mui/material";
import React from "react";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
// import IconComponent, { IIconProps } from "../../icon-component/IconComponent";
import { StyledReadOnlyTextBox, StyledTextField } from "./FormInputStyled";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
export interface IFormInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  dataModel?: any;
  dataModelKey?: string;
  value?: string | any;
  error?: boolean;
  required?: boolean;
  formField?: ControllerRenderProps<any, any>;
  formFieldState?: ControllerFieldState;
  hintMessage?: string;
  size?: "default" | "small";
  type?: "text" | "number" | "password" | "email";
  suffixIcon?: JSX.Element;
  prefixIcon?: JSX.Element;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isFullWidth?: boolean;
  defaultWidth?: string | null;
  isTextArea?: boolean;
  maxRowSize?: number;
  minRowSize?: number;
  currentRowSize?: number;
  maxLength?: number;
  onValueChange?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: any;
  sx?: any;
  InputProps?: any;
  className?: string;
  isMasked?: boolean;
}

function FormInput(props: IFormInputProps) {
  // variables

  // states
  let [isPasswordToggled, setIsPasswordToggled] =
    React.useState<boolean>(false);

  // Events
  const handlePasswordToggleChange = (state: any) => {
    if (isPasswordToggled) {
      setIsPasswordToggled(false);
      isPasswordToggled = false;
    } else {
      setIsPasswordToggled(true);
      isPasswordToggled = true;
    }
  };

  const inputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Disabled Input Validation
    if (!props.isDisabled && !props.isReadOnly) {
      if (typeof event.target.value == "string") {
        event.target.value = event.target.value.trimStart();
      }
      props.onValueChange ? props.onValueChange(event.target.value) : void 0;
      props.onChange ? props.onChange(event) : void 0;
      props.formField ? props.formField.onChange(event) : void 0;
    }
  };

  const inputBlur = () => {
    props.formField ? props.formField?.onBlur() : void 0;
  };

  const generateHelperText = () => {
    let defaultMessage: string | undefined = "";
    if (props.error || props.formFieldState?.error) {
      if (
        !props.formFieldState?.error?.message &&
        props.formFieldState?.error?.type == "required"
      ) {
        defaultMessage = `${props.label || props.placeholder} is Required`;
      } else {
        defaultMessage = props.formFieldState?.error?.message;
      }
    }
    if (!defaultMessage && props.hintMessage)
      defaultMessage = props.hintMessage;
    return defaultMessage;
  };

  return !props.isReadOnly ? (
    <StyledTextField
      className={props.className}
      id={props.id}
      label={props.label}
      placeholder={props.placeholder}
      error={props.error || !!props.formFieldState?.error}
      required={props.required}
      helperText={generateHelperText()}
      type={props.type == "password" && isPasswordToggled ? "text" : props.type}
      size={props.size == "small" ? "small" : undefined}
      value={props.formField?.value ? props.formField.value : props.value}
      disabled={props.isDisabled || props.isReadOnly}
      defaultWidth={props.isFullWidth ? "" : props.defaultWidth}
      multiline={props.isTextArea}
      maxRows={
        props.isTextArea && !props.currentRowSize ? props.maxRowSize : undefined
      }
      minRows={props.isTextArea ? props.minRowSize : undefined}
      rows={props.isTextArea ? props.currentRowSize : 1}
      inputProps={{
        maxLength: props.maxLength,
      }}
      InputProps={
        props.InputProps
          ? props.InputProps
          : {
              endAdornment:
                props.type == "password" || props.suffixIcon ? (
                  <InputAdornment position="end">
                    {props.type == "password" ? (
                      <IconButton onClick={handlePasswordToggleChange}>
                        {!isPasswordToggled ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ) : props.suffixIcon ? (
                      props.suffixIcon
                    ) : null}
                  </InputAdornment>
                ) : null,
              startAdornment: props.prefixIcon ? (
                <InputAdornment position="start">
                  {props.prefixIcon}
                  {/* <IconComponent iconSize={props.size} {...props.prefixIcon} /> */}
                </InputAdornment>
              ) : null,
            }
      }
      fullWidth={props.isFullWidth}
      onBlur={inputBlur}
      onChange={inputValueChange}
    />
  ) : (
    // Readonly Text Box //
    <StyledReadOnlyTextBox
      className={props.className + " readonly-textbox"}
      label={props.label}
      isMasked={props.isMasked}
      type={props.type}
      // value={
      //   props.dataModelKey
      //     ? props.dataModel[props.dataModelKey]
      //     : props.value
      //     ? props.value
      //     : "-"
      // }
      value={
        props.formField?.value
          ? props.formField.value
          : props.value
          ? props.value
          : "-"
      }
    />
  );
}

FormInput.defaultProps = {
  value: "",
  defaultWidth: "250px",
  size: "default",
  maxRowSize: 4,
};

export default FormInput;
