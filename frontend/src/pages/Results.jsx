import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Results.css'

export default function Results({ data }) {
  const [personality, setPersonality] = useState(null)
  const [content, setContent] = useState(null)

  useEffect(() => {
    if (data && data.type) {
      setPersonality(data)
      // Load comprehensive content
      fetch('/personality_content.json')
        .then(res => res.json())
        .then(json => setContent(json[data.type]))
    }
  }, [data])

  if (!data || !content) return <div>Loading...</div>

  return (
    <main className="results-container">
      <div className="container">
        <div className="result-header card">
          <h1>{data.type}</h1>
          <h2>{data.title || content.nickname}</h2>
          <p className="description">{content.description}</p>
        </div>

        <div className="traits-section card">
          <h2>Your Personality Traits</h2>
          <div className="traits-grid">
            {data.traits && Object.entries(data.traits).map(([key, value]) => (
              <div key={key} className="trait-bar">
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <div className="bar-container">
                  <div className="bar-fill" style={{ width: `${value.percentage}%` }}>
                    {value.percentage}%
                  </div>
                </div>
                <span>{value.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="insights-grid">
          <div className="card">
            <h3>💪 Strengths</h3>
            <ul>
              {content.strengths?.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="card">
            <h3>🌱 Growth Areas</h3>
            <ul>
              {content.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>
        </div>

        <div className="card">
          <h3>🎯 Ideal Careers</h3>
          <div className="careers-grid">
            {content.careers?.map((career, i) => (
              <div key={i} className="career-item">
                {career}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>💑 Relationship Tips</h3>
          <ul className="tips-list">
            {content.relationshipsTips?.map((tip, i) => (
              <li key={i}>
                <strong>•</strong> {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>🚀 Personal Growth Areas</h3>
          <ul className="tips-list">
            {content.growthAreas?.map((area, i) => (
              <li key={i}>
                <strong>•</strong> {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="action-buttons">
          <Link to="/" className="button btn-secondary">← Home</Link>
          <Link to="/all-types" className="button btn-secondary">Explore All Types</Link>
          <Link to="/test" className="button btn-primary">Retake Test</Link>
        </div>
      </div>
    </main>
  )
}