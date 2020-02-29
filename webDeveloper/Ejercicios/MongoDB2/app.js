var express = require('express');
var app = express ();
var mongoose = require('mongoose');
var hbs = require('express-handlebars');

app.engine('handlebars', hbs());
app.set('view engine','handlebars');

mongoose.Promise = global.Promise;

app.use(express.urlencoded({extended:true})); // para traducir la informacion, si no no interpreta las definiciones


async function conectar(){
    await mongoose.connect('mongodb://10.128.35.136:27017/curso',{iseNewUrlParser: true}) // para usarlo en tu pc usarias 'localhost'
    console.log('Conectado!');
}

conectar();

const ArtistaSchema = mongoose.Schema({ 
    nombre: String,
    apellido: String
}); // definicion de estructura

const ArtistaModel = mongoose.model('Artista', ArtistaSchema)

app.get ('/', async function(req, res){
    var listado = await ArtistaModel.find();
    res.send(listado)
});

app.get ('/listado', async function(req, res){
    var nomina = await ArtistaModel.find().lean();
    
    res.render('listado',{listado: nomina});
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

app.get('/alta',function(req,res){
    res.render('formulario');
}) // muestra el formulario para cargar

app.post('/alta', async function(req,res)
{
    let name = req.body.nombre;
    let len = name.length;
    

    console.log(len);
        if(name =="")
        {
            res.render('formulario',{error: 'Ingrese un nombre valido'})
            console.log(req.body);
        }
        else if(len<3)
        {
            res.render('formulario',{errorDos: 'el nombre es muy corto', nombre: name})
        }
        else
        {
            await ArtistaModel.create({nombre: req.body.nombre, apellido: req.body.apellido});
            res.redirect('/listado');
        }
}); //recibe la info cargada y con eso realiza una accion

app.get('/borrar/:id',async function(req,res){
    var buffer = await ArtistaModel.findByIdAndRemove(req.params.id)

    res.redirect('/listado');
}) //ese :id se transforma en req.params.id

app.get('/modificar/:id',async function(req,res){
    var buffer = await ArtistaModel.findById(req.params.id).lean();
    res.render('formulario', {datos: buffer});
    
    //res.redirect('/listado');
}) //ese :id se transforma en req.params.id

app.post('/modificar/:id', async function(req,res)
{
    await ArtistaModel.findByIdAndUpdate(req.params.id,{nombre: req.body.nombre, apellido: req.body.apellido});
    res.redirect('/listado');
}); //recibe la info cargada y con eso realiza una accion


app.listen(80,function(){
    console.log('App en localHost');
});