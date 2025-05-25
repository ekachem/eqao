// src/App.js
import React, { useState } from 'react';
import './App.css';

function generatePlaceValueQuestion() {
  const number = Math.floor(100 + Math.random() * 900); // Random 3-digit number
  const digits = number.toString().split('');
  const index = Math.floor(Math.random() * 3);
  const digit = digits[index];
  const placeValues = [100, 10, 1];
  const value = digit * placeValues[index];
  const options = shuffle([
    value,
    value + placeValues[index],
    value - placeValues[index],
    parseInt(digit)
  ]);

  return {
    question: `What is the value of the digit ${digit} in ${number}?`,
    options,
    correctAnswer: value
  };
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function App() {
  const [questionData, setQuestionData] = useState(generatePlaceValueQuestion());
  const [result, setResult] = useState(null);

  function handleAnswer(option) {
    const isCorrect = option === questionData.correctAnswer;
    setResult(isCorrect ? '✅ Correct!' : '❌ Try Again');
  }

  function nextQuestion() {
    setQuestionData(generatePlaceValueQuestion());
    setResult(null);
  }

  return (
    <div className="app">
      <h1>Grade 3 EQAO Math Practice</h1>
      <div className="question-box">
        <h2>{questionData.question}</h2>
        {questionData.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleAnswer(opt)} className="option-btn">
            {opt}
          </button>
        ))}
        {result && <p className="result">{result}</p>}
        <button onClick={nextQuestion} className="next-btn">Next Question</button>
      </div>
    </div>
  );
}

export default App;

