import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route
        {...props}
        render={props =>
          this.props.auth ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(ProtectedRoute)
