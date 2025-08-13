// src/components/Gem.js
import React from 'react';

const Gem = ({ question, isActive, isMobile, gameWorldDimensions, onClick }) => {
  // Calculate position based on game world dimensions
  const positionStyle = {
    left: `${question.position.x}%`,
    top: `${question.position.y}%`,
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    width: '50px',
    height: '50px',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 215, 0, 0.9)', // More visible gold
    borderRadius: '50%',
    boxShadow: '0 0 20px rgba(255, 215, 0, 0.9)',
    transition: 'all 0.3s ease',
    border: '2px solid rgba(255, 255, 255, 0.7)',
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up to game world
    console.log("Gem clicked:", question.id);
    onClick(question);
  };

  // Add active state styling
  if (isActive) {
    positionStyle.transform = 'translate(-50%, -50%) scale(1.3)';
    positionStyle.boxShadow = '0 0 30px rgba(255, 215, 0, 1)';
    positionStyle.backgroundColor = 'rgba(255, 215, 0, 1)';
  }

  // Debug: Log gem position and visibility
  console.log(`Rendering gem ${question.id} at position:`, question.position);

  return (
    <div 
      className="gem"
      style={positionStyle}
      onClick={handleClick}
    >
      <span className="material-icons" style={{ 
        color: '#8B4513', 
        fontSize: '30px',
        textShadow: '0 0 3px rgba(255, 255, 255, 0.8)'
      }}>diamond</span>
      {isActive && (
        <div className="collection-ring" style={{
          position: 'absolute',
          width: '70px',
          height: '70px',
          border: '3px solid rgba(255, 215, 0, 0.9)',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'pulse 1.5s infinite',
        }}></div>
      )}
    </div>
  );
};

export default Gem;