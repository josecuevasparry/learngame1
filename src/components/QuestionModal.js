import React, { useState, useRef, useEffect } from 'react';
// Import the sound files
import correctSound from './correct-sound.mp3';
import correctVoice from './correct-voice.mp3';

function QuestionModal({ question, onAnswer, onClose }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  
  // Create refs for audio elements
  const soundRef = useRef(null);
  const voiceRef = useRef(null);
  const recognitionRef = useRef(null);
  
  // Initialize audio elements and speech recognition
  useEffect(() => {
    soundRef.current = new Audio(correctSound);
    voiceRef.current = new Audio(correctVoice);
    
    // Check browser support for Web Speech API
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        const currentWord = question.word.toLowerCase();
        
        // Check if the spoken word matches the target word
        if (transcript === currentWord) {
          handlePronunciationResult(true);
        } else {
          handlePronunciationResult(false, transcript);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        handlePronunciationResult(false, null, 'Speech recognition error. Please try again.');
      };
    } else {
      setRecognitionSupported(false);
    }
    
    // Cleanup function
    return () => {
      if (soundRef.current) {
        soundRef.current.pause();
        soundRef.current = null;
      }
      if (voiceRef.current) {
        voiceRef.current.pause();
        voiceRef.current = null;
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
    // eslint-disable-next-line 
  }, [question.word]);
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const playCorrectSounds = () => {
    // Reset audio to beginning in case it was played before
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(e => console.log("Sound play failed:", e));
    }
    if (voiceRef.current) {
      voiceRef.current.currentTime = 0;
      voiceRef.current.play().catch(e => console.log("Voice play failed:", e));
    }
  };
  
  const speakText = (text) => {
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject('Speech synthesis not supported');
        return;
      }
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => {
        setAudioPlaying(true);
      };
      
      utterance.onend = () => {
        setAudioPlaying(false);
        resolve();
      };
      
      utterance.onerror = (event) => {
        setAudioPlaying(false);
        reject(event.error);
      };
      
      window.speechSynthesis.speak(utterance);
    });
  };
  
  const handleMultipleChoice = (index) => {
    if (showResult) return;
    setSelectedOption(index);
    const correct = index === question.correct;
    setIsCorrect(correct);
    setShowResult(true);
    
    // Play sounds if correct
    if (correct) {
      playCorrectSounds();
    }
    
    setTimeout(() => {
      onAnswer(correct);
    }, 1000);
  };
  
  const handleTextSubmit = () => {
    const correct = userAnswer.toLowerCase().trim() === question.answer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    
    // Play sounds if correct
    if (correct) {
      playCorrectSounds();
    }
    
    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };
  
  const handlePronunciation = () => {
    if (!recognitionRef.current || !recognitionSupported) {
      handlePronunciationResult(false, null, 'Speech recognition not supported in your browser.');
      return;
    }
    
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setIsRecording(false);
        handlePronunciationResult(false, null, 'Error starting recording. Please try again.');
      }
    } else {
      // Stop recording
      setIsRecording(false);
      recognitionRef.current.stop();
    }
  };
  
  const handlePronunciationResult = (correct, transcript = null, errorMessage = null) => {
    setIsRecording(false);
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      playCorrectSounds();
    }
    
    setTimeout(() => {
      onAnswer(correct);
    }, 1500);
  };
  
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple':
        return (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selectedOption === index ? (showResult ? (isCorrect ? 'correct' : 'incorrect') : 'selected') : ''}`}
                onClick={() => handleMultipleChoice(index)}
                disabled={showResult}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 'math':
      case 'word':
        return (
          <div className="text-center">
            <div className="audio-visualizer" style={{ display: audioPlaying ? 'flex' : 'none', justifyContent: 'center', margin: '10px 0' }}>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
              <div className="audio-bar"></div>
            </div>
            
            <input
              type="text"
              className="input-answer"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer..."
              disabled={showResult}
            />
            <button
              className="submit-btn"
              onClick={handleTextSubmit}
              disabled={showResult || !userAnswer.trim()}
            >
              Submit Answer
            </button>
          </div>
        );
      case 'pronunciation':
        return (
          <div className="text-center">
            <div className="word-display">
              <div className="current-word">{question.word}</div>
            </div>
            
            <div className="controls">
              <button 
                className="btn" 
                onClick={() => speakText(question.word)}
                disabled={audioPlaying}
              >
                <span className="material-icons">volume_up</span>
                Play Word
              </button>
              <button 
                className={`btn ${isRecording ? 'btn-error' : 'btn-secondary'}`}
                onClick={handlePronunciation}
                disabled={!recognitionSupported || showResult}
              >
                <span className="material-icons">{isRecording ? 'stop' : 'mic'}</span>
                {isRecording ? 'Stop Recording' : 'Record Pronunciation'}
              </button>
            </div>
            
            <div className="recording-indicator" style={{ display: isRecording ? 'flex' : 'none' }}>
              <div className="recording-dot"></div>
              <span>Recording...</span>
            </div>
            
            {!recognitionSupported && (
              <div className="browser-warning">
                <span className="material-icons" style={{ color: '#FF9800', verticalAlign: 'middle', marginRight: '8px' }}>warning</span>
                Your browser doesn't support the Web Speech API. Please use Chrome, Edge, or Safari for the best experience.
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="question-modal-backdrop" onClick={handleBackdropClick}>
      <div className="question-modal" onClick={(e) => e.stopPropagation()}>
        <div className="question-title">
          <span className="material-icons">
            {question.type === 'math' ? 'calculate' : 
             question.type === 'word' ? 'spellcheck' : 
             question.type === 'pronunciation' ? 'record_voice_over' : 
             'help'}
          </span>
          {question.type === 'math' ? 'Math Problem' :
           question.type === 'word' ? 'Word Challenge' :
           question.type === 'pronunciation' ? 'Pronunciation Practice' :
           'Multiple Choice'}
        </div>
        
        <div className="question-text">{question.question}</div>
        
        {renderQuestionContent()}
        
        {showResult && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-message">
              {isCorrect ? '✓ Correct!' : 
               question.type === 'pronunciation' ? '✗ Try again!' : 
               '✗ Try again next time!'}
            </div>
            <span className="material-icons" style={{ fontSize: '36px' }}>
              {isCorrect ? 'check_circle' : 'highlight_off'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionModal;