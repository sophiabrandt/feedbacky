const R = require('ramda')
const Path = require('path-parser').default
const { URL } = require('url')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

router.get('/thanks', (req, res) => {
  res.send('Thanks for voting!')
})

router.post('/', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body

  try {
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
    if (survey) {
      const mailer = new Mailer(survey, surveyTemplate(survey))

      try {
        await mailer.send()
        await survey.save()
        req.user.credits -= 1
        const user = await req.user.save()
        res.send(user)
      } catch (error) {
        res.status(422).send(error)
      }
    } else {
      throw new Error('Network response was not ok.')
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/webhooks', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice')

  const getMatch =({ email, url }) => {
    const match = p.test(new URL(url).pathname)
    if (match) return { email, surveyId: match.surveyId, choice: match.choice }
  }

  const sameEmailAndSurveyId = (a, b) => {
    return a.email === b.email && a.surveyId === b.surveyId
  }

  const events = R.pipe(
    R.map(getMatch),
    R.filter(Boolean),
    R.uniqWith(sameEmailAndSurveyId)
  )(req.body)
  
  console.log(events)
  res.send({})
})

module.exports = router
