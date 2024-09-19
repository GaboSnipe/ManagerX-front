import { createRoot } from "react-dom/client";
import "@patternfly/react-core/dist/styles/base-no-reset.css"
import { toast } from 'react-toastify';
import "@patternfly/react-core/dist/styles/base.css";

import React, { useEffect } from 'react';
import { MultipleFileUpload, MultipleFileUploadMain, MultipleFileUploadStatus, MultipleFileUploadStatusItem, Modal } from '@patternfly/react-core';
import FileService from "../services/FileService";
import TaskService from "../services/TaskService";

export const MultipleFileUploadBasic = ({ selectedSubTask, setSelectedSubTask }) => {
  const [isHorizontal, setIsHorizontal] = React.useState(false);
  const [currentFiles, setCurrentFiles] = React.useState([]);
  const [readFileData, setReadFileData] = React.useState([]);
  const [showStatus, setShowStatus] = React.useState(false);
  const [statusIcon, setStatusIcon] = React.useState('inProgress');
  const [modalText, setModalText] = React.useState('');
  const [uploadControllers, setUploadControllers] = React.useState({});

  if (!showStatus && currentFiles.length > 0) {
    setShowStatus(true);
  }

  useEffect(() => {
    if (readFileData.length < currentFiles.length) {
      setStatusIcon('inProgress');
    } else if (readFileData.every(file => file.loadResult === 'success')) {
      setStatusIcon('success');
    } else {
      setStatusIcon('danger');
    }
  }, [readFileData, currentFiles]);

  const removeFiles = (namesOfFilesToRemove) => {
    const newCurrentFiles = currentFiles.filter(
      currentFile => !namesOfFilesToRemove.some(fileName => fileName === currentFile.name)
    );
    setCurrentFiles(newCurrentFiles);

    const newReadFiles = readFileData.filter(
      readFile => !namesOfFilesToRemove.some(fileName => fileName === readFile.fileName)
    );
    setReadFileData(newReadFiles);
  };

  const onClearClick = (fileName) => {
    if (uploadControllers[fileName]) {
      uploadControllers[fileName].abort();
      setUploadControllers(prevControllers => {
        const newControllers = { ...prevControllers };
        delete newControllers[fileName];
        return newControllers;
      });

      removeFiles([fileName]);
    }
  };

  const handleFileDrop = (_event, droppedFiles) => {
    const currentFileNames = currentFiles.map(file => file.name);
    const reUploads = droppedFiles.filter(droppedFile => currentFileNames.includes(droppedFile.name));

    Promise.resolve()
      .then(() => removeFiles(reUploads.map(file => file.name)))
      .then(() => setCurrentFiles(prevFiles => [...prevFiles, ...droppedFiles]));

    droppedFiles.forEach(file => {
      const controller = new AbortController();
      setUploadControllers(prevControllers => ({
        ...prevControllers,
        [file.name]: controller
      }));

      FileService.uploadAttachmentfile(file, selectedSubTask.uuid, { signal: controller.signal })
        .then(() => {
          console.log(`File ${file.name} uploaded successfully`);
          removeFiles([file.name]);
          TaskService.getSubTask(selectedSubTask.uuid)
          .then((res)=>{
            setSelectedSubTask(res.data)
          })
          setUploadControllers(prevControllers => {
            const newControllers = { ...prevControllers };
            delete newControllers[file.name];
            return newControllers;
          });
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            console.log(`Upload for ${file.name} aborted`);
          } else {
            toast.error(error, {
              containerId: "error"
            });
            console.error(`Error uploading file ${file.name}:`, error);
          }
        });
    });
  };

  const handleReadSuccess = (data, file) => {
    setReadFileData(prevReadFiles => [...prevReadFiles, {
      data,
      fileName: file.name,
      loadResult: 'success'
    }]);
  };

  const handleReadFail = (error, file) => {
    setReadFileData(prevReadFiles => [...prevReadFiles, {
      loadError: error,
      fileName: file.name,
      loadResult: 'danger'
    }]);
  };

  const handleDropRejected = fileRejections => {
    if (fileRejections.length === 1) {
      setModalText(`${fileRejections[0].file.name} is not an accepted file type`);
    } else {
      const rejectedMessages = fileRejections.reduce((acc, fileRejection) => acc += `${fileRejection.file.name}, `, '');
      setModalText(`${rejectedMessages} are not accepted file types`);
    }
  };

  const successfullyReadFileCount = readFileData.filter(fileData => fileData.loadResult === 'success').length;

  return (
    <>
      <MultipleFileUpload onFileDrop={handleFileDrop} dropzoneProps={{ onDropRejected: handleDropRejected }} isHorizontal={isHorizontal}>
        <MultipleFileUploadMain titleText="Drag and drop files here" titleTextSeparator="or" />
        {showStatus && (
          <MultipleFileUploadStatus
            statusToggleText={`${successfullyReadFileCount} of ${currentFiles.length} files uploaded`}
            statusToggleIcon={statusIcon}
          >
            {currentFiles.map(file => (
              <MultipleFileUploadStatusItem
                file={file}
                key={file.name}
                onClearClick={() => onClearClick(file.name)}
                onReadSuccess={handleReadSuccess}
                onReadFail={handleReadFail}
              />
            ))}
          </MultipleFileUploadStatus>
        )}
        <Modal isOpen={!!modalText} title="Unsupported file" titleIconVariant="warning" showClose aria-label="unsupported file upload attempted" onClose={() => setModalText('')}>
          {modalText}
        </Modal>
      </MultipleFileUpload>
    </>
  );
};
