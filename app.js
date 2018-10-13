var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const config = require('./config/database');

app.use(bodyParser.json());

const port = 3000;

Materia = require('./models/materia') 

//conectar a mongoose
mongoose.connect(config.database, {
    useMongoClient: true
});

mongoose.connection.on('connected', ()=>{
    console.log('Conectado a la base de datos '+config.database);
});

mongoose.connection.on('error', (err)=>{
    console.log('ERROR de base de datos '+err);
});

app.get('/', function(req,res){
    res.send('Usar /materias');
});

app.get('/materias', function(req,res){
    Materia.getMaterias(function(err, materias){
        if(err){
            throw err;
        }
        res.json(materias);
    });
});

app.post('/materias', function(req,res){
    var materia = req.body;
    Materia.addMateria(materia, function(err, materia){
        if(err){
            throw err;
        }
        res.json(materia);
    });
});

app.put('/materias/:_id', function(req,res){
    var id = req.params._id;
    var materia = req.body;
    Materia.updateMateria(id, materia, {}, function(err, materia){
        if(err){
            throw err;
        }
        res.json(materia);
    });
});

app.get('/materias/:_id', function(req,res){
    Materia.getMateriasById(req.params._id, function(err, materia){
        if(err){
            throw err;
        }
        res.json(materia);
    });
});

app.listen(port,()=>{
    console.log('conectado');
});
