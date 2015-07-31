var models = require('../models/models.js');

exports.question = function(req, res) {
	//res.render('quizes/question', {pregunta: 'Capital de Italia', title: 'Quiz'});
	models.Quiz.findAll().then(function(quiz) {
		res.render('quizes/question', { pregunta: quiz[0].pregunta, title: 'Quiz' });
    })
};

exports.answer = function(req, res) {
	/*if (req.query.respuesta === 'Roma'){
		res.render('quizes/answer', {respuesta: 'Correcto', title: 'Quiz'});
	} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto', title: 'Quiz'});
	}*/
	models.Quiz.findAll().then(function(quiz) {
		if (req.query.respuesta === quiz[0].respuesta) {
			res.render('quizes/answer', { respuesta: 'Correcto', title: 'Quiz' });
		} else {
			res.render('quizes/answer', { respuesta: 'Incorrecto', title: 'Quiz' });
		}
	})
};