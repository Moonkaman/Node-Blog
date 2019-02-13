const express = require('express');

const postDb = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve posts at this time', error: err}));
})

router.post('/', (req, res) => {
  if(!req.body.text || !req.body.user_id) {
    res.status(400).json({errorMessage: 'Please provide the text field and a valid user id'});
  } else {
  postDb.insert(req.body)
    .then(newPost => res.status(201).json(newPost))
    .catch(err => res.status(500).json({errorMessage: 'Could not create a post at this time', error: err}));
  }
})

router.get('/:id', (req, res) => {
  postDb.getById(req.params.id)
    .then(post => post ? res.status(200).json(post) : res.status(404).json({errorMessage: `Post Id:${req.params.id} could not be found`}))
    .catch(err => res.status(500).json({errorMessage: `Could not retrieve post id:${req.params.id} at this time`, error: err}));
})

router.put('/:id', (req, res) => {
  if(!req.body.text || !req.body.user_id) {
    res.status(400).json({errorMessage: 'Please provide the text field and a valid user id'});
  } else {
    postDb.update(req.params.id, req.body)
      .then(count => {
        count > 0 ? (
            postDb.getById(req.params.id).then(post => res.status(200).json(post)).catch(err => res.status(500).json({errorMessage: 'Could not retrieve post at this time', error: err}))
          ) : (
            res.status(404).json({errorMessage: 'The post you tried to update could not be found'})
          )
      })
  }
})

module.exports = router;