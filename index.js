const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const usersRouter = require('./users/usersRoutes');
const postsRouter = require('./posts/postsRouter');

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
//Comment out the line below if you don't want do deal with setting the headers for every request.
server.use(authorize);
server.use('/users', usersRouter);
server.use('/posts', postsRouter);

function authorize(req, res, next) {
  if(req.headers.authorization) {
    next();
  } else {
    res.status(403).send('You need to set authorize in your headers (hint: It can be anything, just not undefined)')
  }
}

server.listen(8000, _ => console.log('\n***Server is running on port 8000***\n'));