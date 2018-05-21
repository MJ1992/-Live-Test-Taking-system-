var mongoose = require('mongoose');
var User = require('../models/user');

var TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    questions: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }

    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number
    }

});

module.exports = mongoose.model('Test', TestSchema);