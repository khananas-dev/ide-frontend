import { Box, Button, Menu, MenuItem, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as FlexLayout from "flexlayout-react";
import "./IdeStyle.scss";
import IdeSolutionExplorer from "./solution-explorer/IdeSolutionExplorer";
import IdeCodeEditor from "./code-editor/IdeCodeEditor";
import { useAppDispatch, useAppSelector } from "../../common/store/hooks";
import Terminal from "terminal-in-react";
import CreateFileComponent from "../../components/create-file-component/CreateFileComponent";
import { getAllWorkSpaceDataApi } from "../../common/store/features/workspace/workspaceSlice";
interface WorkSpaceModel {
  id: string;
  name: string;
  type: string;
  path: string;
  children: WorkSpaceModel[];
}
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

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const fileMenuOpen = Boolean(anchorEl);
  const handleFileMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [directoryData, setDirectoryData] = useState<WorkSpaceModel[]>([]);
  const [createType, setCreateType] = useState<"file" | "folder">("file");
  // Variables
  const { token, navModules, userDetails } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const handleFileMenuClose = () => {
    setAnchorEl(null);
  };

  const [fileCreationModalOpen, setFileCreationModalOpen] =
    React.useState(false);
  const handleFileCreationModalOpen = (type: "file" | "folder") => {
    setCreateType(type);
    handleFileMenuClose();
    setFileCreationModalOpen(true);
  };
  const handleFileCreationModalClose = () => setFileCreationModalOpen(false);

  // Functions
  const factory = (node: FlexLayout.TabNode) => {
    var component = node.getComponent();
    console.log(node);

    switch (component) {
      case "navigation":
        return (
          <IdeSolutionExplorer
            onFileSelect={openFile}
            directoryData={directoryData}
          />
        );
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
      case "terminal":
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Terminal
              color="green"
              backgroundColor="black"
              barColor="black"
              style={{ fontWeight: "bold", fontSize: "1em" }}
              msg="You can write anything here. Example - Hello! My name is Foo and I like Bar."
              commandPassThrough={(cmd, print) => {
                // do something async
                console.log("cmd", cmd);
              }}
            />
          </div>
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

  // Api Functions
  const getAllWorkSpaceData = () => {
    let userId = userDetails?.userId;
    dispatch(getAllWorkSpaceDataApi(userId))
      .unwrap()
      .then(
        (res) => {
          if (res.status === "success") {
            setDirectoryData(res.data);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  };

  const refreshApi = () => {
    getAllWorkSpaceData();
  };
  // Effects
  useEffect(() => {
    setEditorModel(FlexLayout.Model.fromJson(config));
  }, [config]);
  // Effects
  useEffect(() => {
    console.log("logining first time");
    getAllWorkSpaceData();
  }, []);

  return (
    <div className="ide-layout">
      <Box>
        <Box>
          <Button
            id="basic-button"
            aria-controls={fileMenuOpen ? "file-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={fileMenuOpen ? "true" : undefined}
            onClick={handleFileMenuClick}
            variant="text"
            sx={{ fontSize: "14px", padding: "2px 8px" }}
          >
            File
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={fileMenuOpen}
            onClose={handleFileMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleFileCreationModalOpen("file");
              }}
            >
              New File
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleFileCreationModalOpen("folder");
              }}
            >
              Add New Folder to Workspace
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      <FlexLayout.Layout
        onTabSetPlaceHolder={() => "Open file from solution explorer"}
        model={editorModel}
        factory={factory}
      />
      <Modal
        open={fileCreationModalOpen}
        // onClose={handleFileCreationModalClose}
      >
        <Box sx={style}>
          <CreateFileComponent
            onClose={handleFileCreationModalClose}
            refreshApi={refreshApi}
            type={createType}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default CodeStudio;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "4px",
  // p: 4,
};
