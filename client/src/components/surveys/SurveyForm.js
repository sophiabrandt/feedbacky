import React from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import SurveyField from './SurveyField'

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
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit(values => console.log(values))}>
      <FieldArray name="survey" component={renderFields} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm)
