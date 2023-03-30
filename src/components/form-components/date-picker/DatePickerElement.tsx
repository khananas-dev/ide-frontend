import React, { useCallback, useMemo, useRef } from "react";
// import { addLocale } from "primereact/api";
import moment from "moment";
import { Button, Stack } from "@mui/material";
// import { Calendar } from "../../calendar-picker";
import "../../calendar-picker/calendar-picker.css";
// import "./DatePickerElement.scss";
import { ControllerRenderProps, ControllerFieldState } from "react-hook-form";
import {
  CalendarContainer,
  CalendarGlobalStyle,
} from "./DatePickerElementStyled";
import { useTheme } from "@mui/material/styles";
import { Calendar } from "../../calendar-picker";

interface DatePickerElementProps {
  isDisabled?: boolean;
  type?: "date" | "date-and-time" | "range";
  value?: Date | Date[] | undefined | any | any[];
  id: string;
  onChange?: any;
  isReadOnly?: boolean;
  label?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: any[];
  disabledDays?: number[];
  dateTemplate?: any;
  formField?: ControllerRenderProps<any, any>;
  formFieldState?: ControllerFieldState;
  placeholder?: string;
  hintMessage?: string;
  onValueChange?: any;
  required?: boolean;
  error?: any;
  readOnlyInput?: boolean;
  size?: "default" | "small";
  className?: string;
  isFullWidth?: boolean;
  inputClassName?: string;
}

function DatePickerElement(props: DatePickerElementProps) {
  // Variable
  const theme = useTheme();

  // States

  const calendarRef = useRef<any>();

  // Functions
  const DayDifferenceFinder = useMemo(() => {
    let newValue = props.formField?.value ? props.formField.value : props.value;
    if (newValue && newValue[0] && newValue[1]) {
      let a = moment(newValue[0]);
      let b = moment(newValue[1]);

      return ` : ${b.diff(a, "days") + 1}`;
    }
    return null;
  }, [props?.value, props.formField?.value]);
  const handleClose = () => {
    if (!props.isDisabled) {
      if (calendarRef) {
        calendarRef?.current?.hide();
      }
    }
  };

  const handleApply = () => {
    if (!props.isDisabled) {
      if (calendarRef) {
        calendarRef?.current?.hide();
      }
    }
  };

  const openCalendar = () => {
    if (!props.isDisabled) {
      if (calendarRef) {
        calendarRef?.current?.show();
      }
    }
  };

  const valueFormater = useCallback(
    (dateIndex: number, label: string) => {
      let newValue = props.formField?.value
        ? props.formField.value
        : props.value;
      if (newValue && newValue[dateIndex]) {
        return moment(newValue[dateIndex]).format("DD MMM ,YYYY");
      } else {
        return label;
      }
    },
    [props.value, props.formField]
  );

  const headerTemplate = () => (
    <div className="date-picker-custom-header">
      <div className="date-info-container">
        <div className="date-toggel-button">
          <input
            type="radio"
            id="start-date"
            name="date-selector"
            defaultChecked
          />
          <label htmlFor="start-date">{valueFormater(0, "Start Date")}</label>
        </div>
        <div className="date-toggel-button">
          <input type="radio" id="end-date" name="date-selector" />
          <label htmlFor="end-date">{valueFormater(1, "End Date")}</label>
        </div>
      </div>
      <p>
        Selected Days
        {DayDifferenceFinder}
      </p>
    </div>
  );
  const applyButtonDisabledControl = () => {
    let newValue = props.formField?.value ? props.formField.value : props.value;
    if (props.type === "range") {
      return !(newValue && newValue[0] && newValue[1]);
    } else {
      return !newValue;
    }
  };
  const footerTemplate = () => (
    <Stack direction="row" justifyContent="flex-end" spacing={1}>
      <Button onClick={handleClose} size="small" variant="outlined">
        Cancel
      </Button>
      <Button
        size="small"
        disabled={applyButtonDisabledControl()}
        variant="contained"
        onClick={handleApply}
      >
        Apply
      </Button>
    </Stack>
  );

  const selectValueChange = (event: any) => {
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

  return (
    <CalendarContainer>
      <CalendarGlobalStyle themeData={theme} />
      {props.type === "range" ? (
        <Calendar
          error={props.error || !!props.formFieldState?.error}
          helperText={generateHelperText()}
          required={props.required}
          sx={{ minWidth: "220px" }}
          disabled={props.isDisabled}
          ref={calendarRef}
          id={props.id}
          value={props.formField?.value ? props.formField.value : props.value}
          label={props.label}
          onChange={selectValueChange}
          onBlur={props.formField?.onBlur}
          selectionMode="range"
          readOnlyInput
          headerTemplate={headerTemplate}
          footerTemplate={footerTemplate}
          dateFormat={props.dateFormat}
          disabledDates={props.disabledDates}
          disabledDays={props.disabledDays}
          dateTemplate={props.dateTemplate}
          size={props.size}
          placeholder={props.placeholder}
          isReadOnly={props.isReadOnly}
          className={props.className}
          isFullWidth={props.isFullWidth}
          inputClassName={props.inputClassName}
        />
      ) : props.type === "date-and-time" ? (
        <Calendar
          error={props.error || !!props.formFieldState?.error}
          helperText={generateHelperText()}
          required={props.required}
          disabled={props.isDisabled}
          ref={calendarRef}
          id={props.id}
          value={props.formField?.value ? props.formField.value : props.value}
          label={props.label}
          onChange={selectValueChange}
          onBlur={props.formField?.onBlur}
          dateFormat={props.dateFormat}
          readOnlyInput
          minDate={props.minDate}
          maxDate={props.maxDate}
          disabledDates={props.disabledDates}
          disabledDays={props.disabledDays}
          showTime
          hourFormat="12"
          footerTemplate={footerTemplate}
          dateTemplate={props.dateTemplate}
          size={props.size}
          placeholder={props.placeholder}
          isReadOnly={props.isReadOnly}
          className={props.className}
          isFullWidth={props.isFullWidth}
          inputClassName={props.inputClassName}
        />
      ) : (
        <Calendar
          error={props.error || !!props.formFieldState?.error}
          helperText={generateHelperText()}
          required={props.required}
          disabled={props.isDisabled}
          ref={calendarRef}
          id={props.id}
          value={props.formField?.value ? props.formField.value : props.value}
          label={props.label}
          onChange={selectValueChange}
          onBlur={props.formField?.onBlur}
          dateFormat={props.dateFormat}
          readOnlyInput
          minDate={props.minDate}
          maxDate={props.maxDate}
          disabledDates={props.disabledDates}
          disabledDays={props.disabledDays}
          dateTemplate={props.dateTemplate}
          size={props.size}
          placeholder={props.placeholder}
          isReadOnly={props.isReadOnly}
          className={props.className}
          isFullWidth={props.isFullWidth}
          inputClassName={props.inputClassName}
        />
      )}
    </CalendarContainer>
  );
}

export default DatePickerElement;
