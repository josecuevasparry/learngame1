import React from 'react';

function LevelInfo({ currentLevel, answeredQuestions, levelQuestions, checkLevelComplete }) {
  const isComplete = checkLevelComplete;
  
  return (
    <div hidden={true} className=" hidden level-info bg-black bg-opacity-80 text-white p-4 rounded-lg backdrop-filter backdrop-blur-sm text-center">
      <h3 className="text-xl font-bold mb-2">Level {currentLevel}</h3>
      <div className="mb-2">{answeredQuestions.length} / {levelQuestions} Gems already Found</div>
      {isComplete && (
        <div className="text-green-400 mt-2 hidden">
          <i className="fas fa-check mr-2"></i> Level Complete!
        </div>
      )}
    </div>
  );
}

export default LevelInfo;