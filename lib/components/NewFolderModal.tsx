import React, { useRef } from "react";
import { useFileManager } from "../context";
import CommonModal from "./CommonModal";

interface INewFolderModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const NewFolderModal = (props: INewFolderModalProps) => {
  const { onCreateFolder } = useFileManager();
  const folderName = useRef<any>();

  const onConfirm = async (event) => {
    event.preventDefault();
  
    if (
      folderName &&
      folderName.current &&
      folderName.current.value &&
      folderName.current.value.length > 0 &&
      onCreateFolder
    ) {
      await onCreateFolder(folderName.current.value);
      props.onClose();

    }
  };
  

  return (
    <CommonModal title="ახალი ფოლდერის შექმნა" {...props}>
  <div>
    <form className="rfm-new-folder-modal-form" onSubmit={onConfirm}>
      <div>
        <input
          ref={folderName}
          type="text"
          className="rfm-new-folder-modal-input"
          placeholder="ფოლდერის შექმნა"
          required
        />
      </div>
      <button
        disabled={
          folderName &&
          folderName.current &&
          folderName.current.value &&
          folderName.current.value.length === 0
        }
        type="submit"
        className="rfm-new-folder-modal-btn bg-blue-500"
      >
        შექმნა
      </button>
    </form>
  </div>
</CommonModal>
  );
};

export default NewFolderModal;
