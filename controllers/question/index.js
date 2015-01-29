'use strict';


var QuestionModel = require('../../models/question');


module.exports = function (router) {

  
 router.get('/', function (req, res) {
        
	     QuestionModel.find(function (err, cats) {
				if (err) {
					console.log(err);
				}
				
				var model =
				{
					questions: cats
				};
				
				 res.send(JSON.stringify(model, null, 2));
			});

        
    });

    router.post('/', function(req, res) {
          console.log("Posting question");

        var q_id = req.body.q_id && req.body.q_id.trim();
        var question = req.body.question && req.body.question.trim();
        var answer = req.body.answer && req.body.answer.trim();
        var details = req.body.details && req.body.details.trim();
        var image = req.body.image && req.body.image.trim();
        var l_id = req.body.l_id && req.body.l_id.trim();
        var c_id = req.body.c_id && req.body.c_id.trim();
        var date = req.body.date && req.body.date.trim();

        var newQuestion = new QuestionModel({q_id: q_id, question: question, answer: answer, details: details, image: image, l_id: l_id, c_id: c_id, date: date  });
		        newQuestion.save(function(err) {
					if(err) {
						console.log('save error', err);
					}
				});


          res.redirect("/question");
    });

};
