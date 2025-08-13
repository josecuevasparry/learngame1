// src/components/UI/HUD.js
import React from 'react';

function HUD({ score, characterPosition, isMoving }) {
  return (
    <div className="hud text-white">
      <div className="flex items-center">
        <i className="fas fa-star mr-2"></i>
        <h3>Score/Puntaje: {score}</h3>
      </div>
    </div>
  );
}

export default HUD;