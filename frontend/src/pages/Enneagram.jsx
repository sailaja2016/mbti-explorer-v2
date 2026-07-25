import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Quiz.css'

export default function Enneagram() {
  const [answers, setAnswers] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const questionsPerPage = 10
  const totalPages = 3

  const questions = [
    { id: 1, text: "I have a strong sense of right and wrong" },
    { id: 2, text: "I enjoy helping others and being needed" },
    { id: 3, text: "I am driven by success and achievement" },
    { id: 4, text: "I feel things deeply and value authenticity" },
    { id: 5, text: "I observe carefully before acting" },
    { id: 6, text: "I worry about potential problems and safety" },
    { id: 7, text: "I love adventure and new experiences" },
    { id: 8, text: "I am assertive and like to be in control" },
    { id: 9, text: "I prefer peace and harmony over conflict" },
    { id: 10, text: "I am critical of myself and others" },
    { id: 11, text: "I prioritize other people's needs over my own" },
    { id: 12, text: "I care deeply about my public image" },
    { id: 13, text: "I feel unique and different from others" },
    { id: 14, text: "I prefer observation to participation" },
    { id: 15, text: "I plan carefully for the future" },
    { id: 16, text: "I seek excitement and stimulation" },
    { id: 17, text: "I am straightforward and direct" },
    { id: 18, text: "I go along with others to avoid conflict" },
    { id: 19, text: "I am self-critical and perfectionist" },
    { id: 20, text: "I am nurturing and supportive to others" },
    { id: 21, text: "I am image-conscious and goal-oriented" },
    { id: 22, text: "I tend toward melancholy and introspection" },
    { id: 23, text: "I am withdrawn and need alone time" },
    { id: 24, text: "I am skeptical and cautious" },
    { id: 25, text: "I love excitement and variety" },
    { id: 26, text: "I am powerful and commanding" },
    { id: 27, text: "I go with the flow" },
    { id: 28, text: "I am hard on myself" },
    { id: 29, text: "I want to be appreciated" },
    { id: 30, text: "I seek happiness and avoid pain" },
  ]

  const startIdx = (currentPage - 1) * questionsPerPage
  const currentQuestions = questions.slice(startIdx, startIdx + questionsPerPage)

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleFinish = () => {
  // Simple scoring: average all answers
  const avgScore = Object.values(answers).reduce((a, b) => a + b, 0) / Object.keys(answers).length
  
  // Determine type based on questions (simplified - you can make this more sophisticated)
  // For now, we'll use a basic mapping
  let typeNum = Math.ceil(avgScore * 1.8) // Converts 1-5 scale to 1-9
  if (typeNum > 9) typeNum = 9
  if (typeNum < 1) typeNum = 1
  
  navigate(`/enneagram-results?type=type${typeNum}`)
}

  return (
    <main className="quiz-container">
      <div className="container">
        <div className="card">
          <h2>Enneagram Test</h2>
          <p>Question {startIdx + 1} - {Math.min(startIdx + questionsPerPage, questions.length)} of {questions.length}</p>
          
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(startIdx / questions.length) * 100}%` }}></div>
          </div>

          <div className="questions-list">
            {currentQuestions.map(q => (
              <div key={q.id} className="question-item">
                <p className="question-text">{q.text}</p>
                <div className="likert-scale">
                  <div className="likert-options">
                    {[
                      { val: 1, label: 'Strongly\nDisagree' },
                      { val: 2, label: 'Disagree' },
                      { val: 3, label: 'Neutral' },
                      { val: 4, label: 'Agree' },
                      { val: 5, label: 'Strongly\nAgree' }
                    ].map(option => (
                      <label key={option.val} className="likert-option">
                        <input
                          type="radio"
                          name={`q${q.id}`}
                          value={option.val}
                          checked={answers[q.id] === option.val}
                          onChange={() => handleAnswer(q.id, option.val)}
                        />
                        <span className="radio-circle"></span>
                        <span className="likert-option-label">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="navigation">
            <button className="button btn-secondary" onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </button>
            <span className="page-counter">{currentPage} / {totalPages}</span>
            {currentPage === totalPages ? (
              <button className="button btn-primary" onClick={handleFinish}>
                See Results
              </button>
            ) : (
              <button className="button btn-primary" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}