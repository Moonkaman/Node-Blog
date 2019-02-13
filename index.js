const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const server = express();

server.use(morgan('dev'));
server.use(helmet());

server.listen(8000, _ => console.log('\n***Server is running on port 8000***\n'));