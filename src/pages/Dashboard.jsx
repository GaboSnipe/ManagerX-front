import React from "react";
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { FileViewer } from "../components";

const Dashboard = () => {
  const loading = useAuthCheck();

  return (
    <>
      <div className="min-h-full">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* <FileViewer fileUrl={"https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf"}/> */}

                {/* my content */}
                <a href="https://tailwindcomponents.com/component/free-tailwind-css-advance-table-component">goto</a>
          </div>
      </div>
    </>
  );
}

export default Dashboard;