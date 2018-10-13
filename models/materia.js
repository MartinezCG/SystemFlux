var mongoose = require('mongoose');

//esquema de materias
var materiaEsquema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    prelacion:{
        type: String
    }
});

var Materia = module.exports = mongoose.model('Materia', materiaEsquema);

//get materias
module.exports.getMaterias = function(callback, limit){
    Materia.find(callback).limit(limit);
}

module.exports.getMateriasById = function(id, callback){
    Materia.findById(id, callback);
}

//agregar materias
module.exports.addMateria = function(materia, callback){
    Materia.create(materia, callback);
}

//actualizar materia
module.exports.updateMateria = function(id, materia, options, callback){
    var query = {_id: id};
    var update = {
        name: materia.name
    }
    Materia.findOneAndUpdate(query, update, options, callback);
}

//no hay delete por ahora porque en realidad no borraremos algo del flujograma... creo