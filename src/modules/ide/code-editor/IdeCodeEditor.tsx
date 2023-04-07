import Editor from "@monaco-editor/react";
import React, { useCallback, useEffect, useState } from "react";
import {
  createFileApi,
  getFileDataApi,
  saveFileDataApi,
} from "../../../common/store/features/workspace/workspaceSlice";
import { useAppDispatch, useAppSelector } from "../../../common/store/hooks";
import { ToastService } from "../../../components/toast/ToastService";
import { useDebounce } from "../../../hooks/useDebounce";

interface IdeCodeEditorProps {
  fileName: string;
  path: string;
  onValidationChange: any;
}

function IdeCodeEditor(props: IdeCodeEditorProps) {
  // States
  const [language, setLanguage] = React.useState("html");
  const [code, setCode] = React.useState("");
  const [lastSavedCode, setLastSavedCode] = useState("");

  // Variables
  const dispatch = useAppDispatch();
  const { token, navModules, userDetails } = useAppSelector(
    (state) => state.auth
  );

  // Functions

  const handleEditorChange = (value: any) => {
    setCode(value);
  };
  const optimisedHandleChanges = useCallback(
    useDebounce(handleEditorChange),
    []
  );

  // Api Functions
  const getFileData = (payload: any) => {
    dispatch(getFileDataApi(payload))
      .unwrap()
      .then(
        (res) => {
          if (res.status === "success") {
            // ToastService.success(res.message);
            setCode(res.data);
          } else {
            ToastService.error(res?.message);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  };
  const saveFileData = (payload: any) => {
    dispatch(saveFileDataApi(payload))
      .unwrap()
      .then(
        (res) => {
          if (res.status === "success") {
            // ToastService.success(res.message);
          } else {
            ToastService.error(res?.message);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  };

  useEffect(() => {
    let extension = props?.fileName?.split(".")[1];
    switch (extension) {
      case "js":
        setLanguage("javascript");
        break;
      case "py":
        setLanguage("python");
        break;
      case "json":
        setLanguage("json");
        break;

      default:
        break;
    }
  }, [props.fileName]);
  useEffect(() => {
    console.log(props.path);
    if (props?.path) getFileData({ path: props?.path });
  }, [props.path]);

  useEffect(() => {
    console.log("code", code);
    if (code) {
      saveFileData({ path: props?.path, content: code });
    }
  }, [code]);

  return (
    <div style={{ height: "100%" }}>
      <Editor
        height="100%"
        language={language}
        options={{ minimap: { enabled: false } }}
        onValidate={props.onValidationChange}
        value={code}
        onChange={optimisedHandleChanges}
      />
    </div>
  );
}

export default IdeCodeEditor;
