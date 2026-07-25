import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleTestClick = (path) => {
    setDropdownOpen(false)
    navigate(path)
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setDropdownOpen(false)}>
          🧠 MBTI Explorer
        </Link>
        <ul className="nav-menu">
          <li><Link to="/" onClick={() => setDropdownOpen(false)}>Home</Link></li>
          <li className="dropdown">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              Tests📋
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/test" onClick={() => handleTestClick('/test')}>MBTI Personality Test</Link></li>
                <li><Link to="/career" onClick={() => handleTestClick('/career')}>Career Competency</Link></li>
                <li><Link to="/enneagram" onClick={() => handleTestClick('/enneagram')}>Enneagram</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/all-types" onClick={() => setDropdownOpen(false)}>Personality Types</Link></li>
          <li><Link to="/about" onClick={() => setDropdownOpen(false)}>About</Link></li>
        </ul>
      </div>
    </nav>
  )
}