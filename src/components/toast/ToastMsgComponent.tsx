import React from "react";

function ToastMsgComponent(props: { title?: string; msg?: string }) {
  return (
    <>
      <p className="toast-msg">
        <span className="toast-title mr5">{props.title}</span>
        {props.msg}
      </p>
    </>
  );
}

export default ToastMsgComponent;
