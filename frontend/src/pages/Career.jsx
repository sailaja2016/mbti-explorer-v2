import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Quiz.css'

export default function Career() {
  const [answers, setAnswers] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const questionsPerPage = 10
  const totalPages = 3

  const questions = [
    { id: 1, text: "I prefer working with people rather than alone" },
    { id: 2, text: "I enjoy routine and predictable work" },
    { id: 3, text: "I am comfortable with making quick decisions" },
    { id: 4, text: "I like to plan ahead and organize my work" },
    { id: 5, text: "I am motivated by helping others" },
    { id: 6, text: "I prefer creative and artistic work" },
    { id: 7, text: "I enjoy problem-solving and analysis" },
    { id: 8, text: "I like leadership roles and taking charge" },
    { id: 9, text: "I prefer stable, predictable income" },
    { id: 10, text: "I enjoy learning new skills constantly" },
    { id: 11, text: "I work best in a fast-paced environment" },
    { id: 12, text: "I prefer following established procedures" },
    { id: 13, text: "I am comfortable with taking risks" },
    { id: 14, text: "I value work-life balance highly" },
    { id: 15, text: "I like competitive environments" },
    { id: 16, text: "I prefer collaborative team environments" },
    { id: 17, text: "I am detail-oriented in my work" },
    { id: 18, text: "I see the big picture easily" },
    { id: 19, text: "I am motivated by financial rewards" },
    { id: 20, text: "I value meaningful work over money" },
    { id: 21, text: "I enjoy presenting ideas to others" },
    { id: 22, text: "I prefer working behind the scenes" },
    { id: 23, text: "I adapt easily to changes" },
    { id: 24, text: "I prefer stability in my career" },
    { id: 25, text: "I take initiative and suggest new ideas" },
    { id: 26, text: "I wait for clear instructions" },
    { id: 27, text: "I am organized and methodical" },
    { id: 28, text: "I am spontaneous in my approach" },
    { id: 29, text: "I enjoy mentoring others" },
    { id: 30, text: "I prefer individual contribution roles" },
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
  // Calculate which competency the user scored highest on
  const scores = {
    analytical: 0,
    creative: 0,
    interpersonal: 0,
    strategic: 0,
    technical: 0
  }

  // Simple scoring based on which questions they answered high on
  Object.entries(answers).forEach(([questionId, answer]) => {
    const qId = parseInt(questionId)
    if ([1, 9, 17].includes(qId)) scores.analytical += answer
    if ([6, 14, 22].includes(qId)) scores.creative += answer
    if ([2, 10, 16].includes(qId)) scores.interpersonal += answer
    if ([4, 12, 20].includes(qId)) scores.strategic += answer
    if ([3, 11, 19].includes(qId)) scores.technical += answer
  })

  // Find highest score
  let type = 'balanced'
  let maxScore = 0
  Object.entries(scores).forEach(([key, value]) => {
    if (value > maxScore) {
      maxScore = value
      type = key
    }
  })

  navigate(`/career-results?type=${type}`)
}

  return (
    <main className="quiz-container">
      <div className="container">
        <div className="card">
          <h2>Career Competency Test</h2>
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