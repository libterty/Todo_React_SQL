const express = require('express');

const router = express.Router();
const passport = require('passport');
const db = require('../models');

const { User } = db;

// 登入檢查
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }),
  (req, res) => {
    if (failureFlash) {
      return res.status(401).json({ msg: 'Fail' });
    }
  }
);

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  User.findOne({ where: { email } }).then(user => {
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
        .then(user =>
          res.json({
            type: 'success',
            body: { name, email, password, password2 }
          })
        )
        .catch(err =>
          res.status(400).send(`Bad request, error Message: ${err.message}`)
        );
    }
  });
});
// 登出
router.get('/logout', (req, res) => {
  req.logOut();
  res.status(200).redirect('/users/login');
});

module.exports = router;
