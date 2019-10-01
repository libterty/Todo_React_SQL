const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../models');

// const Todo = db.Todo;
const User = db.User;

router.get('/', (req, res) => {
  res.send('hello world');
});
// 認證系統的路由
// 登入頁面
router.get('/users/login', (req, res) => {
  res.render('login');
});
// 登入檢查
router.post('/users/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next);
});
// 註冊頁面
router.get('/users/register', (req, res) => {
  res.render('register');
});
// 註冊檢查
router.post('/users/register', (req, res) => {
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
        .then(user => res.status(200).redirect('/'))
        .catch(err =>
          res.status(400).send(`Bad request, error Message: ${err.message}`)
        );
    }
  });
});
// 登出
router.get('/users/logout', (req, res) => {
  res.send('logout');
});

module.exports = router;
