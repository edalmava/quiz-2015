var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId  
exports.load = function(req, res, next, quizId) {  
  models.Quiz.find({
            where: {
                id: Number(quizId)
            },
            include: [{
                model: models.Comment
            }]
  }).then(  
    function(quiz) {  
      if (quiz) {  
        req.quiz = quiz;  
        next();  
      } else { next(new Error('No existe quizId=' + quizId)); }  
    }  
  ).catch(function(error) { next(error);});  
};  

/*exports.question = function(req, res) {
	//res.render('quizes/question', {pregunta: 'Capital de Italia', title: 'Quiz'});
	models.Quiz.findAll().then(function(quiz) {
		res.render('quizes/question', { pregunta: quiz[0].pregunta, title: 'Quiz' });
    })
};*/
// GET /quizes
exports.index = function(req, res) {  
  /*models.Quiz.findAll().then(function(quizes) {  
    res.render('quizes/index', { quizes: quizes, title: 'Quiz' });  
  }).catch(function(error) { next(error);}) */
  if (!req.query.search){
	models.Quiz.findAll().then(function(quizes) {  
	  res.render('quizes/index', { quizes: quizes, errors: [], title: 'Quiz' });  
	}).catch(function(error) { next(error);}) 
  } else {
    var search = "%" + req.query.search + "%";	
    models.Quiz.findAll({ where: { pregunta: { $like:  search.replace(/(\s)+/g, '%') } } }).then(function(quizes) {  
	  res.render('quizes/index', { quizes: quizes, title: 'Quiz', errors: [] });  
	}).catch(function(error) { next(error);})    
  }
};  

// GET /quizes/:id  
exports.show = function(req, res) {  
  /*models.Quiz.findById(req.params.quizId).then(function(quiz) {  
    res.render('quizes/show', { quiz: quiz, title: 'Quiz' });  
  })*/
  res.render('quizes/show', { quiz: req.quiz, title: 'Quiz', errors: [] });   
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
	/*models.Quiz.findById(req.params.quizId).then(function(quiz) {  
      if (req.query.respuesta === quiz.respuesta) {  
        res.render('quizes/answer', { quiz: quiz, respuesta: 'Correcto', title: 'Quiz' });  
      } else {  
        res.render('quizes/answer', { quiz: quiz, respuesta: 'Incorrecto', title: 'Quiz' });  
      }  
    })*/
	var resultado = 'Incorrecto';  
    if (req.query.respuesta === req.quiz.respuesta) {  
      resultado = 'Correcto';  
    }  
    res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, title: 'Quiz', errors: [] });  
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta", tema: "Otro"}
  );

  res.render('quizes/new', {quiz: quiz, errors: [], title: 'Quiz'});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
  
  quiz.validate().then(function(err) {
	if (err) {
      res.render('quizes/new', {quiz: quiz, errors: err.errors, title: 'Quiz'});
    } else {
      // guarda en DB los campos pregunta y respuesta de quiz
	  quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(function(){
		res.redirect('/quizes');  
	  })   // res.redirect: Redirección HTTP a lista de preguntas
    }
  }).catch(function(error){next(error)});;
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz;  // req.quiz: autoload de instancia de quiz

  res.render('quizes/edit', {quiz: quiz, errors: [], title: 'Quiz'});
};

// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema

  req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors, title: 'Quiz'});
      } else {
        req.quiz     // save: guarda campos pregunta y respuesta en DB
        .save( {fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes');});
      }     // Redirección HTTP a lista de preguntas (URL relativo)
    }
  ).catch(function(error){next(error)});;
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};