require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

const auth = require('./routes/auth.routes');
const category = require('./routes/category.routes');
const search = require('./routes/search.routes');
const products = require('./routes/products.routes');
const user = require('./routes/user.routes');
//const uploads = require('./routes/uploads.routes');


app.use(cors())

app.set('port', process.env.PORT || 4000)

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth', auth)
app.use('/api/category', category)
app.use('/api/products', products)
app.use('/api/search', search)
app.use('/api/user', user)
//app.use('/api/uploads', uploads)


module.exports = app;