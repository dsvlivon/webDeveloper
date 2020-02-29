var express = require('express');
var app = express ();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

async function conectar(){
    await mongoose.connect('mongodb://10.5.20.78:27017/curso',{iseNewUrlParser: true})
    console.log('Conectado!');
}

conectar();

const ArtistaSchema = mongoose.Schema({
    nombre: String,
    apellido: String
});

const ArtistaModel = mongoose.model('Artista', ArtistaSchema)

app.get ('/', async function(req, res){
    var listado = await ArtistaModel.find();
    res.send(listado)
});

app.get ('/buscar/:id', async function(req, res){
    await ArtistaModel.findByIdAndUpdate(
        {_id: 'asdasdsadasd'},
        {nombre:'Nuevo nombre', apellido: 'NA'}
    );
    res.send('ok');
});


app.get ('/borrar', async function(req, res){
    var rta = await ArtistaModel.findByIdAndRemove(
        {_id: '5e56fe51143a530abc834fa8'}
    );
    res.send(rta);
});

app.get ('/modificar', async function(req, res){
    await ArtistaModel.findByIdAndUpdate(
        {_id: '5e56fe51143a530abc834fa8'},
        {nombre:'Nuevo nombre', apellido: 'NA'}
    );
    res.send('ok');
});


app.get('/agregar', async function(req,res){
    var nuevoArtista = ArtistaModel.create(
        {nombre: 'jon', apellido: 'doe'}
        );
        res.send(nuevoArtista);

});

app.get('/listado', async function(req,res){
    var listado = ArtistaModel.find();
        res.render('listado', {listado })

});


app.listen(80,function(){
    console.log('App en localHost');
});