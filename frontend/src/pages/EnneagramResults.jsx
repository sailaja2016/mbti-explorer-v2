import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import '../styles/EnneagramResults.css'

export default function EnneagramResults() {
  const location = useLocation()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get enneagram type from location state
    const params = new URLSearchParams(location.search)
    const type = params.get('type') || determineType()

    fetchContent(type)
  }, [])

  const determineType = () => {
    // Default to type 1 if no type provided
    return 'type1'
  }

  const fetchContent = async (type) => {
    try {
      const res = await fetch('/enneagram_content.json')
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
    <main className="enneagram-results-container">
      <div className="container">
        <Link to="/" className="back-button">← Back to Home</Link>
        
        <div className="header-content">
  <div className="type-number">
    Type {content.number.split(' ')[1]}
  </div>
  <div className="header-text">
    <h1>{content.name}</h1>
    <h2>{content.nickname}</h2>
    <p>{content.description}</p>
  </div>
</div>

        <div className="insights-grid">
          <div className="card">
            <h3>💪 Strengths</h3>
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
            <h3>🌱 Growth Areas</h3>
            <ul>
              {content.weaknesses?.map((w, i) => (
                <li key={i}>
                  <span className="growth-mark">→</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <h3>🎯 Ideal Careers</h3>
          <div className="careers-grid">
            {content.careers?.map((career, i) => (
              <div key={i} className="career-item">
                <span className="career-icon">💼</span>
                {career}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>💑 Relationship Tips</h3>
          <ul className="tips-list">
            {content.relationshipTips?.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>🚀 Personal Growth Areas</h3>
          <ul className="tips-list">
            {content.growthAreas?.map((area, i) => (
              <li key={i}>{area}</li>
            ))}
          </ul>
        </div>

        <div className="action-buttons">
          <Link to="/" className="button btn-secondary">Home</Link>
          <Link to="/enneagram" className="button btn-secondary">Retake Test</Link>
          <Link to="/test" className="button btn-primary">Take MBTI Test</Link>
        </div>
      </div>
    </main>
  )
}