import React from "react";
import { useFileManager } from "../context";
import CommonModal from "./CommonModal";

interface IUploadFileModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const UploadFileModal = (props: IUploadFileModalProps) => {
  const { onUpload, uploadedFileData } = useFileManager();

  const onConfirm = async () => {
    if (onUpload && uploadedFileData) {
      await onUpload(uploadedFileData);
    }
  };

  return (
    <CommonModal title="ფაილის ატვირთვა" {...props}>
      <div>
        <h4 className="rfm-upload-file-modal-title">
          {/* Are you sure you want to upload the file? */}
          დარწმუნებული ხარ რომ გსურს ფაილის ატვირთვა?
        </h4>
        <div className="rfm-upload-file-modal-container">
          <button
            onClick={onConfirm}
            type="submit"
            className="bg-green-500 rfm-upload-file-modal-btn rfm-upload-file-modal-btn-confirm"
          >
            ატვირთვა
          </button>
          <button
            onClick={props.onClose}
            type="submit"
            className="bg-[rgba(210,031,040)] p-2 rounded-lg rfm-upload-file-modal-btn-cancel text-white"
            
          >
            გაუქმება
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default UploadFileModal;
