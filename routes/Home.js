const express = require('express');
const router = express.Router();
const db = require('../models');
const { authenticated } = require('../config/auth');
const Todo = db.Todo;
const User = db.User;

router.get('/api/todo', authenticated, async(req, res) => {
    // return res.status(200).json({ type: 'success', todo: "your new Todo" })
    console.log(req.user.id)
    User.findByPk(req.user.id)
        .then(user => {
            if (!user) {
                return res.status(400).redirect('/')
            }
            return Todo.findAll({
                where: { UserId: req.user.id }
            })
        })
        .then(todos => {
            return res.status(200).json({ type: "success", todos: todos })
        })
        .catch(err => console.error(err))
})

router.post('/api/newtodo', (req, res) => {
    Todo.create({
            name: req.body.name,
            done: false,
            UserId: req.user.id
        })
        .then(todos => {
            return res.status(200).redirect('/')
        })
        .catch(error => { return res.status(400).send({ msg: error.message }) })
})

module.exports = router;