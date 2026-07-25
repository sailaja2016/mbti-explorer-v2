import React from 'react'
import '../styles/About.css'

export default function About() {
  return (
    <main className="about-container">
      <div className="container">
        <div className="card about-header">
          <h1>About MBTI Explorer</h1>
          <p className="subtitle">Understanding Personality Through the Myers-Briggs Framework</p>
        </div>

        <div className="about-grid">
          <div className="card">
            <h2>Our Mission</h2>
            <p>MBTI Explorer is dedicated to helping people understand themselves and others through the Myers-Briggs Type Indicator framework. We believe that self-awareness is the first step toward personal growth, better relationships, and finding careers that truly align with who you are.</p>
          </div>

          <div className="card">
            <h2>What is MBTI?</h2>
            <p>The Myers-Briggs Type Indicator is a personality assessment tool based on psychological type theory. It helps categorize people into 16 distinct personality types based on four core dimensions: how you direct energy (Introversion/Extraversion), gather information (Sensing/Intuition), make decisions (Thinking/Feeling), and organize your life (Judging/Perceiving).</p>
          </div>

          <div className="card">
            <h2>How It Works</h2>
            <p>Our 60-question test is designed to help you understand your natural preferences across these four dimensions. By answering honestly about how you naturally think, feel, and act, we can predict your personality type and provide insights into your strengths, growth areas, and ideal career paths.</p>
          </div>

          <div className="card">
            <h2>16 Personality Types</h2>
            <p>Every person is unique, and MBTI recognizes this by offering 16 distinct personality types. Each type has its own strengths, communication style, preferred work environment, and natural talents. There is no "best" type — all are valuable and contribute differently to the world.</p>
          </div>

          <div className="card">
            <h2>Why MBTI?</h2>
            <p>Understanding your MBTI type can improve your relationships, guide career decisions, enhance communication, and foster personal growth. Whether you're navigating career choices, improving relationships, or simply seeking self-understanding, MBTI provides a framework for meaningful self-reflection.</p>
          </div>

          <div className="card">
            <h2>Get Started</h2>
            <p>Ready to discover your personality type? Take our 60-question MBTI test to receive personalized insights about who you are. Our comprehensive results include detailed descriptions, career recommendations, and growth tips tailored to your unique type.</p>
          </div>
        </div>
      </div>
    </main>
  )
}