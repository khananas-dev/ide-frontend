import { memo, useLayoutEffect, useRef } from "react";
import usePrevious from "../../../hooks/usePrevious";
import { SingleOTPInputStyled } from "./SingleOTPInputStyled";

interface SingleOTPInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}
export function SingleOTPInputComponent(props: SingleOTPInputProps) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <SingleOTPInputStyled ref={inputRef} {...rest} />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
