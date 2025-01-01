import React from 'react';

function Notstarted({ progress}) {
  const status = "Not Started";
  
  return (
    <div className="bg-teal-60 rounded-lg ">
      <div className="flex items-center justify-between mb-2">
        <span className="text-white font-medium">{status}</span>
        
        {/* <span className="text-white">{Math.round(progress)}</span> */}
      </div>
      
      <div className="w-full bg-rounded-full h-2.5">
        <div 
          className="bg-[#fb647f] h-[500%] rounded transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Notstarted;