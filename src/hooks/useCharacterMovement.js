// src/hooks/useCharacterMovement.js
import { useState, useEffect, useRef, useCallback } from 'react';

export default function useCharacterMovement(speedMultiplier = 1) {
  const [characterPosition, setCharacterPosition] = useState({ x: 400, y: 300 });
  const [characterDirection, setCharacterDirection] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState(null);
  const characterRef = useRef(null);
  const moveSpeed = 5 * speedMultiplier;
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Handle game world clicks
  const handleGameWorldClick = useCallback((e) => {
    // Check if click is within the game world (not on banner)
    const banner = document.querySelector('.top-banner');
    const bannerHeight = banner ? banner.offsetHeight : 70; // Fixed banner height
    
    if (e.clientY < bannerHeight) {
      return; // Don't move if clicking on banner
    }
    
    setTargetPosition({ x: e.clientX, y: e.clientY });
    setIsMoving(true);
  }, []);
  
  // Game loop for character movement
  useEffect(() => {
    let animationFrameId;
    
    const updatePosition = () => {
      if (targetPosition) {
        setCharacterPosition(prev => {
          const dx = targetPosition.x - prev.x;
          const dy = targetPosition.y - prev.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // If we're close enough to the target, stop moving
          if (distance < moveSpeed) {
            setIsMoving(false);
            setTargetPosition(null);
            return { x: targetPosition.x, y: targetPosition.y };
          }
          
          // Calculate movement vector
          const moveX = (dx / distance) * moveSpeed;
          const moveY = (dy / distance) * moveSpeed;
          
          // Calculate direction (angle in radians)
          const newDirection = Math.atan2(dy, dx);
          setCharacterDirection(newDirection);
          
          // Calculate new position with boundary checks
          let newX = prev.x + moveX;
          let newY = prev.y + moveY;
          
          // Boundary checks (keep character within viewport)
          const banner = document.querySelector('.top-banner');
          const bannerHeight = banner ? banner.offsetHeight : 70; // Fixed banner height
          newX = Math.max(30, Math.min(window.innerWidth - 30, newX));
          newY = Math.max(bannerHeight + 30, Math.min(window.innerHeight - 30, newY));
          
          // Return new position
          return { x: newX, y: newY };
        });
      }
      
      animationFrameId = requestAnimationFrame(updatePosition);
    };
    
    animationFrameId = requestAnimationFrame(updatePosition);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPosition, moveSpeed]);
  
  return {
    characterPosition,
    characterDirection,
    isMoving,
    characterRef,
    mousePosition,
    handleGameWorldClick
  };
}