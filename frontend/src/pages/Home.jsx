import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/Home.css'

export default function Home() {
  const navigate = useNavigate()
  return (
    <main className="home-container">
      <div className="container">
        <div className="hero-section">
          <h1>🧠 MBTI Explorer</h1>
          <p className="subtitle">Discover Your Personality Type</p>
          <button className="button btn-primary btn-large" onClick={() => navigate('/test')}>
            Start MBTI Test →
          </button>
        </div>
        <div className="features-section card">
          <h2>What is MBTI?</h2>
          <div className="dimensions-grid">
            <div className="dimension"><h3>🧠 Mind</h3><p>Introversion vs Extraversion</p></div>
            <div className="dimension"><h3>⚡ Energy</h3><p>Sensing vs Intuition</p></div>
            <div className="dimension"><h3>💭 Nature</h3><p>Thinking vs Feeling</p></div>
            <div className="dimension"><h3>📋 Tactics</h3><p>Judging vs Perceiving</p></div>
          </div>
        </div>
        <div className="cta-section card">
          <h2>Explore Your Personality</h2>
          <button className="button btn-primary" onClick={() => navigate('/test')}>Take Test</button>
          <Link to="/all-types" className="button btn-secondary">See All Types</Link>
        </div>
      </div>
    </main>
  )
}
