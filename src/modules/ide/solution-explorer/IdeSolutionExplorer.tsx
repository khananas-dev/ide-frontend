import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { StyledTreeViewPanel } from "./IdeSolutionExplorerStyled";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { Box } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../common/store/hooks";
import { getAllWorkSpaceDataApi } from "../../../common/store/features/workspace/workspaceSlice";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function IdeSolutionExplorer(props: {
  onFileSelect?: any;
  directoryData: any[];
  menuActions: (event: {
    data: any;
    type: "rename" | "delete";
    isFile: boolean;
  }) => void;
}) {
  const dispatch = useAppDispatch();

  // States
  const [hoveredNode, setHoveredNode] = useState(null);

  const handleNodeMouseEnter = (node: any) => {
    setHoveredNode(node);
  };

  const handleNodeMouseLeave = () => {
    setHoveredNode(null);
  };
  // Functions
  const DirectoryList = (data: any) => {
    return (
      <TreeItem
        className="explorer-section"
        nodeId="2"
        label={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FolderIcon sx={{ marginRight: "5px" }} />
            ~/
          </Box>
        }
      >
        {data?.map((x: any, index: number) => (
          <Item key={x.id} data={x} index={index} />
        ))}
      </TreeItem>
    );
  };
  const Item = ({ data, index }: any) => {
    if (data.type === "directory") {
      return (
        <TreeItem
          expandIcon={<ArrowRightIcon />}
          collapseIcon={<ArrowDropDownIcon />}
          nodeId={data.path}
          onMouseEnter={() => handleNodeMouseEnter(data)}
          onMouseLeave={handleNodeMouseLeave}
          label={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display={"flex"}>
                <FolderIcon sx={{ marginRight: "5px" }} />
                {data?.name}
              </Box>
              {hoveredNode === data && (
                <Box>
                  <Tooltip title="Rename">
                    <IconButton
                      sx={{ padding: "0px", marginRight: "5px" }}
                      size="small"
                      aria-label="rename"
                      disableRipple
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        props?.menuActions({
                          data: data,
                          type: "rename",
                          isFile: false,
                        });
                      }}
                    >
                      <EditIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      sx={{ padding: "0px" }}
                      size="small"
                      aria-label="delete"
                      disableRipple
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        props?.menuActions({
                          data: data,
                          type: "delete",
                          isFile: false,
                        });
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
          }
        >
          {data.children.map((x: any, subChildIndex: number) => (
            <Item key={x.id} data={x} index={subChildIndex} />
          ))}
        </TreeItem>
      );
    } else {
      return (
        <TreeItem
          // sx={{ padding: "0px 12px" }}
          nodeId={data.path}
          onMouseEnter={() => handleNodeMouseEnter(data)}
          onMouseLeave={handleNodeMouseLeave}
          label={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display={"flex"}>
                <DescriptionIcon sx={{ marginRight: "5px" }} />
                {data?.name}
              </Box>
              {hoveredNode === data && (
                <Box>
                  <Tooltip title="Rename">
                    <IconButton
                      sx={{ padding: "0px", marginRight: "5px" }}
                      size="small"
                      aria-label="rename"
                      disableRipple
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        props?.menuActions({
                          data: data,
                          type: "rename",
                          isFile: true,
                        });
                      }}
                    >
                      <EditIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      sx={{ padding: "0px" }}
                      size="small"
                      aria-label="delete"
                      disableRipple
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(data, "delete");
                        props?.menuActions({
                          data: data,
                          type: "delete",
                          isFile: true,
                        });
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
          }
        />
      );
    }
  };
  const handleFileSelection = (event: any) => {
    // console.log(event, "event");
    // if (event == "210" || event == "221") {
    //   props?.onFileSelect &&
    //     props.onFileSelect(event == "210" ? "file1.js" : "file2.css");
    // } else if (["10", "11", "12", "13", "321", "322"].includes(event)) {
    //   alert("File Not Supported Yet");
    // }
    console.log(event);
    props?.onFileSelect(event);
  };

  return (
    <StyledTreeViewPanel
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      // defaultEndIcon={<DescriptionIcon />}
      onNodeSelect={(event: any, ids: any) => handleFileSelection(ids)}
      defaultExpanded={["1", "10", "2", "3"]}
      onMouseEnter={handleNodeMouseLeave}
      onMouseLeave={handleNodeMouseLeave}
    >
      {props?.directoryData && DirectoryList(props?.directoryData)}
    </StyledTreeViewPanel>
  );
}

export default IdeSolutionExplorer;
