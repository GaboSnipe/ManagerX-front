import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PDFViewer = ({ fileUrl }) => {
  return (
    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
      <div style={{ height: '750px' }}>
        <Viewer fileUrl={fileUrl} />
      </div>
    </Worker>
  );
};

export default PDFViewer;
