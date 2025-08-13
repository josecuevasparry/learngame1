// src/components/Game.js
import React, { useEffect, useState, useRef, useMemo } from 'react';
import useGameLogic from '../hooks/useGameLogic';
import useCharacterMovement from '../hooks/useCharacterMovement';
import Character from './Character';
import Gem from './Gem';
import QuestionModal from './QuestionModal';
import HUD from './UI/HUD';
import LevelInfo from './UI/LevelInfo';
import CharacterInfo from './UI/CharacterInfo';
import fanfareSound from './fanfare.mp3';
import logo from './images/logo.png'; // Import the logo

function Game() {
  const gameLogic = useGameLogic();
  const characterMovement = useCharacterMovement(2.5);
  const gameWorldRef = useRef(null);
  const fanfareRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [gameWorldDimensions, setGameWorldDimensions] = useState({ width: 0, height: 0 });
  const [clickPosition, setClickPosition] = useState(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  
  // Memoize level questions to prevent unnecessary re-renders
  const levelQuestions = useMemo(() => gameLogic.getLevelQuestions(), [gameLogic.currentLevel]);
  
  // State for tracking discovered and answered questions
  const [discoveredClues, setDiscoveredClues] = useState([]);
  
  // Check if mobile and update game world dimensions
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Update game world dimensions - use fixed banner height of 70px
      setGameWorldDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 70
      });
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Reset discovered clues when level changes
  useEffect(() => {
    setDiscoveredClues([]);
    console.log("Level changed, resetting discovered clues");
  }, [gameLogic.currentLevel]);
  
  // Initialize audio elements
  useEffect(() => {
    fanfareRef.current = new Audio(fanfareSound);
    return () => {
      if (fanfareRef.current) {
        fanfareRef.current.pause();
        fanfareRef.current = null;
      }
    };
  }, []);
  
  // Play fanfare when all levels are completed
  useEffect(() => {
    if (gameLogic.showLevelComplete && gameLogic.currentLevel > 1) {
      if (fanfareRef.current) {
        fanfareRef.current.currentTime = 0;
        fanfareRef.current.play().catch(e => console.log("Fanfare play failed:", e));
      }
    }
  }, [gameLogic.showLevelComplete, gameLogic.currentLevel]);
  
  // Update clue discovery and activation based on player proximity
  useEffect(() => {
    const newDiscoveredClues = [...discoveredClues];
    const newActiveClues = [];
    let nearestClue = null;
    let minDistance = Infinity;
    
    levelQuestions.forEach(question => {
      // Skip if already answered
      if (gameLogic.answeredQuestions.includes(question.id)) return;
      
      // Convert gem position from percentage to pixels
      const gemPositionInPixels = {
        x: (question.position.x / 100) * gameWorldDimensions.width,
        y: (question.position.y / 100) * gameWorldDimensions.height
      };
      
      const distance = Math.sqrt(
        Math.pow(characterMovement.characterPosition.x - gemPositionInPixels.x, 2) + 
        Math.pow(characterMovement.characterPosition.y - gemPositionInPixels.y, 2)
      );
      
      // Discovery radius - when player gets close to a clue
      if (distance < 150) { 
        if (!discoveredClues.includes(question.id)) {
          newDiscoveredClues.push(question.id);
          console.log("Discovered new clue:", question.id, "Distance:", distance);
        }
      }
      
      // Activation radius - when player is very close to a clue
      if (distance < 80 && discoveredClues.includes(question.id)) { 
        newActiveClues.push(question.id);
        if (distance < minDistance) {
          minDistance = distance;
          nearestClue = question;
        }
      }
    });
    
    // Update discovered clues state if changed
    if (newDiscoveredClues.length !== discoveredClues.length) {
      setDiscoveredClues(newDiscoveredClues);
      console.log("Updated discovered clues:", newDiscoveredClues);
    }
    
    // Update active clues and nearest clue for visual feedback
    gameLogic.setActiveClues(newActiveClues);
    gameLogic.setNearbyClue(nearestClue);
  }, [
    characterMovement.characterPosition, 
    gameLogic.answeredQuestions, 
    gameLogic.currentLevel,
    discoveredClues,
    levelQuestions,
    gameWorldDimensions,
    gameLogic.setActiveClues,
    gameLogic.setNearbyClue
  ]);
  
  // Handle gem click to open question
  const handleGemClick = (question) => {
    // Only open question if not already answered and discovered
    if (!gameLogic.answeredQuestions.includes(question.id) && 
        discoveredClues.includes(question.id)) {
      console.log("Opening question for gem:", question.id);
      gameLogic.setCurrentQuestion(question);
    }
  };
  
  // Handle closing the question modal without answering
  const handleCloseQuestion = () => {
    console.log("Closing question modal");
    gameLogic.setCurrentQuestion(null);
  };
  
  // Handle click events and prevent clicks on banner
  const handleGameWorldClick = (e) => {
    // Check if click is on the banner
    const banner = document.querySelector('.top-banner');
    if (banner && banner.contains(e.target)) {
      return; // Don't process clicks on the banner
    }
    
    // Set click position for accurate indicator
    const rect = gameWorldRef.current.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Clear click position after animation
    setTimeout(() => setClickPosition(null), 1000);
    
    // Process normal game world click
    characterMovement.handleGameWorldClick(e);
  };
  
  // Handle touch events for mobile
  const handleGameWorldTouch = (e) => {
    // Check if touch is on the banner
    const banner = document.querySelector('.top-banner');
    if (banner && banner.contains(e.target)) {
      return; // Don't process touches on the banner
    }
    
    // Set click position for accurate indicator
    const rect = gameWorldRef.current.getBoundingClientRect();
    const touch = e.touches[0] || e.changedTouches[0];
    setClickPosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    
    // Clear click position after animation
    setTimeout(() => setClickPosition(null), 1000);
    
    // Process normal game world touch
    characterMovement.handleGameWorldClick(e);
  };
  
  // Toggle debug panel
  const toggleDebugPanel = () => {
    setShowDebugPanel(!showDebugPanel);
  };
  
  // Check if a gem should be visible
  const shouldShowGem = (question) => {
    const isAnswered = gameLogic.answeredQuestions.includes(question.id);
    const isDiscovered = discoveredClues.includes(question.id);
    const shouldShow = !isAnswered && isDiscovered;
    console.log(`Gem ${question.id}: answered=${isAnswered}, discovered=${isDiscovered}, show=${shouldShow}`);
    return shouldShow;
  };
  
  return (
    <div className="game-container">
      {/* Top blue banner with logo and HUD */}
      <div className="top-banner">
        <div className="logo-container">
          <img src={logo} alt="LearnGame Logo" className="logo" />
        </div>
        <div className="hud-container">
          <HUD 
            score={gameLogic.score}
            characterPosition={characterMovement.characterPosition}
            isMoving={characterMovement.isMoving}
          />
        </div>
      </div>
      
      <div 
        className="game-world"
        style={{ backgroundImage: `url(${gameLogic.getSceneBackground()})` }}
        ref={gameWorldRef}
        onClick={handleGameWorldClick}
        onTouchStart={handleGameWorldTouch}
      >
        {/* Character */}
        <Character
          position={characterMovement.characterPosition}
          direction={characterMovement.characterDirection}
          isMoving={characterMovement.isMoving}
          ref={characterMovement.characterRef}
        />
        
        {/* Gems - Only render if discovered and not answered */}
        {levelQuestions.map(question => (
          shouldShowGem(question) && (
            <Gem
              key={question.id}
              question={question}
              isActive={gameLogic.activeClues.includes(question.id)}
              isMobile={isMobile}
              gameWorldDimensions={gameWorldDimensions}
              onClick={handleGemClick}
            />
          )
        ))}
      </div>
      
      <div className="ui-overlay">
        <LevelInfo 
          currentLevel={gameLogic.currentLevel}
          answeredQuestions={gameLogic.answeredQuestions}
          levelQuestions={levelQuestions.length}
          checkLevelComplete={gameLogic.checkLevelComplete}
        />
        
        <CharacterInfo />
        
        {/* Debug Toggle Button */}
        <button 
          onClick={toggleDebugPanel}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1001,
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '5px 10px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          {showDebugPanel ? 'Hide Debug' : 'Show Debug'}
        </button>
        
        {/* Debug Panel - Only shown when toggled */}
        {showDebugPanel && (
          <div style={{
            position: 'absolute', 
            top: '40px',  // Position below the toggle button
            right: '10px',  
            background: 'rgba(0,0,0,0.7)', 
            color: 'white', 
            padding: '10px', 
            fontSize: '12px', 
            zIndex: 1000,
            borderRadius: '5px',
            maxWidth: '200px'
          }}>
            <div>Level: {gameLogic.currentLevel}</div>
            <div>Total Questions: {levelQuestions.length}</div>
            <div>Discovered: {discoveredClues.length}</div>
            <div>Answered: {gameLogic.answeredQuestions.length}</div>
            <div>Active: {gameLogic.activeClues.length}</div>
            <div>Nearby: {gameLogic.nearbyClue ? gameLogic.nearbyClue.id : 'None'}</div>
            <div>Char Pos: ({Math.round(characterMovement.characterPosition.x)}, {Math.round(characterMovement.characterPosition.y)})</div>
            <div>Game World: ({gameWorldDimensions.width}x{gameWorldDimensions.height})</div>
          </div>
        )}
        
        {/* Discovery indicator when player is near an undiscovered gem */}
        {gameLogic.nearbyClue && !discoveredClues.includes(gameLogic.nearbyClue.id) && (
          <div className="discovery-hint">
            <span className="material-icons">search</span> Something nearby...
          </div>
        )}
        
        {/* Interaction hint when near a discovered gem */}
        {gameLogic.nearbyClue && discoveredClues.includes(gameLogic.nearbyClue.id) && (
          <div className="interaction-hint">
            <span className="material-icons">touch_app</span> Click the gem to answer
          </div>
        )}
        
        {/* Click indicator - positioned accurately at click/touch location */}
        {clickPosition && (
          <div 
            className="click-indicator"
            style={{
              left: clickPosition.x - 15,
              top: clickPosition.y - 15
            }}
          />
        )}
        
        {characterMovement.mousePosition.y > (isMobile ? 50 : 60) && (
          <div 
            className={`mouse-cursor ${characterMovement.isMoving ? 'moving' : ''}`}
            style={{
              left: characterMovement.mousePosition.x,
              top: characterMovement.mousePosition.y
            }}
          >
            <div className="crosshair horizontal"></div>
            <div className="crosshair vertical"></div>
          </div>
        )}
      </div>
      
      {/* Question Modal */}
      {gameLogic.currentQuestion && (
        <QuestionModal
          question={gameLogic.currentQuestion}
          onAnswer={(isCorrect) => {
            console.log("Question answered:", isCorrect);
            gameLogic.handleAnswer(isCorrect);
          }}
          onClose={handleCloseQuestion}
        />
      )}
      
      {/* Success Message */}
      {gameLogic.showSuccess && (
        <div className="success-message">
          <span className="material-icons">check_circle</span> Correct! Gem collected!
        </div>
      )}
      
      {/* Level Complete Message */}
      {gameLogic.showLevelComplete && (
        <div className="level-complete">
          <div><span className="material-icons">emoji_events</span> Level {gameLogic.currentLevel} Complete!</div>
          <div className="text-base mt-2">
            {gameLogic.currentLevel < 5 ? 'Preparing next level...' : 'Congratulations! You completed all levels!'}
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;