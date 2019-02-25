import axios from 'axios'
import { FETCH_USER } from './types'

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
