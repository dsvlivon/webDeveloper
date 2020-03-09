var express = require('express');
var app = express ();
var mongoose = require('mongoose');
var hbs = require('express-handlebars');

app.engine('handlebars', hbs());
app.set('view engine','handlebars');

mongoose.Promise = global.Promise;

app.use(express.urlencoded({extended:true})); // para traducir la informacion, si no no interpreta las definiciones


async function conectar(){
    await mongoose.connect('mongodb://localHost',{useNewUrlParser: true}) // para usarlo en tu pc usarias 'localhost'
    console.log('!!Conected!!');
}

conectar();

const ElementSchema = mongoose.Schema({ 
    nombre: String,
    apellido: String,
    estado: String,
    mensaje: String
}); // definicion de estructura

const ElementModel = mongoose.model('Element', ElementSchema)

app.get ('/', async function(req, res){
    var list = await ElementModel.find();
    res.send(list)
});

app.get ('/listado', async function(req, res){
    var nomina = await ElementModel.find().lean();
    
    res.render('listado',{list: nomina});
});

app.get('/alta',function(req,res){
    res.render('formulario');
}) // muestra el formulario para cargar

app.post('/alta', async function(req,res)
{
    let name = req.body.nombre;
    let lenName = name.length;
    let mensaje = req.body.mensaje;
    let lenMensaje = mensaje.length;

    console.log(len);
        if(name == "")
        {
            res.render('formulario',{error: 'Campo obliGATOrio'})
            console.log(req.body);
        }
        else if(mensaje == "")
        {
            res.render('formulario',{error: 'Manda un mensaje no seas aburrido!'})
            console.log(req.body);
        }
        else if(lenName<3)
        {
            res.render('formulario',{errorDos: 'el nombre es muy corto', nombre: name})
        }
        else if(len<10)
        {
            res.render('formulario',{errorTres: 'Eso solo? deci algo mas!', mensaje: mensaje})
        }
        else
        {
            await ElementModel.create({nombre: req.body.nombre, estado: req.body.estado, mensaje: req.body.mensaje});
            res.redirect('/listado');
        }
}); //recibe la info cargada y con eso realiza una accion

app.get('/borrar/:id',async function(req,res){
    var buffer = await ElementModel.findByIdAndRemove(req.params.id)
    res.redirect('/listado');
}) //ese :id se transforma en req.params.id

app.get('/modificar/:id',async function(req,res){
    var buffer = await ElementModel.findById(req.params.id).lean();
    res.render('formulario', {datos: buffer});
    
    //res.redirect('/listado');
}) //ese :id se transforma en req.params.id

app.post('/modificar/:id', async function(req,res)
{
    await ElementModel.findByIdAndUpdate(req.params.id,{nombre: req.body.nombre, apellido: req.body.apellido});
    res.redirect('/listado');
}); //recibe la info cargada y con eso realiza una accion


app.listen(80,function(){
    console.log('App en localHost');
});