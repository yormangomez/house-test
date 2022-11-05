require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

const user = require('./routes/user.routes');


app.use(cors())

app.set('port', process.env.PORT || 4000)

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/user', user)


module.exports = app;