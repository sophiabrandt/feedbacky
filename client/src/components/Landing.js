import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Landing = ({ auth }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Feedbacky!</h1>
      <p>Collect feedback from your users.</p>
      <div>{auth ? <Link to="/surveys/new">Collect now!</Link> : <div />}</div>
    </div>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Landing)
