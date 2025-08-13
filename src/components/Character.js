// src/components/Character.js
import React from 'react';

const Character = React.forwardRef(({ position, direction, isJumping, isMoving }, ref) => {
  return (


    <div
      ref={ref}
      className={`character-3d-container ${isMoving ? 'moving' : ''} ${isJumping ? 'jumping' : ''}`}
      style={{
        left: position.x - 30,
        top: position.y - 40,
        transform: `rotateZ(${direction}rad)`,
        transition: isJumping ? 'none' : 'left 0.1s linear, top 0.1s linear'
      }}
    >
      {/* 3D Character Model */}
      <div className="character-3d">
        {/* Head */}
        <div className="character-head-3d">
          <div className="face front">
            <div className="character-eyes">
              <div className="eye"></div>
              <div className="eye"></div>
            </div>
          </div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>

        {/* Body */}
        <div className="character-body-3d">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>

        {/* Arms */}
        <div className="character-arm-3d left-arm">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>

        <div className="character-arm-3d right-arm">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>

        {/* Legs */}
        <div className="character-leg-3d left-leg">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>

        <div className="character-leg-3d right-leg">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>
      </div>

      {/* Shadow */}
      <div className="character-shadow"></div>
    </div>
  );
});

export default Character;