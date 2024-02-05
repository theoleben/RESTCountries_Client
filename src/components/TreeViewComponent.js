import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import { Box } from "@mui/material";
import "./TreeViewComponent.css";

const TreeViewComponent = (props) => {
  const index = 0;

  const handleClick = (e, id) => {
    // console.log("handleClick");
    // console.log(e);
    // console.log(id);
    props.onClicked(id);
  };

  // Render childrens
  const renderElements = (array, index) => {
    // console.log("array:", array);
    index++;

    return array.map((element) => {
      const id = `level_${index}_${element.name}`;

      return (
        <TreeItem
          key={id}
          nodeId={id}
          label={element.name}
          // label={id}
          onClick={(event) => handleClick(event, id)}
        />
      );
    });
  };

  // Render elements that have children
  const renderTree = (node, index) => {
    const keys = Object.entries(node);
    // console.log(keys);
    index++;
    // console.log(index);

    return keys.map((element) => {
      // console.log(Array.isArray(element[1]));
      const id = `level_${index}_${element[0]}`;
      return (
        <TreeItem
          key={id}
          nodeId={id}
          label={element[0]}
          // label={id}
          onClick={(event) => handleClick(event, id)}
        >
          {!Array.isArray(element[1])
            ? renderTree(element[1], index)
            : renderElements(element[1], index)}
        </TreeItem>
      );
    });
  };

  return (
    <Box
      sx={{
        border: "1px solid lightgrey",
        borderRadius: "2rem",
        width: "100%",
        padding: "20px",
        paddingRight: "10px",
      }}
    >
      <TreeView
        aria-label="Countries tree view"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(props.data, index)}
      </TreeView>
    </Box>
  );
};

export default TreeViewComponent;
