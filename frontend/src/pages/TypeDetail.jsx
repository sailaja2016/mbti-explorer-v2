import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/TypeDetail.css'

export default function TypeDetail() {
  const { type } = useParams()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContent()
  }, [type])

  const fetchContent = async () => {
    try {
      const res = await fetch('/personality_content.json')
      const data = await res.json()
      setContent(data[type.toUpperCase()])
      setLoading(false)
    } catch (err) {
      console.error('Error:', err)
      setLoading(false)
    }
  }

  if (loading) return <div className="loading"><div className="loading-spinner"></div></div>
  if (!content) return <div>Type not found</div>

  return (
    <main className="type-detail-container">
      <div className="container">
        <Link to="/all-types" className="back-button">← Back to All Types</Link>
        
        <div className="detail-header card">
          <div className="header-content">
            <div className="header-image">
              <img src={`/images/${type.toLowerCase()}.jpg`} alt={type} />
            </div>
            <div className="header-text">
              <h1>{type}</h1>
              <h2>{content.nickname}</h2>
              <p>{content.description}</p>
            </div>
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
            {content.relationshipsTips?.map((tip, i) => (
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
          <Link to="/all-types" className="button btn-secondary">All Types</Link>
          <Link to="/test" className="button btn-primary">Take Test</Link>
        </div>
      </div>
    </main>
  )
}