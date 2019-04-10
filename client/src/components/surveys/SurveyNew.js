import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import SurveyForm from './SurveyForm'
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends Component {
  state = { showFormReview: false }

  renderSurveyForm() {
    if (this.state.showFormReview === true) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      )
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    )
  }

  renderCreditsRequired() {
    return (
      <>
        <h4>Please add credits to your account first!</h4>
      </>
    )
  }

  render() {
    const { credits } = this.props
    return (
      <>
        {credits ? (
          <div>{this.renderSurveyForm()}</div>
        ) : (
          <div>{this.renderCreditsRequired()}</div>
        )}
      </>
    )
  }
}

const mapStateToProps = ({ auth: { credits } }) => ({ credits })

export default connect(mapStateToProps)(
  reduxForm({
    form: 'surveyForm',
  })(SurveyNew)
)
