import Editor from "@monaco-editor/react";
import React, { useEffect } from "react";

interface IdeCodeEditorProps {
  fileName: string;
  onValidationChange: any;
}

function IdeCodeEditor(props: IdeCodeEditorProps) {
  const [language, setLanguage] = React.useState("html");
  const [code, setCode] = React.useState("");

  useEffect(() => {
    if (props.fileName == "file1.js") {
      setLanguage("javascript");
      setCode("var a = 5; \nif(a == 5) {\n   console.log(a)\n}");
    } else if (props.fileName == "file2.css") {
      setLanguage("css");
      setCode(
        ".class_selector {\n    color: #ababab;\n    font-size: 14px;\n    border-radius:12px;\n}"
      );
    }
  }, [props.fileName]);

  return (
    <div style={{ height: "100%" }}>
      <Editor
        height="100%"
        language={language}
        options={{ minimap: { enabled: false } }}
        onValidate={props.onValidationChange}
        value={code}
      />
    </div>
  );
}

export default IdeCodeEditor;
