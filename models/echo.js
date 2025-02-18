const mongoose = require('mongoose');

const echoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    triPowerCost: { type: Number, required: true },
    location: String,
    howToGet: String,
    isEnemy: Boolean,
});

const Echo = mongoose.model('Echo', echoSchema);

module.exports = Echo;