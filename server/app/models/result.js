var mongoose = require('mongoose');

// Schema defines how results will be stored in MongoDB
var ResultSchema = new mongoose.Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'

    },
    userId: {
        type: String,

    },
    questionsWithAnswers: [],
    correct: {
        type: Number
    },
    incorrect: {
        type: Number
    },
    unanswered: {
        type: Number
    },
    percentage: {
        type: Number
    },
    pointsScored: {
        type: Number
    },
    totalPoints: {
        type: Number
    },
    submittedOn: {
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('Result', ResultSchema);