import { PDFViewer, ImageViewer, OfficeFileViewer } from "./components";

const FileViewer = ({ fileUrl }) => {
  const fileExtension = fileUrl.split('.').pop();

  switch (fileExtension) {
    case 'pdf':
      return <PDFViewer fileUrl={fileUrl} />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <ImageViewer imageUrl={fileUrl} />;
    case 'xlsx':
    case 'xls':
    case 'docx':
    case 'doc':
      return <OfficeFileViewer fileUrl={fileUrl} />;
    default:
      return <iframe src={fileUrl} title="file viewer" style={{ width: '100%', height: '750px', border: 'none' }} />;
  }
};

export default FileViewer;