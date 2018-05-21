var mongoose = require('mongoose');

// Schema defines how question messages will be stored in MongoDB
var QuestionSchema = new mongoose.Schema({
    quesStatement: { type: String, required: true},
	options: {
		optionA: { type: String,required: true},
		optionB: { type: String,required: true},
		optionC: { type: String,required: true},
		optionD: { type: String,required: true}
				
	},
	points: { type:Number, required: true},// marks obtained on correctly solving the problem
	answer: { type:Number, min: 1, max: 4 , required: true},
	selectedOption: { type:Number, default: null}, //choice selected
    
});

module.exports = mongoose.model('Question', QuestionSchema);