const express = require('express')
const router = express.Router()
const passport = require('@passport-next/passport')

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect
    res.redirect('/surveys')
  }
)

module.exports = router
