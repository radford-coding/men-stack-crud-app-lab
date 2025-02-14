const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// won't actually create the database until there's data added into it
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`connected to mongodb ${mongoose.connection.name}.`);
});

const Echo = require('./models/echo');

/*  */

// GET /

app.get('/', async (req, res) => { // async for database connections
    res.render('index.ejs');
});

// GET /echoes/new

app.get('/echoes/new', (req, res) => {
    res.render('./echoes/new.ejs');
});




const listener = app.listen(3000, () => console.log(`listening on part ${listener.address().port}`));