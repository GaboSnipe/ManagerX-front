import React, { useState } from "react";
// Context
import { FileManagerContext } from "./context";
// Components
import { Navbar, Workspace } from "./components";
// Types
import type { FileSystemType } from "./types";
import { ViewStyle } from "./types";

export interface IFileManagerProps {
  fs: FileSystemType;
  goUp?: () => Promise<void>;
  parrentPath?: string;
  viewOnly?: boolean;
  onDoubleClick?: (file: object) => Promise<void>;
  onRefresh?: (id: string) => Promise<void>;
  onUpload?: (fileData: any) => Promise<void>;
  onCreateFolder?: (folderName: string) => Promise<void>;
  onDelete?: (fileId: string) => Promise<void>;
  showNavbar?: boolean;
}

export const ReactFileManager = ({
  fs,
  goUp,
  parrentPath,
  viewOnly = false,
  onDoubleClick,
  onRefresh,
  onUpload,
  onCreateFolder,
  onDelete,
  showNavbar = false,
}: IFileManagerProps) => {
  const [currentFolder, setCurrentFolder] = useState<string>("0"); // Root folder ID must be "0"
  const [uploadedFileData, setUploadedFileData] = useState<File | null>(null); // Лучше указать тип File или null
  const [viewStyle, setViewStyle] = useState<ViewStyle>(ViewStyle.List);

  return (
    <FileManagerContext.Provider
      value={{
        fs,
        goUp,
        parrentPath,
        viewStyle,
        setViewStyle,
        viewOnly,
        currentFolder,
        setCurrentFolder,
        onDoubleClick,
        onRefresh,
        onUpload,
        onCreateFolder,
        onDelete,
        uploadedFileData,
        setUploadedFileData,
        showNavbar,
      }}
    >
      <div className="rfm-main-container">
        {showNavbar && 
        <Navbar />
}
        <Workspace />
      </div>
    </FileManagerContext.Provider>
  );
};
