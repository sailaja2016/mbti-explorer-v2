import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/AllTypes.css'

export default function AllTypes() {
  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTypes()
  }, [])

  const fetchTypes = async () => {
    try {
      const res = await axios.get('/api/all-types')
      setTypes(res.data)
      setLoading(false)
    } catch (err) {
      console.error('Error:', err)
      setLoading(false)
    }
  }

  if (loading) return <div className="loading"><div className="loading-spinner"></div></div>

  return (
    <main className="alltypes-container">
      <div className="container">
        <h2>All 16 MBTI Personality Types</h2>
        <div className="types-grid">
          {types.map(type => (
            <Link key={type.type} to={`/type/${type.type}`} className="type-card">
              <div className="type-card-image">
                <img src={`/images/${type.type.toLowerCase()}.jpg`} alt={type.type} />
              </div>
              <h3>{type.type}</h3>
              <h4>{type.title}</h4>
              <p>{type.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}