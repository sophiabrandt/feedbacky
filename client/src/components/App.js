import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew'
import ProtectedRoute from './ProtectedRoute'
import Show404 from './Show404'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Landing} />
              <ProtectedRoute exact path="/surveys" component={Dashboard} />
              <ProtectedRoute path="/surveys/new" component={SurveyNew} />
              <Route component={Show404} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(
  mapStateToProps,
  actions
)(App)
