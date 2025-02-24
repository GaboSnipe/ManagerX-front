import React, { useMemo } from "react";
// Context
import { useFileManager } from "../context";
// Types
import type { FileType } from "../types";
import { ViewStyle } from "../types";
// Components
import SvgIcon from "./SvgIcon";

interface FolderPathProps {
  setNewFolderModalVisible: (visible: boolean) => void;
  setNewFileModalViasble: (visible: boolean) => void;
}

const FolderPath: React.FC<FolderPathProps> = ({ setNewFolderModalVisible, setNewFileModalViasble }) => {
  const { fs, currentFolder, setCurrentFolder, viewStyle, setViewStyle, parrentPath, goUp } = useFileManager();

  return (
    <div className="rfm-workspace-header">
      <div className="rfm-folder-path-container">
        <SvgIcon
          svgType="arrow-up"
          onClick={goUp}
          className="rfm-folder-path-svg"
        />
        <span className="rfm-folder-path-span">
          {`/${parrentPath}`}
        </span>
      </div>
      <div className="rfm-header-container">
      <button className="flex items-center" onClick={()=> setNewFolderModalVisible(true)}>
        <SvgIcon
          svgType="add-folder"
          className={`rfm-add-folder-icon`}
        />
          <p>ფოლდერის შექმნა</p>
        </button>
        <button className="flex items-center" onClick={()=> setNewFileModalViasble(true)}>
        <SvgIcon
          svgType="upload"
          className={`rfm-upload-icon `}
        />
          <p>ატვირთვა</p>
        </button>
        <SvgIcon
          svgType="list"
          className={`rfm-header-icon ${viewStyle === ViewStyle.List && "rfm-header-icon--selected"}`}
          onClick={() => setViewStyle(ViewStyle.List)}
        />
        <SvgIcon
          svgType="icons"
          className={`rfm-header-icon ${viewStyle === ViewStyle.Icons && "rfm-header-icon--selected"}`}
          onClick={() => setViewStyle(ViewStyle.Icons)}
        />
      </div>
    </div>
  );
};

export default FolderPath;
