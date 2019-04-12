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

router.get('/:surveyId/:choice', (req, res) => {
  res.send('Thanks for voting!')
})

router.get('/', requireLogin, async (req, res) => {
  try {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    })

    res.send(surveys)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({
      email: email.trim(),
    })),
    _user: req.user.id,
    dateSent: Date.now(),
  })
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
})

router.post('/webhooks', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice')

  const getMatch = ({ email, url }) => {
    const match = p.test(new URL(url).pathname)
    if (match) return { email, surveyId: match.surveyId, choice: match.choice }
  }

  const sameEmailAndSurveyId = (a, b) => {
    return a.email === b.email && a.surveyId === b.surveyId
  }

  const updateSurvey = ({ surveyId, email, choice }) => {
    Survey.updateOne(
      {
        _id: surveyId,
        recipients: {
          $elemMatch: { email: email, responded: false },
        },
      },
      {
        $inc: { [choice]: 1 },
        $set: { 'recipients.$.responded': true },
        lastResponded: new Date(),
      }
    ).exec()
  }

  R.pipe(
    R.map(getMatch),
    R.filter(Boolean),
    R.uniqWith(sameEmailAndSurveyId),
    R.forEach(updateSurvey)
  )(req.body)

  res.send({})
})

router.delete('/:surveyId', requireLogin, async (req, res) => {
  try {
    const survey = await Survey.findOneAndDelete({ _id: req.params.surveyId })
    if (survey) {
      res.status(200).send(survey)
    } else {
      res.status(404).send({ Error: 'Not found.' })
    }
  } catch (error) {
    return res.status(500).send(error)
  }
})

module.exports = router
