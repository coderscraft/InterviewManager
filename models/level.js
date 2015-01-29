'use strict';

var mongoose = require('mongoose');


var levelModel = function() {

     var levelSchema = mongoose.Schema({
     	l_id: Number,
     	l_name: String
     });


     return mongoose.model('Level',levelSchema);

}

module.exports = new levelModel();
