import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import '../styles/CareerResults.css'

export default function CareerResults() {
  const location = useLocation()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const type = params.get('type') || determineType()
    fetchContent(type)
  }, [])

  const determineType = () => {
    return 'balanced'
  }

  const fetchContent = async (type) => {
    try {
      const res = await fetch('/career_content.json')
      const data = await res.json()
      setContent(data[type])
      setLoading(false)
    } catch (err) {
      console.error('Error:', err)
      setLoading(false)
    }
  }

  if (loading) return <div className="loading"><div className="loading-spinner"></div></div>
  if (!content) return <div>Type not found</div>

  return (
    <main className="career-results-container">
      <div className="container">
        <Link to="/" className="back-button">← Back to Home</Link>
        
        <div className="result-header card">
          <div className="header-content">
            <div className="type-badge">
              <h3>{content.type}</h3>
            </div>
            <div className="header-text">
              <h1>{content.score}</h1>
              <p>{content.description}</p>
            </div>
          </div>
        </div>

        <div className="insights-grid">
          <div className="card">
            <h3>💪 Key Strengths</h3>
            <ul>
              {content.strengths?.map((s, i) => (
                <li key={i}>
                  <span className="checkmark">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3>🎯 Ideal Work Environment</h3>
            <ul>
              {content.idealEnvironment?.map((e, i) => (
                <li key={i}>
                  <span className="env-mark">★</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <h3>💼 Recommended Careers</h3>
          <div className="careers-grid">
            {content.careers?.map((career, i) => (
              <div key={i} className="career-item">
                {career}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>🚀 Development Areas</h3>
          <ul className="tips-list">
            {content.developmentAreas?.map((area, i) => (
              <li key={i}>{area}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>⭐ Skills to Highlight</h3>
          <div className="skills-list">
            {content.skillsToHighlight?.map((skill, i) => (
              <div key={i} className="skill-tag">
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <Link to="/" className="button btn-secondary">Home</Link>
          <Link to="/career" className="button btn-secondary">Retake Test</Link>
          <Link to="/test" className="button btn-primary">Take MBTI Test</Link>
        </div>
      </div>
    </main>
  )
}