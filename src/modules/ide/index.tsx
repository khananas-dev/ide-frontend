import { Box, Button, Menu, MenuItem, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as FlexLayout from "flexlayout-react";
import "./IdeStyle.scss";
import IdeSolutionExplorer from "./solution-explorer/IdeSolutionExplorer";
import IdeCodeEditor from "./code-editor/IdeCodeEditor";
import { useAppDispatch, useAppSelector } from "../../common/store/hooks";
import CreateFileComponent from "../../components/create-file-component/CreateFileComponent";
import {
  deleteFileApi,
  deleteFolderApi,
  getAllWorkSpaceDataApi,
  terminalApi,
} from "../../common/store/features/workspace/workspaceSlice";
import ModalService from "../../components/modal-component/services/ModalService";
import { ToastService } from "../../components/toast/ToastService";
import { Terminal } from "primereact/terminal";
import { TerminalService } from "primereact/terminalservice";
import axios from "axios";

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
        size: 200,
        children: [
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
  const [renameData, setRenameData] = useState<any>();
  const [isRename, setIsRename] = useState<boolean>(false);
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
  const handleFileCreationModalClose = () => {
    setIsRename(false);
    setRenameData("");
    setFileCreationModalOpen(false);
  };

  // Functions
  function removeAllTabs() {
    const nodes = editorModel.getActiveTabset()?.getChildren();
    nodes?.forEach((node) => {
      console.log(node.getId(), "nodeid");
      editorModel.doAction(FlexLayout.Actions.deleteTab(node.getId()));
    });
  }
  const commandHandler = async (text: any) => {
    let response;
    let argsIndex = text.indexOf(" ");
    let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;
    switch (command) {
      case "clear":
        response = null;
        break;
      default:
        let commandData = { command: text };
        const responseData = await axios.put(
          "http://localhost:8080/api/terminal",
          commandData,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        refreshApi();
        response = responseData.data;
        break;
    }
    if (response) TerminalService.emit("response", response);
    else TerminalService.emit("clear");
  };
  const findPathInSideTreeObjectArray: any = (array: any, path: any) => {
    for (var i = 0; i < array.length; i++) {
      var item = array[i];
      if (item.path === path) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        var result = findPathInSideTreeObjectArray(item.children, path);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  };
  const menuActions = (event: {
    data: any;
    type: "rename" | "delete";
    isFile: boolean;
  }) => {
    switch (event?.type) {
      case "delete":
        console.log(event);
        ModalService.warning({
          message: `Are you sure you want delete ${event?.data?.path}?`,
          title: "Confirm Delete",
          primaryBtn: {
            label: "Yes",
            onClick: (e: any) => {
              // deleteBulkWorkFlowAlert(selectedRow);
              if (event?.isFile) {
                deleteFile({ path: event?.data?.path });
              } else {
                deleteFolder({ path: event?.data?.path });
              }
            },
          },
          secondaryBtn: {
            label: "No",
          },
        });

        break;
      case "rename":
        setIsRename(true);
        setRenameData(event?.data);

        if (event?.isFile) {
          handleFileCreationModalOpen("file");
        } else {
          handleFileCreationModalOpen("folder");
        }
        break;

      default:
        break;
    }
  };
  const factory = (node: FlexLayout.TabNode) => {
    var component = node.getComponent();
    // console.log(node);

    switch (component) {
      case "navigation":
        return (
          <IdeSolutionExplorer
            onFileSelect={openFile}
            directoryData={directoryData}
            menuActions={menuActions}
            handleFileCreationModalOpen={handleFileCreationModalOpen}
          />
        );
      case "file":
        return (
          <IdeCodeEditor
            onValidationChange={setProblems}
            fileName={node.getName()}
            path={node.getId()}
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
        return <Terminal welcomeMessage="Welcome to CodeWeb." prompt="$" />;

      default:
        return <div>Empty Page</div>;
    }
  };
  const openFile = (id: string) => {
    const newFile = findPathInSideTreeObjectArray(directoryData, id);
    console.log("open File", { directoryData, id });
    if (newFile?.type === "file") {
      // New Tab Add Logic is not proper yet, need to fix the id logic.
      const checkTab = editorModel.getNodeById(id);
      if (checkTab) {
        editorModel.doAction(FlexLayout.Actions.selectTab(id));
      } else {
        // let newTabLocation;

        if (editorModel.getActiveTabset()?.getChildren().length === 0) {
          editorModel.doAction(
            FlexLayout.Actions.addNode(
              {
                type: "tab",
                component: "file",
                name: newFile?.name,
                id: id,
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
                name: newFile?.name,
                id: id,
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
    }
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
  const deleteFile = (payload: any) => {
    dispatch(deleteFileApi(payload))
      .unwrap()
      .then(
        (res) => {
          if (res.status === "success") {
            ToastService.success(res.message);
            removeAllTabs();
            refreshApi();
          } else {
            ToastService.error(res?.message);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  };
  const deleteFolder = (payload: any) => {
    dispatch(deleteFolderApi(payload))
      .unwrap()
      .then(
        (res) => {
          if (res.status === "success") {
            ToastService.success(res.message);
            refreshApi();
          } else {
            ToastService.error(res?.message);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  };
  const refreshApi = () => {
    getAllWorkSpaceData();
    setIsRename(false);
  };

  // Effects
  useEffect(() => {
    setEditorModel(FlexLayout.Model.fromJson(config));
  }, [config]);

  useEffect(() => {
    getAllWorkSpaceData();
  }, []);
  useEffect(() => {
    TerminalService.on("command", commandHandler);

    return () => {
      TerminalService.off("command", commandHandler);
    };
  }, []);

  return (
    <div className="ide-layout">
      <FlexLayout.Layout
        onTabSetPlaceHolder={() => "Open file from solution explorer"}
        model={editorModel}
        factory={factory}
      />
      <Modal open={fileCreationModalOpen}>
        <Box sx={style}>
          <CreateFileComponent
            onClose={handleFileCreationModalClose}
            refreshApi={refreshApi}
            type={createType}
            data={renameData}
            isRename={isRename}
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
