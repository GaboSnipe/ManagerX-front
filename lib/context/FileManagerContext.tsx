import type { Dispatch } from "react";
import { createContext, useContext } from "react";
import type { FileSystemType, ViewStyle } from "../types";

interface ProviderInterface {
  fs: FileSystemType;
  parrentPath: string;
  currentFolder: string;
  setCurrentFolder: (id: string) => void;
  viewOnly?: boolean;
  onDoubleClick?: (file: object) => Promise<void>;
  onRefresh?: (id: string) => Promise<void>;
  onUpload?: (fileData: any) => Promise<void>;
  onCreateFolder?: (folderName: string) => Promise<void>;
  onDelete?: (fileId: string) => Promise<void>;
  uploadedFileData: any;
  setUploadedFileData: Dispatch<any>;
  viewStyle: ViewStyle;
  setViewStyle: Dispatch<ViewStyle>;
  showNavbar: boolean;
}

export const FileManagerContext = createContext<ProviderInterface | null>(null);

export const useFileManager = () => {
  const context = useContext(FileManagerContext);
  if (!context) {
    throw new Error("useFileManager must be used within FileManagerProvider");
  }

  return context;
};
