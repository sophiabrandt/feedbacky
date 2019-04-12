import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSurveys, deleteSurvey } from '../../actions'

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys()
  }

  deleteHandler(event, surveyId) {
    event.preventDefault()
    this.props.deleteSurvey(surveyId)
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card amber lighten-2 black-text" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p> {survey.body} </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleString()}
            </p>
          </div>
          <div className="card-action">
            <div
              className="btn-floating waves-effect waves-light pink darken-3 right"
              onClick={event => this.deleteHandler(event, survey._id)}
            >
              <i className="material-icons">delete</i>
            </div>
            <div>Yes: {survey.yes}</div>
            <div>No: {survey.no}</div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.props.surveys && this.props.surveys.length ? (
          <div>{this.renderSurveys()}</div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ surveys }) => ({ surveys })

export default connect(
  mapStateToProps,
  { fetchSurveys, deleteSurvey }
)(SurveyList)
