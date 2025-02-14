const mongoose = require('mongoose');

const echoSchema = new mongoose.Schema({
    name: String,
    triPowerCost: Number,
    location: String,
    howToGet: String,
    isEnemy: Boolean,
});

const Echo = mongoose.model('Echo', echoSchema);

module.exports = Echo;