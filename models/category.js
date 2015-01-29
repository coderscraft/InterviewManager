'use strict';


var mongoose = require('mongoose');

var categoryModel = function() {

    var categorySchema = mongoose.Schema({
    	c_id: Number,
    	c_name: String,
    	cq_id: Number
    });

    return mongoose.model('Category', categorySchema);

}

module.exports = new categoryModel();
