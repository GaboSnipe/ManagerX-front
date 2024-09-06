import React, { useRef, useState } from "react";
import { useFileManager } from "../context";
import CommonModal from "./CommonModal";

interface INewFileModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const NewFileModal = (props: INewFileModalProps) => {
  const { onUpload } = useFileManager();
  const fileInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onConfirm = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile && onUpload) {
      await onUpload(selectedFile);
      props.onClose();
    }
  };

  return (
    <CommonModal title="Upload File" {...props}>
      <div>
        <form className="rfm-upload-file-modal-form mt-6">
          <div>
            <input
              type="file"
              id="custom-input"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                setSelectedFile(file ?? null);
              }}
              hidden
            />
            <label
              htmlFor="custom-input"
              className="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 text-sm font-semibold bg-pink-50 text-pink-700 hover:bg-pink-100 cursor-pointer">
              Choose file
            </label>
            <label className="text-sm text-slate-500">
              {selectedFile ? selectedFile.name : "No file selected"}
            </label>
          </div>
          <div className="rfm-upload-file-modal-container">
            <button
              onClick={onConfirm}
              type="submit"
              className="rfm-upload-file-modal-btn rfm-upload-file-modal-btn-confirm bg-green-500"
              disabled={!selectedFile}
            >
              Upload
            </button>
            <button
              onClick={props.onClose}
              type="button"
              className="bg-[rgba(210,031,040)] p-2 rounded-lg rfm-upload-file-modal-btn-cancel text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </CommonModal>
  );
};

export default NewFileModal;
