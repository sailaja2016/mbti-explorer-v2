import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Quiz.css'

export default function Quiz({ onResults }) {
  const [answers, setAnswers] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const questionsPerPage = 5
  const totalPages = 12

  const questions = [
    { id: 1, text: "I feel energized when I'm around other people." },
    { id: 2, text: "I prefer to focus on the present moment rather than future possibilities." },
    { id: 3, text: "I make decisions based on logical analysis rather than personal values." },
    { id: 4, text: "I like to plan ahead and organize my work." },
    { id: 5, text: "I enjoy small, intimate gatherings more than large social events." },
    { id: 6, text: "I notice patterns and see connections others might miss." },
    { id: 7, text: "I consider how my decisions will affect others' feelings." },
    { id: 8, text: "I prefer having a structured routine over spontaneous activities." },
    { id: 9, text: "I am comfortable being the center of attention." },
    { id: 10, text: "I trust my gut instincts more than concrete facts." },
    { id: 11, text: "Harmony and cooperation are more important to me than winning." },
    { id: 12, text: "I feel more comfortable with plans than with improvisation." },
    { id: 13, text: "I find it easy to initiate conversations with strangers." },
    { id: 14, text: "I focus on practical, real-world applications." },
    { id: 15, text: "I believe it's important to be objective and fair." },
    { id: 16, text: "I like to have clear deadlines and structure." },
    { id: 17, text: "I get drained by extensive social interaction." },
    { id: 18, text: "I prefer tried-and-true methods over experimenting with new approaches." },
    { id: 19, text: "I am influenced by my personal values in making decisions." },
    { id: 20, text: "I prefer flexibility and adapting to new situations." },
    { id: 21, text: "I enjoy meeting new people and making new friends." },
    { id: 22, text: "I focus on details and facts rather than abstract concepts." },
    { id: 23, text: "I am more focused on logic than on people's feelings." },
    { id: 24, text: "I prefer having definite plans rather than leaving things open-ended." },
    { id: 25, text: "I recharge my energy through social interaction." },
    { id: 26, text: "I see possibilities and connections in abstract ideas." },
    { id: 27, text: "I prioritize maintaining relationships over objective truth." },
    { id: 28, text: "I like having closure and definite answers." },
    { id: 29, text: "I am confident speaking in front of groups." },
    { id: 30, text: "I trust my instincts and intuition." },
    { id: 31, text: "I weigh pros and cons objectively before deciding." },
    { id: 32, text: "I prefer knowing what to expect rather than surprises." },
    { id: 33, text: "I am outgoing and sociable." },
    { id: 34, text: "I focus on the big picture rather than small details." },
    { id: 35, text: "I make decisions based on how they'll affect people." },
    { id: 36, text: "I enjoy spontaneity and going with the flow." },
    { id: 37, text: "I prefer working alone to working in teams." },
    { id: 38, text: "I focus on concrete facts and proven information." },
    { id: 39, text: "I think it's important to be logical and consistent." },
    { id: 40, text: "I like having a clear plan for my future." },
    { id: 41, text: "I seek out social activities and gatherings." },
    { id: 42, text: "I often daydream about what could be possible." },
    { id: 43, text: "I consider the impact on people before making decisions." },
    { id: 44, text: "I feel comfortable with uncertainty and ambiguity." },
    { id: 45, text: "I find social interactions energizing rather than draining." },
    { id: 46, text: "I prefer information that's practical and useful." },
    { id: 47, text: "I value fairness and consistency over personal loyalty." },
    { id: 48, text: "I prefer to have control and structure in my life." },
    { id: 49, text: "I am skilled at making others feel comfortable." },
    { id: 50, text: "I often see things differently than most people." },
    { id: 51, text: "I care about how decisions affect people emotionally." },
    { id: 52, text: "I like to keep my options open." },
    { id: 53, text: "I am energized by social interaction." },
    { id: 54, text: "I trust information I can see and verify." },
    { id: 55, text: "I approach problems objectively and analytically." },
    { id: 56, text: "I function better with structure and organization." },
    { id: 57, text: "I enjoy being the life of the party." },
    { id: 58, text: "I see hidden meanings and deeper possibilities." },
    { id: 59, text: "I decide based on my values rather than pure logic." },
    { id: 60, text: "I like having everything planned out." },
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
    const mind_score = (
      (answers[1] || 0) + (answers[9] || 0) + (answers[13] || 0) + 
      (answers[21] || 0) + (answers[25] || 0) + (answers[29] || 0) + 
      (answers[33] || 0) + (answers[37] || 0) + (answers[41] || 0) + 
      (answers[45] || 0) + (answers[49] || 0) + (answers[53] || 0) + 
      (answers[57] || 0)
    ) / 13

    const energy_score = (
      (answers[2] || 0) + (answers[6] || 0) + (answers[10] || 0) + 
      (answers[14] || 0) + (answers[18] || 0) + (answers[22] || 0) + 
      (answers[26] || 0) + (answers[30] || 0) + (answers[34] || 0) + 
      (answers[38] || 0) + (answers[42] || 0) + (answers[46] || 0) + 
      (answers[50] || 0) + (answers[54] || 0) + (answers[58] || 0)
    ) / 15

    const nature_score = (
      (answers[3] || 0) + (answers[7] || 0) + (answers[11] || 0) + 
      (answers[15] || 0) + (answers[19] || 0) + (answers[23] || 0) + 
      (answers[27] || 0) + (answers[31] || 0) + (answers[35] || 0) + 
      (answers[39] || 0) + (answers[43] || 0) + (answers[47] || 0) + 
      (answers[51] || 0) + (answers[55] || 0) + (answers[59] || 0)
    ) / 15

    const tactics_score = (
      (answers[4] || 0) + (answers[8] || 0) + (answers[12] || 0) + 
      (answers[16] || 0) + (answers[20] || 0) + (answers[24] || 0) + 
      (answers[28] || 0) + (answers[32] || 0) + (answers[36] || 0) + 
      (answers[40] || 0) + (answers[44] || 0) + (answers[48] || 0) + 
      (answers[52] || 0) + (answers[56] || 0) + (answers[60] || 0)
    ) / 15

    const mind = mind_score > 3 ? 'E' : 'I'
    const energy = energy_score > 3 ? 'N' : 'S'
    const nature = nature_score > 3 ? 'T' : 'F'
    const tactics = tactics_score > 3 ? 'J' : 'P'

    const mbti_type = mind + energy + nature + tactics

    const result = {
      type: mbti_type,
      traits: {
        mind: { label: mind, percentage: Math.round(((mind_score - 1) / 4) * 100) },
        energy: { label: energy, percentage: Math.round(((energy_score - 1) / 4) * 100) },
        nature: { label: nature, percentage: Math.round(((nature_score - 1) / 4) * 100) },
        tactics: { label: tactics, percentage: Math.round(((tactics_score - 1) / 4) * 100) },
      }
    }

    onResults(result)
    navigate('/results')
  }

  return (
    <main className="quiz-container">
      <div className="container">
        <div className="card">
          <h2>MBTI Personality Test</h2>
          <p>Question {startIdx + 1} - {Math.min(startIdx + questionsPerPage, questions.length)} of {questions.length}</p>
          
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(startIdx / questions.length) * 100}%` }}></div>
          </div>

          <div className="questions-list">
            {currentQuestions.map(q => (
              <div key={q.id} className="question-item">
                <p className="question-text">{q.text}</p>
                <div className="likert-scale">
                  <div className="likert-label left">Strongly Disagree</div>
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
                  <div className="likert-label right">Strongly Agree</div>
                </div>
              </div>
            ))}
          </div>

          <div className="navigation">
            <button className="button btn-secondary" onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{currentPage} / {totalPages}</span>
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