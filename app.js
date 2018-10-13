var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Materia = require('./models/materia') 

//conectar a mongoose
mongoose.connect('mongodb://localhost/SystemFlux');
var db = mongoose.connection;

app.get('/', function(req,res){
    res.send('Usar /api/materias');
});

app.get('/api/materias', function(req,res){
    Materia.getMaterias(function(err, materias){
        if(err){
            throw err;
        }
        res.json(materias);
    });
});

app.post('/api/materias', function(req,res){
    var materia = req.body;
    Materia.addMateria(materia, function(err, materia){
        if(err){
            throw err;
        }
        res.json(materia);
    });
});

app.put('/api/materias/:_id', function(req,res){
    var id = req.params._id;
    var materia = req.body;
    Materia.updateMateria(id, materia, {}, function(err, materia){
        if(err){
            throw err;
        }
        res.json(materia);
    });
});

app.get('/api/materias/:_id', function(req,res){
    Materia.getMateriasById(req.params._id, function(err, materia){
        if(err){
            throw err;
        }
        res.json(materia);
    });
});

app.listen(3000);
console.log('conectado');