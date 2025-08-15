import React from 'react';

const Gem = ({ id, left, top, isVisible, onClick }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="gem"
      style={{ 
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`
      }}
      onClick={onClick}
      onTouchStart={onClick}
    >
      {/* Gem image or content */}
    </div>
  );
};

export default Gem;