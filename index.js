const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const usersRouter = require('./users/usersRoutes');

const server = express();

server.use(express.json());
//server.use(morgan('dev'));
//server.use(helmet());
server.use('/users', usersRouter);

server.listen(8000, _ => console.log('\n***Server is running on port 8000***\n'));