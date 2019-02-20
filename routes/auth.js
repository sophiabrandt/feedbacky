const express = require('express')
const router = express.Router()
const passport = require('@passport-next/passport')

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/auth/current_user')
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.send('You are logged out!')
})

router.get('/current_user', (req, res) => {
  console.log(req.user)
  res.send('You are logged in!')
})

module.exports = router
