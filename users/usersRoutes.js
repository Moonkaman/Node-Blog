const express = require('express');

const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', (req, res) => {
  userDb.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve users at this time.', error: err}));
});

router.get('/:id', (req, res) => {
  userDb.getById(req.params.id)
    .then(user => user ? res.status(200).json(user) : res.status(404).json({errorMessage: `User id:${req.params.id} not found`}))
    .catch(err => res.status(500).json({errorMessage: `Could not retrieve user id:${req.params.id} at this time.`, error: err}));
});

module.exports = router;
