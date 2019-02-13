const express = require('express');

const postDb = require('../data/helpers/postDb');

const router = express.Router();

router.get('/', (req, res) => {
  postDb.get()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve posts at this time', error: err}));
})

module.exports = router;