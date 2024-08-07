import React, {useEffect, useRef, useState} from 'react';
import useAuthCheck from '../utils/hooks/useAuthCheck';

const UserPage = () => {
  const loading = useAuthCheck();
  const items = ["REJECTED","DONE","IN PROGRESS","TO DO"]
  
  return (
<div className="App h-screen w-full flex items-center justify-center bg-[#fcfcfc] relative">
      <div className="content absolute top-full flex gap-5">
        
      </div>
    </div>
  );
};

export default UserPage;
