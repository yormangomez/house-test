require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CNN,{
            useUnifiedTopology: true,
            useNewUrlParser: true
            })
        .then((db) => console.log('Db is Connected'))
        .catch((err)=>console.log(err));