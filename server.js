/* ----DEPENDENCIES---- */

const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

/* ----MIDDLEWARE---- */

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`connected to mongodb ${mongoose.connection.name}.`);
});

const Echo = require('./models/echo');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

/* ----ROUTES---- */

// GET /
app.get('/', async (req, res) => { // async for database connections
    res.render('index.ejs');
});

// GET /echoes
app.get('/echoes', async (req, res) => {
    const allEchoes = await Echo.find({});
    res.render('echoes/index.ejs', { echoes: allEchoes });
});

// GET /echoes/new
app.get('/echoes/new', (req, res) => {
    res.render('./echoes/new.ejs');
});

// GET /echoes/:id
app.get('/echoes/:id', async (req, res) => {
    const foundEcho = await Echo.findById(req.params.id);
    res.render('echoes/show.ejs', { echo: foundEcho });
});

// POST /echoes
app.post('/echoes', async (req, res) => {
    req.body.isEnemy = req.body.isEnemy === 'on' ? true : false;
    req.body.name = makeCapitalized(req.body.name);
    req.body.location = makeCapitalized(req.body.location);
    await Echo.create(req.body);
    res.redirect('/echoes');
});

// GET /echoes/:id/edit
app.get('/echoes/:id/edit', async (req, res) => {
    const foundEcho = await Echo.findById(req.params.id);
    res.render('echoes/edit.ejs', { echo: foundEcho, });
});

// PUT /echoes/:id
app.put('/echoes/:id', async (req, res) => {
    req.body.isEnemy = req.body.isEnemy === 'on' ? true : false;
    req.body.name = makeCapitalized(req.body.name);
    req.body.location = makeCapitalized(req.body.location);
    await Echo.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/echoes/${req.params.id}`);
});

// DELETE /echoes/:id
app.delete('/echoes/:id', async (req, res) => {
    await Echo.findByIdAndDelete(req.params.id);
    res.redirect('/echoes');
});

const makeCapitalized = (str) => {
    return str.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
};

const listener = app.listen(3000, () => console.log(`listening on port ${listener.address().port}`));