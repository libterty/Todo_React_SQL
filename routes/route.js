const express = require('express');
const router = express.Router();
const db = require('../models');

const Todo = db.Todo;
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
router.post('/users/login', (req, res) => {
  res.send('login');
});
// 註冊頁面
router.get('/users/register', (req, res) => {
  res.render('register');
});
// 註冊檢查
router.post('/users/register', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(user => res.redirect('/'));
});
// 登出
router.get('/users/logout', (req, res) => {
  res.send('logout');
});

module.exports = router;
