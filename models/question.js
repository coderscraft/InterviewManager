'use strict';

var mongoose = require('mongoose');


var questionModel = function() {

     var questionSchema = mongoose.Schema({
     	q_id: Number,
        question: String,
        answer: String,
        details: String,
        image: String,
        l_id: Number,
        c_id: Number,
        date: Date
     });

	return mongoose.model('Question', questionSchema);

};


module.exports = new questionModel();
