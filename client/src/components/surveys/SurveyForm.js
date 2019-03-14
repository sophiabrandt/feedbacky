import React from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'

const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'recipients' }
]

const renderFields = () => (
  <div>
    {FIELDS.map(({ name, label }) => (
      <Field
        key={name}
        name={name}
        type="text"
        component={SurveyField}
        label={label}
      />
    ))}
  </div>
)

const SurveyForm = props => {
  const { handleSubmit, onSurveySubmit } = props
  return (
    <form onSubmit={handleSubmit(onSurveySubmit)}>
      <FieldArray name="survey" component={renderFields} />
      <Link to="/surveys" className="red btn-flat white-text">
        Cancel
      </Link>
      <button className="teal btn-flat right white-text" type="submit">
        Next
        <i className="material-icons right">send</i>
      </button>
    </form>
  )
}

function validate(values) {
  const errors = {}

  errors.recipients = validateEmails(values.recipients || '')

  FIELDS.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `Cannot be empty: ${name}!`
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm)
