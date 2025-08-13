// src/hooks/useGameLogic.js
import { useState, useEffect, useCallback } from 'react';
import gameQuestions from '../data/gameQuestions';
import sceneBackgrounds from '../data/sceneBackgrounds';

export default function useGameLogic() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeClues, setActiveClues] = useState([]);
  const [nearbyClue, setNearbyClue] = useState(null);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  
  const handleAnswer = useCallback((isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 10);
      setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
    setCurrentQuestion(null);
  }, [currentQuestion]);
  
  const checkLevelComplete = useCallback(() => {
    const levelQuestions = gameQuestions[`level${currentLevel}`];
    return levelQuestions.every(q => answeredQuestions.includes(q.id));
  }, [currentLevel, answeredQuestions]);
  
  const nextLevel = useCallback(() => {
    if (currentLevel < 5) {
      setCurrentLevel(prev => prev + 1);
      setAnsweredQuestions([]);
      setShowLevelComplete(false);
    }
  }, [currentLevel]);
  
  useEffect(() => {
    if (checkLevelComplete()) {
      setShowLevelComplete(true);
      setTimeout(() => {
        if (currentLevel < 5) {
          nextLevel();
        }
      }, 3000);
    }
  }, [answeredQuestions, currentLevel, checkLevelComplete, nextLevel]);
  
  const getLevelQuestions = useCallback(() => {
    return gameQuestions[`level${currentLevel}`] || [];
  }, [currentLevel]);
  
  const getSceneBackground = useCallback(() => {
    return sceneBackgrounds[`level${currentLevel}`];
  }, [currentLevel]);
  
  return {
    currentLevel,
    score,
    currentQuestion,
    answeredQuestions,
    showSuccess,
    activeClues,
    nearbyClue,
    showLevelComplete,
    setActiveClues,
    setNearbyClue,
    setCurrentQuestion,
    handleAnswer,
    checkLevelComplete,
    getLevelQuestions,
    getSceneBackground
  };
}