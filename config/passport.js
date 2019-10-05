/* eslint-disable no-unused-vars */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cryptoHash = require('./cryptoHash');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.User;
module.exports = passport => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ where: { email: email } })
                .then(user => {
                    if (!user) {
                        return done(false, false, { message: 'That email is not registered' })
                    }
                    if (user.password != cryptoHash(password)) {
                        console.log('Email or Password incorrect')
                        return done(false, false, { message: 'Wrong Email or Password' })
                    }
                    return done(null, user)
                })
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findByPk(id).then((user) => {
            done(null, user)
        })
    })
}