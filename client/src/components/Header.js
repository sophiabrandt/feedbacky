import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        )
      default:
        return [
          <li key="stripe">
            <Payments />
          </li>,
          <li key="credits" style={{ margin: '0 10px' }}>
            Credits: {this.props.auth.credits}{' '}
          </li>,
          <li key="logout">
            <a href="/api/logout">Logout</a>
          </li>
        ]
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper lime darken-4">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo">
            Feedbacky
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header)
