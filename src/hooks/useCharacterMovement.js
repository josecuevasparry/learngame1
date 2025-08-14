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
  
  // Handle game world clicks and touches
  const handleGameWorldClick = useCallback((event) => {
    // Prevent default behavior
    event.preventDefault();
    
    // Extract coordinates from either mouse or touch event
    let clientX, clientY;
    
    if (event.touches && event.touches.length > 0) {
      // Touch event
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else if (event.changedTouches && event.changedTouches.length > 0) {
      // Touch end event
      clientX = event.changedTouches[0].clientX;
      clientY = event.changedTouches[0].clientY;
    } else {
      // Mouse event
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    // Validate coordinates
    if (typeof clientX !== 'number' || typeof clientY !== 'number' || 
        isNaN(clientX) || isNaN(clientY)) {
      console.error('Invalid coordinates:', { clientX, clientY, event });
      return;
    }
    
    // Check if click is within the game world (not on banner)
    const banner = document.querySelector('.top-banner');
    const bannerHeight = banner ? banner.offsetHeight : 70; // Fixed banner height
    
    if (clientY < bannerHeight) {
      return; // Don't move if clicking on banner
    }
    
    setTargetPosition({ x: clientX, y: clientY });
    setIsMoving(true);
  }, []);
  
  // Game loop for character movement
  useEffect(() => {
    let animationFrameId;
    
    const updatePosition = () => {
      if (targetPosition) {
        setCharacterPosition(prev => {
          // Validate previous position
          if (typeof prev.x !== 'number' || typeof prev.y !== 'number' || 
              isNaN(prev.x) || isNaN(prev.y)) {
            console.warn('Invalid previous position:', prev);
            return { x: 400, y: 300 }; // Reset to default
          }
          
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