import React from 'react';

const QuestionModal = ({ question, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{question}</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QuestionModal;