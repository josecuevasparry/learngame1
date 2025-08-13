import React from 'react';

function Controls() {
  return (
    <div className="controls bg-black bg-opacity-80 text-white p-4 rounded-lg backdrop-filter backdrop-blur-sm">
      <div className="font-bold mb-2">Controls:</div>
      <div className="flex items-center mb-1">
        <i className="fas fa-mouse-pointer mr-2"></i>
        <span>Mouse - Move character</span>
      </div>
      <div className="flex items-center">
        <i className="fas fa-gem mr-2"></i>
        <span>Find and collect gems</span>
      </div>
    </div>
  );
}

export default Controls;