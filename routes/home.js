const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

const { authenticated } = require('../config/auth');

router.get('/', authenticated, (req, res) => {
    Todo.find({ userId: req.user._id })
        .sort({ name: 'asc' })
        .exec((err, todos) => {
            if (err) return res.status(400).redirect('/');
            return res.json({ type: 'success', todo: todos });
        });
});
module.exports = router;