import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS, DELETE_SURVEY } from './types'

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/current_user')
    if (res.status === 200) {
      dispatch({ type: FETCH_USER, payload: res.data })
    } else {
      throw new Error('Network response was not ok.')
    }
  } catch (error) {
    console.log(
      'There has been a problem with your axios operation: ',
      error.message
    )
  }
}

export const handleStripeToken = token => async dispatch => {
  try {
    const res = await axios.post('/api/stripe', token)
    if (res.status === 200) {
      dispatch({ type: FETCH_USER, payload: res.data })
    } else {
      throw new Error('Network response was not ok.')
    }
  } catch (error) {
    console.log(
      'There has been a problem with your axios operation: ',
      error.message
    )
  }
}

export const submitSurvey = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/surveys', values)
    if (res.status === 200) {
      history.push('/surveys')
      dispatch({ type: FETCH_USER, payload: res.data })
    } else {
      throw new Error('Network response was not ok.')
    }
  } catch (error) {
    console.log(
      'There has been a problem with your axios operation: ',
      error.message
    )
  }
}

export const fetchSurveys = () => async dispatch => {
  try {
    const res = await axios.get('/api/surveys')
    if (res.status === 200) {
      dispatch({ type: FETCH_SURVEYS, payload: res.data })
    } else {
      throw new Error('Network response was not ok.')
    }
  } catch (error) {
    console.log(
      'There has been a problem with your axios operation: ',
      error.message
    )
  }
}

export const deleteSurvey = surveyId => async dispatch => {
  try {
    const res = await axios.delete('/api/surveys/' + surveyId)
    if (!res.status === 204) {
      console.log(res.status)
    }
    dispatch({ type: DELETE_SURVEY, payload: res.data })
  } catch (error) {
    console.log(
      'There has been a problem with your axios operation: ',
      error.message
    )
  }
}
