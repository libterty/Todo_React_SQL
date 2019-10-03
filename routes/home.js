const express = require('express');
const router = express.Router();

const { authenticated } = require('../config/auth');
const db = require('../models')
const Todo = db.Todo
const User = db.User

router.get('/', authenticated, (req, res) => {
    User.findByPk(req.user.id)
        .then((user) => {
            if (!user) throw new Error("user not found")
            return Todo.findAll({
                where: { UserId: req.user.id }
            })
        })
        .then((todos) => { return res.json({ type: 'success', message: todos }) })
        .catch((error) => { return res.status(400).send({ error: error.message }) })
});
module.exports = router;