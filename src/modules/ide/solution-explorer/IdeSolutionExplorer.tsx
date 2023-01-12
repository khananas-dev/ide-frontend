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
import { useAppDispatch } from "../../../common/store/hooks";
import { getAllWorkSpaceDataApi } from "../../../common/store/features/workspace/workspaceSlice";

interface WorkSpaceModel {
  id: string;
  name: string;
  type: string;
  path: string;
  children: WorkSpaceModel[];
}
function IdeSolutionExplorer(props: { onFileSelect?: any }) {
  // Variables
  const dispatch = useAppDispatch();

  // States
  const [directoryData, setDirectoryData] = useState<WorkSpaceModel[]>([]);

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
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FolderIcon sx={{ marginRight: "5px" }} />
              {data?.name}
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
          sx={{ padding: "0px 12px" }}
          nodeId={data.path}
          label={data.name}
        />
      );
    }
  };
  const handleFileSelection = (event: any) => {
    console.log(event, "event");
    if (event == "210" || event == "221") {
      props?.onFileSelect &&
        props.onFileSelect(event == "210" ? "file1.js" : "file2.css");
    } else if (["10", "11", "12", "13", "321", "322"].includes(event)) {
      alert("File Not Supported Yet");
    }
  };

  // Api Functions
  const getAllWorkSpaceData = () => {
    let userId = "khan.anas@gmail.com";
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

  // Effects
  useEffect(() => {
    getAllWorkSpaceData();
  }, []);

  return (
    <StyledTreeViewPanel
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<DescriptionIcon />}
      onNodeSelect={(event: any, ids: any) => handleFileSelection(ids)}
      defaultExpanded={["1", "10", "2", "3"]}
    >
      {directoryData && DirectoryList(directoryData)}
    </StyledTreeViewPanel>
  );
}

export default IdeSolutionExplorer;
