const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: String
})



module.exports = mongoose.model('Service', ServiceSchema);