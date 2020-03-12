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

const ElementSchema = mongoose.Schema
({ 
    nombre: String,
    estado: String,
    mensaje: String
})// definicion de estructura


const ElementModel = mongoose.model('Element',ElementSchema);

app.use(express.urlencoded({extended: true})); //Para evitar warnings 

// Parte de programación - sentimómetro

app.get('/alta', function(req, res) {res.render('formulario');})

app.post('/alta', async function(req, res) {
    
    if (req.body.nombre=='' || req.body.mensaje=='') 
    {
        res.render('formulario', {error: 'Complete los campos obligatorios',datos:
                                 {nombre:req.body.nombre, estado:req.body.estado, mensaje:req.body.mensaje}});
        return;
    }
    await ElementModel.create({nombre:req.body.nombre, estado:req.body.estado, mensaje:req.body.mensaje});
    res.redirect('/listado');
});

app.get('/listado', async function(req, res) {
    var list = await ElementModel.find().lean();
    //res.redirect('/alta');

    res.render('listado', {listado: list});
});

app.get('/borrar/:id', async function(req, res) {
    // :id -> req.params.id
    await ElementModel.findByIdAndRemove(
        {_id: req.params.id}
    );
    res.redirect('/listado');
}); 


app.get('/editar/:id', async function(req, res) {
    var buffer = await ElementModel.findById({_id: req.params.id}).lean();
    res.render('formulario', {datos: buffer});
});

app.post('/editar/:id', async function(req, res) {
    if (req.body.nombre=='' || req.body.mensaje=='') {
        res.render('formulario', {error: 'Complete los campos obligatorios', datos: 
                                 {nombre:req.body.nombre, mensaje:req.body.mensaje, estado:req.body.estado}});
        return;
    }
    await ElementModel.findByIdAndUpdate(
        {_id: req.params.id},{nombre:req.body.nombre, mensaje:req.body.mensaje, estado:req.body.estado}
    );
    res.redirect('/listado');
});


app.listen(80, function() {
    console.log('App en localhost');
});