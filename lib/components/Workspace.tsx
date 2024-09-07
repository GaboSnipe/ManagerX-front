import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFileManager } from "../context";
import type { FileType } from "../types";
import { ViewStyle } from "../types";

// Components
import FileIcon from "./FileIcon";
import NewFolderIcon from "./NewFolderIcon";
import FolderPath from "./FolderPath";
import NewFolderModal from "./NewFolderModal";
import NewFileModal from "./NewFileModal";
import UploadFileModal from "./UploadFileModal";


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import SvgIcon from "./SvgIcon";


const formatSize = (sizeInBytes?: number) => {
  if (sizeInBytes === undefined || sizeInBytes <= 0) {
    return ''; 
  }

  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;
  const TB = GB * 1024;

  if (sizeInBytes < KB) {
    return `${sizeInBytes} Bytes`;
  } else if (sizeInBytes < MB) {
    return `${(sizeInBytes / KB).toFixed(2)} KB`;
  } else if (sizeInBytes < GB) {
    return `${(sizeInBytes / MB).toFixed(2)} MB`;
  } else if (sizeInBytes < TB) {
    return `${(sizeInBytes / GB).toFixed(2)} GB`;
  } else {
    return `${(sizeInBytes / TB).toFixed(2)} TB`;
  }
};



const formatDateTime = (dateTimeStr: Date) => {
  const date = new Date(dateTimeStr);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


const columnHelper = createColumnHelper<FileType>()

const columns = [
  columnHelper.accessor('Name', {
    header: () => 'Name',
    cell: info => (
    <div className="rfm-workspace-list-icon-td">
      <SvgIcon svgType={info.row.original.IsDir ? "folder" : "file"} className="rfm-workspace-list-icon"/>
      <p>{info.getValue()}</p>
    </div>
    ),
  }),
  columnHelper.accessor('Size', {
    header: () => 'Size',
    cell: info => (
      <div className="rfm-workspace-list-icon-td">
        <p>{formatSize(info.getValue())}</p>
      </div>
    ),
  }),
  columnHelper.accessor('ModTime', {
    header: () => 'Last Modified',
    cell: info => (
        <p>{formatDateTime(info.getValue())}</p>
    ),
  })
]

const Workspace = () => {
  const { currentFolder, fs, viewStyle, viewOnly, setCurrentFolder, setUploadedFileData, onDoubleClick, onRefresh } = useFileManager();
  const [newFolderModalVisible, setNewFolderModalVisible] =
    useState<boolean>(false);  
    const [newFileModalVisable, setNewFileModalViasble] =
    useState<boolean>(false);
  const [uploadFileModalVisible, setUploadFileModalVisible] =
    useState<boolean>(false);

  const setUploadModalVisible = (value: boolean) => {
    if (viewOnly) {
      setUploadFileModalVisible(false);
    } else {
      setUploadFileModalVisible(value);
    }
  };

  useEffect(() => {
    if (newFolderModalVisible) {
      setNewFolderModalVisible(false);
    }
    if (uploadFileModalVisible) {
      setUploadModalVisible(false);
      setUploadedFileData(undefined);
    }
  }, [currentFolder]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setUploadedFileData(file);
      setUploadModalVisible(true);
    },
    [setUploadedFileData]
  );

  const onCloseUploadFileModal = () => {
    setUploadModalVisible(false);
    setUploadedFileData(undefined);
  };

  const { getRootProps, isDragAccept } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: onDrop,
  });

  const currentFolderFiles = useMemo(() => {
    const files = fs;
    return files;
  }, [fs, currentFolder]);

  const table = useReactTable({data: currentFolderFiles, columns, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [{ id: 'Name', desc: false }],
    },})

  const handleClick = async (file: FileType) => {

    if (file.IsDir) {
      setCurrentFolder(file.ID);
      if (onRefresh !== undefined) {
        try {
          await onRefresh(file.ID);
        } catch (e) {
          throw new Error("Error during refresh");
        }
      }
    }
    
  };

  const handleDoubleClick = (file: object) => {
    if (onDoubleClick) {
      onDoubleClick(file)
    }
  }

  return (
    <section
      id="react-file-manager-workspace"
      className={`rfm-workspace ${
        isDragAccept && !viewOnly ? "rfm-workspace-dropzone" : ""
      }`}
      {...getRootProps()}
    >
      {/* Top bar with folder path */}
      <FolderPath setNewFolderModalVisible={setNewFolderModalVisible} setNewFileModalViasble={setNewFileModalViasble} />

      {/* File listing */}
      <div className="rfm-workspace-file-listing">
        
        {/* Icons File View */}
        {viewStyle === ViewStyle.Icons && (
          <>
          {currentFolderFiles.map((f: FileType, key: number) => {
            return (
              <button onDoubleClick={() => handleDoubleClick(f)} key={key}>
                <FileIcon id={f.ID} name={f.Name} isDir={f.IsDir}/>
              </button>
            )}
          )}
          {!viewOnly && (
            <NewFolderIcon onClick={() => setNewFolderModalVisible(true)} />
          )}
          </>
        )}

        {/* List File View */}
        {viewStyle === ViewStyle.List && (
        <>
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th className="rfm-workspace-list-th" key={header.id} onClick={header.column.getToggleSortingHandler()}>
                      <div className="rfm-workspace-list-th-content">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() ? (header.column.getIsSorted() === 'desc' ? <SvgIcon svgType="arrow-down" className="rfm-header-sort-icon" /> : <SvgIcon svgType="arrow-up" className="rfm-header-sort-icon" />) : ''}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="rfm-workspace-list-icon-row">
                  {row.getVisibleCells().map(cell => (
                    <td className="rfm-workspace-list-align-txt" key={cell.id} onClick={() => handleClick(row.original)} onDoubleClick={() => handleDoubleClick(row.original)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
        )}    


        {!viewOnly && (
          <>
          <NewFolderModal
            isVisible={newFolderModalVisible}
            onClose={() => setNewFolderModalVisible(false)}
          />
          <NewFileModal
            isVisible={newFileModalVisable}
            onClose={() => setNewFileModalViasble(false)}
          />
            <UploadFileModal
              isVisible={uploadFileModalVisible}
              onClose={onCloseUploadFileModal}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Workspace;
