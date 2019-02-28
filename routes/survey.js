const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Survey = mongoose.model('surveys')

router.post('/', (req, res) => {
  const { title, subject, body, recipients } = req.body

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({
      email: email.trim()
    })),
    _user: req.user.id,
    dateSent: Date.now()
  })
})

module.exports = router
