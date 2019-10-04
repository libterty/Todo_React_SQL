const express = require('express');

const router = express.Router();
const db = require('../models');
const { authenticated } = require('../config/auth');

const { Todo } = db;
const { User } = db;

router.get('/api/todo', authenticated, async (req, res) => {
  // return res.status(200).json({ type: 'success', todo: "your new Todo" })
  console.log(req.user.id);
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.status(400).redirect('/');
      }
      return Todo.findAll({
        where: { UserId: req.user.id }
      });
    })
    .then(todos => {
      return res.status(200).json({ type: 'success', todos });
    })
    .catch(err => console.error(err));
});

router.get('/api/:id', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        return res.status(400).redirect('/');
      }
      return Todo.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id
        }
      });
      console.log('TODOID:', req.params.id);
      console.log('UserID:', req.user.id);
    })
    .then(todo => {
      res.status(200).json({ type: 'success', todo });
    });
});

router.post('/api/newtodo', (req, res) => {
  Todo.create({
    name: req.body.name,
    done: false,
    UserId: req.user.id
  })
    .then(todos => {
      return res.status(200).redirect('/');
    })
    .catch(error => {
      return res.status(400).send({ msg: error.message });
    });
});

router.put('/api/:id', authenticated, (req, res) => {
  Todo.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
    .then(todo => {
      todo.name = req.body.edit;
      todo.done = req.body.done === 'on';

      return todo.save();
    })
    .then(todo => {
      return res.status(200).redirect('/');
    })
    .catch(error => {
      return res.status(422).json({ type: 'Error', error: error.message });
    });
});

router.delete('/api/:id/', authenticated, (req, res) => {
  console.log('req.params.id', req.params.id);
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) {
        res.status(400).redirect('/');
      }
      return Todo.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      });
    })
    .then(todo => {
      return res.status(200).redirect('/');
    })
    .catch(error => {
      return res.status(422).json({ type: 'Error', error: error.message });
    });
});

module.exports = router;
