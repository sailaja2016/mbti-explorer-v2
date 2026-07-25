import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import EnneagramResults from './pages/EnneagramResults'
import CareerResults from './pages/CareerResults'
import Results from './pages/Results'
import AllTypes from './pages/AllTypes'
import TypeDetail from './pages/TypeDetail'
import Career from './pages/Career'
import Enneagram from './pages/Enneagram'
import About from './pages/About'
import Navbar from './components/Navbar'
import ChatBot from './components/ChatBot'
import './App.css'

function App() {
  const [results, setResults] = useState(null)

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Quiz onResults={setResults} />} />
          <Route path="/enneagram-results" element={<EnneagramResults />} />
          <Route path="/career-results" element={<CareerResults />} />
          <Route path="/results" element={results ? <Results data={results} /> : <Home />} />
          <Route path="/all-types" element={<AllTypes />} />
          <Route path="/type/:type" element={<TypeDetail />} />
          <Route path="/career" element={<Career />} />
          <Route path="/enneagram" element={<Enneagram />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <ChatBot />
      </div>
    </Router>
  )
}

export default App