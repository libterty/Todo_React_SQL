const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../models');

// const Todo = db.Todo;
const User = db.User;

// 認證系統的路由

// 登入檢查
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login'
    })(req, res, next);
});

// 註冊檢查
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    User.findOne({ where: { email: email } }).then(user => {
        if (user) {
            console.log(`${user} are already an user.`);
            res.status(200).render('register', {
                name,
                email,
                password,
                password2
            });
        } else {
            const newUser = new User({
                name,
                email,
                password
            });
            newUser
                .save()
                .then(user => res.json({ type: 'success', body: { name, email, password, password2 } }))
                .catch(err =>
                    res.status(400).send(`Bad request, error Message: ${err.message}`)
                );
        }
    });
});
// 登出
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/users/login');
});

module.exports = router;