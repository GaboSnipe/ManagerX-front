import React, { useEffect, useState } from "react";
import useAuthCheck from '../utils/hooks/useAuthCheck';
import { FileViewer } from "../components";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  // const loading = useAuthCheck();
  const [token, setToken] = useState('');
  const [tokenType, setTokenType] = useState('');
  const [expiresIn, setExpiresIn] = useState('');
  const [scope, setScope] = useState('');
  
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    setToken(params.get('access_token') || '');
    setTokenType(params.get('token_type') || '');
    setExpiresIn(params.get('expires_in') || '');
    setScope(params.get('scope') || '');
  }, []);
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