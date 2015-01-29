'use strict';


var CategoryModel = require('../../models/category');


module.exports = function (router) {

    /*Return all categories*/

    router.get('/', function (req, res) {
        
	     CategoryModel.find(function (err, cats) {
				if (err) {
					console.log(err);
				}
				
				var model =
				{
					category: cats
				};
				
				 res.send('<code><pre>' + JSON.stringify(model, null, 2) + '</pre></code>');
			});

        
    });


 /* Get Next id for new question in mentioned category */


 router.get('/:category/nextid',  function (req, res) {


        var category = req.param("category");
     	var condition = { c_name: category};
        
	     CategoryModel.findOne(condition, {'cq_id':1, '_id':0},function (err, questionId) {

               if (err) {
					console.log(err);
				}

               if(questionId != 'null') {
                     var cqid = questionId.cq_id;
                     cqid = cqid + 1;
                    
                   var model =
					{
						cq_id: cqid
					};
				
				 res.send('<code><pre>' + JSON.stringify(model, null, 2) + '</pre></code>');

               }

				
			}); 

        
    });


     /*Get category json on passing category id*/

     router.get('/id/:cid', function (req, res) {

        var cid = req.param("cid");
     	var condition = { c_id: cid};
        
	     CategoryModel.find(condition,function (err, cats) {
				if (err) {
					console.log(err);
				}
				
				var model =
				{
					category: cats
				};
				
				 res.send('<code><pre>' + JSON.stringify(model, null, 2) + '</pre></code>');
			}); 

        
    });


     /*Return specific category mentioned in url*/

     router.get('/:category', function (req, res) {


        var category = req.param("category");
     	var condition = { c_name: category};
        
	     CategoryModel.find(condition,function (err, cats) {
				if (err) {
					console.log(err);
				}
				
				var model =
				{
					category: cats
				};
				
				 res.send('<code><pre>' + JSON.stringify(model, null, 2) + '</pre></code>');
			}); 

        
    });


    /*Upsert new category in db*/

    router.post('/', function(req, res) {

        var c_id = req.body.c_id && req.body.c_id.trim();
        var c_name = req.body.c_name && req.body.c_name.trim();
        var cq_id = req.body.cq_id && req.body.cq_id.trim(); 

        var conditions = { c_id: c_id };

        CategoryModel.find(conditions,function(err, docs) {

        	if(err) {
        		console.log('Find Error in Post',err);
        	}

        	if(0 === docs.length) {
        		console.log('Its insert');
        		var newCategory = new CategoryModel({c_id: c_id, c_name: c_name, cq_id: cq_id});
		        newCategory.save(function(err) {
					if(err) {
						console.log('save error', err);
					}
				});
        	} else {
        		console.log('Its Update');
				 var conditions = { c_id: c_id }
				          , update = { c_name: c_name, cq_id: cq_id }
				          , options = { multi: false };

				       CategoryModel.update(conditions, update, options, function(err) {
				       	if(err) {
								console.log('save error', err);
							}
				    });

        	}
            res.redirect('/category');

        });
    });

};
