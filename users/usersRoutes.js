const express = require('express');

const userDb = require('../data/helpers/userDb');
const postDb = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', (req, res) => {
  userDb.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve users at this time.', error: err}));
});

router.post('/', (req, res) => {
  if(!req.body.name) {
    res.status(400).json({errorMessage: 'Please provide a name'});
  } else {
  userDb.insert(req.body)
    .then(newUser => res.status(201).json(newUser))
    .catch(err => res.status(500).json({errorMessage: 'Could not create a user at this time.', error: err}));
  }
})

router.get('/:id', (req, res) => {
  userDb.getById(req.params.id)
    .then(user => user ? res.status(200).json(user) : res.status(404).json({errorMessage: `User id:${req.params.id} not found`}))
    .catch(err => res.status(500).json({errorMessage: `Could not retrieve user id:${req.params.id} at this time.`, error: err}));
});

router.delete('/:id', (req, res) => {
  userDb.remove(req.params.id)
    .then(count => count < 1 ? res.status(404).json({errorMessage: 'The user you tried to delete could not be found'}) : res.status(200).json({message: `You successfully deleted ${count} user`}))
    .catch(err => res.status(500).json({errorMessage: `Could not delete user id:${req.params.id} at this time.`, error: err}));
})

router.put('/:id', (req, res) => {
  if(!req.body.name) {
    res.status(400).json({errorMessage: 'Please provide a name'});
  } else {
  userDb.update(req.params.id, req.body)
    .then(count => count > 0 ? userDb.getById(req.params.id).then(user => res.status(200).json(user)).catch(err => res.status(500).json({errorMessage: 'Could not retrieve user at this time.', error: err})) : res.status(404).json({errorMessage: `User id:${req.params.id} not found`}))
    .catch(err => res.status(500).json({errorMessage: `Could not update user id:${req.params.id} at this time.`, error: err}));
  }
});

router.get('/:id/posts', (req, res) => {
  userDb.getUserPosts(req.params.id)
    .then(posts => posts.length !== 0 ? res.status(200).json(posts) : res.status(404).json({errorMessage: `User id:${req.params.id} could not be found`}))
    .catch(err => res.status(500).json({errorMessage: `Could not retrieve user id:${req.params.id}s posts at this time.`, error: err}));
})

module.exports = router;

