//Declaraciones y paquetes express necesarios.
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var hbs = require('express-handlebars');

mongoose.Promise = global.Promise;

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

async function conectar(){ 
    await mongoose.connect('mongodb://localhost:27017',{useNewUrlParser: true})
    console.log('!!Conected!!');
}
conectar();

const EstadoSchema = mongoose.Schema
({ 
    nombre: String,
    estado: String,
    mensaje: String
})// definicion de estructura


const EstadoModel = mongoose.model('Estado',EstadoSchema);

app.use(express.urlencoded({extended: true})); //Para evitar warnings 

// Parte de programación - sentimómetro

app.get('/alta', function(req, res) {res.render('formulario');})

app.post('/alta', async function(req, res) {
    
    if (req.body.nombre=='' || req.body.mensaje=='') {
        res.render('formulario', {
            error: 'El nombre o texto es obligatorio',
            datos: {nombre:req.body.nombre, estado:req.body.estado, mensaje:req.body.mensaje}
        });
        return;
    }  /*Relleno el primer Estado*/
    await EstadoModel.create({nombre:req.body.nombre, estado:req.body.estado, mensaje:req.body.mensaje});
    res.redirect('/listado');
});

app.get('/listado', async function(req, res) {
    var list = await EstadoModel.find().lean();
    //res.redirect('/alta');

    res.render('listado', {listado: list});
});

app.get('/borrar/:id', async function(req, res) {
    // :id -> req.params.id
    await EstadoModel.findByIdAndRemove(
        {_id: req.params.id}
    );
    res.redirect('/listado');
}); 


app.get('/editar/:id', async function(req, res) {
    var Estado = await EstadoModel.findById({_id: req.params.id}).lean();
    res.render('formulario', {datos: Estado});
});

app.post('/editar/:id', async function(req, res) {
    if (req.body.nombre=='' || req.body.mensaje=='') {
        res.render('formulario', {error: 'El nombre o el texto es obligatorio',
                                datos: {nombre:req.body.nombre, mensaje:req.body.mensaje, estado:req.body.estado}
        });
        return;
    }
    await EstadoModel.findByIdAndUpdate(
        {_id: req.params.id},{nombre:req.body.nombre, mensaje:req.body.mensaje, estado:req.body.estado}
    );
    res.redirect('/listado');
});


/*
app.get('/buscar/:id', async function(req, res) {
    var listado = await EstadoModel.find({_id: req.params.id});
    res.send(listado);
});
*/




app.listen(80, function() {
    console.log('App en localhost');
});