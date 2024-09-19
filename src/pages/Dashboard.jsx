import React, { useState } from "react";
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { FileViewer } from "../components";
import { MultipleFileUploadBasic } from "../components/FileUploader"


const Dashboard = () => {
  const loading = useAuthCheck();
 
  return (
    <>
      <div className="min-h-full">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <FileViewer fileUuid={"6520e83a-d6ea-4af9-9a0c-e105d6146a3c"} />
          <div className="p-4">
          </div>
          <a href="https://tailwindcomponents.com/component/free-tailwind-css-advance-table-component">goto</a>


          <div className="">
                    <MultipleFileUploadBasic/>
                </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;