const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`connected to mongodb ${mongoose.connection.name}.`);
});

const Echo = require('./models/echo');

app.use(express.urlencoded({ extended: false }));


/* ----ROUTES---- */

// GET /
app.get('/', async (req, res) => { // async for database connections
    res.render('index.ejs');
});

// GET /echoes/new
app.get('/echoes/new', (req, res) => {
    res.render('./echoes/new.ejs');
});

// POST /echoes
app.post('/echoes', async (req, res) => {
    req.body.isEnemy = req.body.isEnemy === 'on' ? true : false;
    console.log(req.body);
    await Echo.create(req.body);
    res.redirect('/echoes/new');
});




const listener = app.listen(3000, () => console.log(`listening on part ${listener.address().port}`));