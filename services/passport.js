require('dotenv').config()
const mongoose = require('mongoose')
const passport = require('@passport-next/passport')
const GoogleStrategy = require('@passport-next/passport-google-oauth2').Strategy

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      return done(new Error('user not found'))
    }
    done(null, user)
  } catch (error) {
    done(error)
  }
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
          return done(null, existingUser)
        } else {
          const user = await new User({ googleId: profile.id }).save()
          done(null, user)
        }
      } catch (error) {
        return done(error)
      }
    }
  )
)
