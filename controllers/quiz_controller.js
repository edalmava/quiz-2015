var models = require('../models/models.js');

/*exports.question = function(req, res) {
	//res.render('quizes/question', {pregunta: 'Capital de Italia', title: 'Quiz'});
	models.Quiz.findAll().then(function(quiz) {
		res.render('quizes/question', { pregunta: quiz[0].pregunta, title: 'Quiz' });
    })
};*/
// GET /quizes
exports.index = function(req, res) {  
  models.Quiz.findAll().then(function(quizes) {  
    res.render('quizes/index', { quizes: quizes, title: 'Quiz' });  
  })  
};  

// GET /quizes/:id  
exports.show = function(req, res) {  
  models.Quiz.findById(req.params.quizId).then(function(quiz) {  
    res.render('quizes/show', { quiz: quiz, title: 'Quiz' });  
  })  
};  


// GET /quizes/:id/answer
exports.answer = function(req, res) {
	/*if (req.query.respuesta === 'Roma'){
		res.render('quizes/answer', {respuesta: 'Correcto', title: 'Quiz'});
	} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto', title: 'Quiz'});
	}*/
	/*models.Quiz.findAll().then(function(quiz) {
		if (req.query.respuesta === quiz[0].respuesta) {
			res.render('quizes/answer', { respuesta: 'Correcto', title: 'Quiz' });
		} else {
			res.render('quizes/answer', { respuesta: 'Incorrecto', title: 'Quiz' });
		}
	})*/
	models.Quiz.findById(req.params.quizId).then(function(quiz) {  
      if (req.query.respuesta === quiz.respuesta) {  
        res.render('quizes/answer', { quiz: quiz, respuesta: 'Correcto', title: 'Quiz' });  
      } else {  
        res.render('quizes/answer', { quiz: quiz, respuesta: 'Incorrecto', title: 'Quiz' });  
      }  
    })  
};

