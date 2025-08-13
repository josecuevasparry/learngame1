import React from 'react';

function CharacterInfo() {
  return (
    <div hidden={true} className="character-info bg-black bg-opacity-80 text-white p-4 rounded-lg backdrop-filter backdrop-blur-sm">
      <div className="font-bold mb-1">Gem Hunter</div>
      <div className="flex items-center">
        <i className="fas fa-search mr-2"></i>
        <span>Exploring...</span>
      </div>
    </div>
  );
}

export default CharacterInfo;