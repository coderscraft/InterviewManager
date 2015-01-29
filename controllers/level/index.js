'use strict';


var LevelModel = require('../../models/level');


module.exports = function (router) {


      router.get('/', function (req, res) {
        
	     LevelModel.find(function (err, levels) {
				if (err) {
					console.log(err);
				}
				
				var model =
				{
					level: levels
				};
				
				 res.send('<code><pre>' + JSON.stringify(model, null, 2) + '</pre></code>');
			});

        
    });


    router.post('/', function(req, res) {

        var l_id = req.body.l_id && req.body.l_id.trim();
        var l_name = req.body.l_name && req.body.l_name.trim();
        
        var conditions = { l_id: l_id };

        LevelModel.find(conditions,function(err, docs) {

        	if(err) {
        		console.log('Find Error in Post',err);
        	}

        	if(0 === docs.length) {
        		console.log('Its insert');
        		var newLevel = new LevelModel({l_id: l_id, l_name: l_name});
		        newLevel.save(function(err) {
					if(err) {
						console.log('save error', err);
					}
				});
        	} else {
        		console.log('Its Update');
				 var conditions = { l_id: l_id }
				          , update = { l_name: l_name }
				          , options = { multi: false };

				       LevelModel.update(conditions, update, options, function(err) {
				       	if(err) {
								console.log('save error', err);
							}
				    });

        	}
            res.redirect('/level');

        });
    });

};
