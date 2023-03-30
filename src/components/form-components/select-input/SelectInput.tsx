import React, { useState, useMemo, forwardRef, useEffect } from "react";
import {
  InputLabel,
  Select,
  ListSubheader,
  SelectChangeEvent,
  SxProps,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import {
  SimpleStyledFormControl,
  StyledFormControl,
  StyledFormHelperText,
  StyledMenuItem,
} from "./SelectInputStyled";
import FormInput from "../form-input/FormInput";
import InputCheckBox from "../input-checkbox/InputCheckBox";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import { StyledReadOnlyTextBox } from "../form-input/FormInputStyled";
import { Height } from "@mui/icons-material";

interface CommonProps {
  id: string;
  MenuProps?: any;
  dataModel?: any;
  dataModelKey?: string;
  label?: string;
  labelId?: string;
  onChange?: any;
  onValueChange?: any;
  returnKey?: string;
  dataKey?: string;
  options: any[];
  minWidth?: any;
  isDisabled?: boolean;
  error?: boolean;
  isReadOnly?: boolean;
  required?: boolean;
  errorText?: string;
  isSearchable?: boolean;
  isIconDropDown?: boolean;
  formField?: ControllerRenderProps<any, any>;
  formFieldState?: ControllerFieldState;
  placeholder?: string;
  hintMessage?: string;
  isFullWidth?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  sx?: SxProps;
  formControlClassName?: string;
}

type ConditionalProps =
  | {
      value?: any;
      type?: "single";
    }
  | {
      value?: any[];
      type?: "multiple";
    };

type SelectInputProps = CommonProps & ConditionalProps;

const containsText = (text: string, searchText: string) => {
  return (
    JSON.stringify(text)?.toLowerCase().indexOf(searchText.toLowerCase()) > -1
  );
};

const SelectInput = forwardRef((props: SelectInputProps, ref) => {
  return SelectInputElement(props, ref);
});

function SelectInputElement(
  props: SelectInputProps,
  ref: React.ForwardedRef<any>
) {
  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () =>
      props?.options?.filter((option: any) => containsText(option, searchText)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchText, props?.options]
  );

  const selectValueChange = (event: SelectChangeEvent<any>) => {
    // Disabled Select Validation
    if (!props.isDisabled && !props.isReadOnly) {
      props.onValueChange ? props.onValueChange(event.target.value) : void 0;
      props.onChange ? props.onChange(event) : void 0;
      props.formField ? props.formField.onChange(event) : void 0;
    }
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

  const readOnlyValue = () => {
    if (props.formField?.value || props.value) {
      return props.options
        .filter((item) =>
          item[props.returnKey || "id"] === props.formField?.value
            ? props.formField?.value
            : props.value
        )
        .map((item) => item[props.dataKey || "label"])
        .toString();
    } else {
      return "-";
    }
  };

  return (
    <>
      {!props.isReadOnly ? (
        <>
          {/* With Label DropDown*/}
          {props.label ? (
            <StyledFormControl
              ref={ref}
              required={props.required}
              sx={{ marginTop: "8px", minWidth: props.minWidth }}
              variant="filled"
              disabled={props.isDisabled}
              error={props.error || !!props.formFieldState?.error}
              fullWidth={props.isFullWidth}
              className={props?.formControlClassName}
            >
              <InputLabel id={props.labelId}>{props.label}</InputLabel>
              <Select
                labelId={props.labelId}
                id={props.id}
                value={
                  props.formField
                    ? props.formField.value
                      ? props.formField.value
                      : []
                    : props.value
                }
                label={props.label}
                onChange={selectValueChange}
                onFocus={props?.onFocus}
                onBlur={props.formField?.onBlur}
                // MenuProps={props.MenuProps}
                MenuProps={{
                  sx: {
                    "& .MuiList-root": {
                      padding: "0px",
                      maxHeight: "200px",
                      "& MuiListSubheader-root": {
                        lineHeight: "normal",
                      },
                    },
                  },
                }}
                multiple={props.type === "multiple" ? true : false}
                inputProps={{ readOnly: props.isReadOnly }}
                onClose={() => setSearchText("")}
                renderValue={(e) => {
                  if (props.type === "multiple") {
                    return props?.options
                      ?.filter((item: any) =>
                        e.includes(item[props.returnKey || "id"])
                      )
                      .map((item: any) => item[props.dataKey || "label"])
                      .join(", ");
                  } else {
                    return props?.options
                      ?.filter(
                        (item: any) => item[props.returnKey || "id"] === e
                      )
                      .map((item: any) => item[props.dataKey || "label"]);
                  }
                }}
              >
                {props.isSearchable ? (
                  <ListSubheader>
                    <FormInput
                      size="small"
                      // Autofocus on textfield
                      // autoFocus
                      sx={{ marginTop: "0px!important", padding: "16px 0px" }}
                      id="input-search"
                      placeholder="Type to search..."
                      isFullWidth
                      // prefixIcon={{ iconName: "search2" }}
                      onChange={(e: any) => {
                        setSearchText(e.target.value);
                      }}
                      onKeyDown={(e: any) => {
                        if (e.key !== "Escape") {
                          // Prevents autoselecting item while typing (default Select behaviour)
                          e.stopPropagation();
                        }
                      }}
                    ></FormInput>
                  </ListSubheader>
                ) : null}
                {props.type === "multiple"
                  ? displayedOptions?.map((item: any, index: number) => (
                      <StyledMenuItem
                        key={`menu-item-${item[props.returnKey || "id"]}`}
                        value={item[props.returnKey || "id"]}
                      >
                        <InputCheckBox
                          checked={
                            (props.formField?.value
                              ? props.formField.value
                              : props.value
                            ).indexOf(item[props.returnKey || "id"]) > -1
                          }
                        />
                        {item[props.dataKey || "label"]}
                      </StyledMenuItem>
                    ))
                  : displayedOptions?.map((item: any, index: number) => (
                      <StyledMenuItem
                        key={`menu-item-${item[props.returnKey || "id"]}`}
                        value={item[props.returnKey || "id"]}
                      >
                        {item[props.dataKey || "label"]}
                      </StyledMenuItem>
                    ))}
              </Select>

              <StyledFormHelperText>
                {generateHelperText()}
              </StyledFormHelperText>
            </StyledFormControl>
          ) : props?.isIconDropDown ? (
            // Without Label Icon Dropdown
            <SimpleStyledFormControl
              className={props?.formControlClassName}
              fullWidth={props?.isFullWidth}
              error={props.error || !!props.formFieldState?.error}
            >
              <Select
                // sx={{ minWidth: props.minWidth }}

                displayEmpty
                variant="filled"
                value={
                  props.formField
                    ? props.formField.value
                      ? props.formField.value
                      : []
                    : props.value
                }
                onChange={selectValueChange}
                onFocus={props?.onFocus}
                onBlur={props.formField?.onBlur}
                disabled={props.isDisabled}
                sx={{
                  "& .MuiSelect-select.MuiFilledInput-input": {
                    paddingBottom: "0 !important",
                    height: "30px !important",
                    paddingTop: "0 !important",
                  },
                }}
                MenuProps={{
                  sx: {
                    "& .MuiPaper-root": {
                      minWidth: "0 !important",
                      maxHeight: "210px",
                    },
                    "& .MuiButtonBase-root": {
                      paddingLeft: "13px !important",
                    },
                    "& .MuiList-root": {
                      padding: 0,
                    },
                  },
                }}
                inputProps={{
                  "aria-label": "Without label",
                }}
              >
                {props.options.map((item) => (
                  <StyledMenuItem
                    key={`menu-item-${item[props.returnKey || "id"]}`}
                    value={item[props.returnKey || "id"]}
                  >
                    {/* <IconComponent iconName={item[props.dataKey || "label"]} /> */}
                  </StyledMenuItem>
                ))}
              </Select>
              <StyledFormHelperText>
                {generateHelperText()}
              </StyledFormHelperText>
            </SimpleStyledFormControl>
          ) : (
            // Without Label Simple DropDown
            <SimpleStyledFormControl
              fullWidth={props.isFullWidth}
              sx={props?.sx}
              className={props?.formControlClassName}
              error={props.error || !!props.formFieldState?.error}
            >
              <Select
                displayEmpty
                variant="filled"
                value={
                  props.formField
                    ? props.formField.value
                      ? props.formField.value
                      : []
                    : props.value
                }
                onChange={selectValueChange}
                onFocus={props?.onFocus}
                onBlur={props.formField?.onBlur}
                disabled={props.isDisabled}
                MenuProps={{
                  sx: {
                    "& .MuiList-root": {
                      padding: 0,
                      maxHeight: "200px",
                    },
                  },
                }}
                multiple={props.type === "multiple" ? true : false}
                renderValue={(selected: any) => {
                  if (
                    selected === undefined ||
                    selected?.length <= 0 ||
                    selected === null
                  ) {
                    return `${props?.placeholder}`;
                  }
                  if (props?.type !== "multiple") {
                    return props?.options?.filter(
                      (item: any) => selected === item[props.returnKey || "id"]
                    )[0]?.[props?.dataKey || "id"];
                  } else {
                    return props?.options
                      ?.filter((item: any) =>
                        selected?.includes(item[props.returnKey || "id"])
                      )
                      .map((item: any) => item[props.dataKey || "label"])
                      .join(", ");
                  }
                }}
              >
                {props.type === "multiple"
                  ? displayedOptions?.map((item: any, index: number) => (
                      <StyledMenuItem
                        key={`menu-item-${item[props.returnKey || "id"]}`}
                        value={item[props.returnKey || "id"]}
                      >
                        <InputCheckBox
                          checked={
                            (props.formField?.value
                              ? props.formField.value
                              : props.value
                            ).indexOf(item[props.returnKey || "id"]) > -1
                          }
                        />
                        {item[props.dataKey || "label"]}
                      </StyledMenuItem>
                    ))
                  : displayedOptions?.map((item: any, index: number) => (
                      <StyledMenuItem
                        key={`menu-item-${item[props.returnKey || "id"]}`}
                        value={item[props.returnKey || "id"]}
                      >
                        {item[props.dataKey || "label"]}
                      </StyledMenuItem>
                    ))}
              </Select>
              <StyledFormHelperText>
                {generateHelperText()}
              </StyledFormHelperText>
            </SimpleStyledFormControl>
          )}
        </>
      ) : (
        <StyledReadOnlyTextBox
          className=" readonly-textbox"
          label={props.label}
          // value={
          //   props.formField?.value
          //     ? props.formField.value
          //     : props.value
          //     ? props.value
          //     : "-"
          // }
          value={readOnlyValue()}
        />
      )}
    </>
  );
}
SelectInput.defaultProps = {
  labelId: uuidv4(),
  minWidth: 0,
  type: "single",
};

export default SelectInput;
