import * as React from "react";
import { KeyFilter } from "../keyfilter/KeyFilter";
import { Tooltip } from "../tooltip/Tooltip";
import { classNames, DomHandler, ObjectUtils } from "../utils/Utils";
import TextField from "@mui/material/TextField";
import { StyledDatePickerField } from "../../../form-components/date-picker/DatePickerElementStyled";
import { InputAdornment } from "@mui/material";
import IconComponent, {
  IIconProps,
} from "../../../icon-component/IconComponent";

import FormInput from "../../../form-components/form-input/FormInput";
import { StyledReadOnlyTextBox } from "../../../form-components/form-input/FormInputStyled";
import {Box} from '@mui/material'

export const InputText = React.memo(
  React.forwardRef((props, ref) => {
    const elementRef = React.useRef(ref);

    const onKeyPress = (event) => {
      props.onKeyPress && props.onKeyPress(event);

      if (props.keyfilter) {
        KeyFilter.onKeyPress(event, props.keyfilter, props.validateOnly);
      }
    };

    const onInput = (event) => {
      let validatePattern = true;
      if (props.keyfilter && props.validateOnly) {
        validatePattern = KeyFilter.validate(event, props.keyfilter);
      }

      props.onInput && props.onInput(event, validatePattern);

      if (!props.onChange) {
        const target = event.target;
        ObjectUtils.isNotEmpty(target.value)
          ? DomHandler.addClass(target, "p-filled")
          : DomHandler.removeClass(target, "p-filled");
      }
    };

    const onPaste = (event) => {
      props.onPaste && props.onPaste(event);

      if (props.keyfilter) {
        KeyFilter.onPaste(event, props.keyfilter, props.validateOnly);
      }
    };

    const currentValue = elementRef.current && elementRef.current.value;
    const isFilled = React.useMemo(
      () =>
        ObjectUtils.isNotEmpty(props.value) ||
        ObjectUtils.isNotEmpty(props.defaultValue) ||
        ObjectUtils.isNotEmpty(currentValue),
      [props.value, props.defaultValue, currentValue]
    );

    React.useEffect(() => {
      ObjectUtils.combinedRefs(elementRef, ref);
    }, [elementRef, ref]);

    const hasTooltip = ObjectUtils.isNotEmpty(props.tooltip);
    const otherProps = ObjectUtils.findDiffKeys(props, InputText.defaultProps);
    const className = classNames(
      "p-inputtext p-component",
      {
        "p-disabled": props.disabled,
        "p-filled": isFilled,
      },
      props.className
    );

    return (
      <>
        {/* <input
          ref={elementRef}
          {...otherProps}
          className={className}
          onInput={onInput}
          onKeyPress={onKeyPress}
          onPaste={onPaste}
        /> */}
        <Box display={"block"} width="100%" ref={elementRef}>
          {!props.isReadOnly ? (
            <StyledDatePickerField
              // fullWidth={props.isFullWidth}
              fullWidth
              helperText={props.helperText}
              className={props.inputClassName}
              error={props.error}
              sx={props.sx}
              value={props.value}
              {...otherProps}
              onInput={onInput}
              onKeyPress={onKeyPress}
              onPaste={onPaste}
              variant="filled"
              size={props.size}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconComponent
                      iconName={"calendar"}
                      onClick={props.onFocus}
                      iconState="button"
                      iconSize={props.size}
                    />
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <StyledReadOnlyTextBox
              className={props.className + " readonly-textbox"}
              label={props.label}
              value={
                props.formField?.value
                  ? props.formField.value
                  : props.value
                  ? props.value
                  : "-"
              }
            />
          )}
        </Box>

        {hasTooltip && (
          <Tooltip
            target={elementRef}
            content={props.tooltip}
            {...props.tooltipOptions}
          />
        )}
      </>
    );
  })
);

InputText.displayName = "InputText";
InputText.defaultProps = {
  __TYPE: "InputText",
  keyfilter: null,
  validateOnly: false,
  tooltip: null,
  tooltipOptions: null,
  onInput: null,
  onKeyPress: null,
  onPaste: null,
  error: false,
  size: "default",
  isReadOnly: false,
  isFullWidth: false,
};
