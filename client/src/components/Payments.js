import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        name="Feedbacky"
        description="Purchase 5 credits for surveys"
        amount={500}
        currency="USD"
        token={token => this.props.handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}>
        <button className="btn green lighten-3">Add credits</button>
      </StripeCheckout>
    )
  }
}

export default connect(
  null,
  actions
)(Payments)
