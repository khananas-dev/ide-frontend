import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as FlexLayout from "flexlayout-react";
import "./IdeStyle.scss";
import IdeSolutionExplorer from "./solution-explorer/IdeSolutionExplorer";
import IdeCodeEditor from "./code-editor/IdeCodeEditor";
import { useAppDispatch } from "../../common/store/hooks";
import { getAllWorkSpaceDataApi } from "../../common/store/features/workspace/workspaceSlice";

function CodeStudio() {
  // States
  const [config, setConfig] = React.useState<any>({
    global: { tabEnableClose: false },
    borders: [
      {
        type: "border",
        location: "bottom",
        size: 100,
        children: [
          {
            type: "tab",
            id: "#987197dc-d22b-4d03-84bf-d1b15c6e5618",
            name: "Problems",
            component: "text",
          },
          {
            type: "tab",
            id: "#987197dc-d22b-4d03-84bf-terminal",
            name: "terminal",
            component: "terminal",
          },
        ],
      },
      {
        type: "border",
        location: "left",
        size: 300,
        minSize: 200,
        selected: 0,
        children: [
          {
            type: "tab",
            name: "Navigation",
            component: "navigation",
          },
        ],
      },
    ],
    layout: {
      type: "row",
      children: [
        {
          id: "file-tab",
          type: "tabset",
          weight: 50,
          selected: -1,
          children: [],
          active: true,
        },
      ],
    },
  });
  const [editorModel, setEditorModel] = React.useState<FlexLayout.Model>(
    FlexLayout.Model.fromJson(config)
  );
  const [problems, setProblems] = React.useState<any[]>([]);

  // Functions
  const factory = (node: FlexLayout.TabNode) => {
    var component = node.getComponent();
    console.log(node);

    switch (component) {
      case "navigation":
        return <IdeSolutionExplorer onFileSelect={openFile} />;
      case "file":
        return (
          <IdeCodeEditor
            onValidationChange={setProblems}
            fileName={node.getName()}
          />
        );
      case "text":
        return (
          <p>
            {problems.map((prob) => (
              <p>{prob.message}</p>
            ))}
          </p>
        );

      default:
        return <div>Empty Page</div>;
    }
  };

  const openFile = (file: string) => {
    // New Tab Add Logic is not proper yet, need to fix the id logic.
    const checkTab = editorModel.getNodeById(file);
    if (checkTab) {
      editorModel.doAction(FlexLayout.Actions.selectTab(file));
    } else {
      // let newTabLocation;
      if (editorModel.getActiveTabset()?.getChildren().length === 0) {
        editorModel.doAction(
          FlexLayout.Actions.addNode(
            {
              type: "tab",
              component: "file",
              name: file,
              id: file,
              enableClose: true,
            },
            editorModel.getActiveTabset()?.getId() || "",
            FlexLayout.DockLocation.LEFT,
            -1,
            true
          )
        );
      } else {
        editorModel.doAction(
          FlexLayout.Actions.addNode(
            {
              type: "tab",
              component: "file",
              name: file,
              id: file,
              enableClose: true,
            },
            editorModel.getActiveTabset()?.getId() || "",
            FlexLayout.DockLocation.CENTER,
            -1,
            true
          )
        );
      }
    }
    setConfig(editorModel.toJson());
  };

  // Effects
  useEffect(() => {
    setEditorModel(FlexLayout.Model.fromJson(config));
  }, [config]);
  return (
    <div className="ide-layout">
      <FlexLayout.Layout
        onTabSetPlaceHolder={() => "Open file from solution explorer"}
        model={editorModel}
        factory={factory}
      />
    </div>
  );
}

export default CodeStudio;
