require('dotenv').config()
const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRECT_KEY)

router.post('/', async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: 'Purchase 5 credits for surveys',
      source: req.body.id
    })
    if (charge) {
      req.user.credits += 5
      const user = await req.user.save()
      res.send(user)
    } else {
      throw new Error('Network response was not ok.')
    }
  } catch (error) {
    console.log(
      'There has been a problem with your charge operation: ',
      error.message
    )
  }
})

module.exports = router
