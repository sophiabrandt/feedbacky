import React from 'react'
import { Link } from 'react-router-dom'

function Show404({ location }) {
  return (
    <div>
      <h3>
        Can't find <code>{location.pathname}</code>.
      </h3>
      <h4>
        <Link to="/">Go to Homepage.</Link>
      </h4>
    </div>
  )
}

export default Show404
