/* eslint-disable no-unused-vars */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcryptjs');
const cryptoHash = require('./cryptoHash');

const db = require('../models');

const { User } = db;
module.exports = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ where: { email } }).then(user => {
        if (!user) {
          return done(false, false, {
            message: 'That email is not registered'
          });
        }
        if (user.password != cryptoHash(password)) {
          console.log('Email or Password incorrect');
          return done(false, false, { message: 'Wrong Email or Password' });
        }
        return done(null, user);
      });
    })
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        // Safari don't allow localhost auth
        callbackURL: `${process.env.domain || ''}/auth/facebook/callback`,
        profileFields: ['email', 'displayName']
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ where: { email: profile._json.email } }).then(user => {
          if (!user) {
            const randomPassword = Math.random()
              .toString(36)
              .slice(-8);
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                User.create({
                  name: profile._json.name,
                  email: profile._json.email,
                  password: hash
                })
                  .then(user => {
                    return done(null, user);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
            );
          } else {
            return done(null, user);
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => {
      done(null, user);
    });
  });
};
