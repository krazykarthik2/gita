import React from 'react'
import { Link } from 'react-router-dom'

function Welcome() {
  return (
    <div className="w-100 vh-100 vstack justify-content-between">
      <div className="top"></div>
      <div className="mid"></div>
      <div className="bottom h3 d-center flex-column">
        <Link to={"sitemap"}>Sitemap</Link>
        <Link to="/chapters">Start Reading</Link>
      </div>
    </div>
  )
}

export default Welcome