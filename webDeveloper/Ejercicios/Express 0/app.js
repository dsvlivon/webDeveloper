var express = require('express'); // config para express
var app = express(); // config para express
var nodemailer = require('nodemailer'); // config para mailer
var hbs = require('express-handlebars') // config para handlebar

app.use(express.static('public')); //configuración para archivos estaticos
app.use(express.urlencoded({extended: true})); // config para miler
 
app.engine('handlebars',hbs());// config para handlebar
app.set('view engine','handlebars');// config para handlebar


var transporter = nodemailer.createTransport
({
    service: 'gmail',
    auth:
    {
        user: 'dsvlivon@gmail.com',
        pass: 'guismo11'
    }
});





//si ingresa a http://localhost/hola ejecuta la callback "function"
app.get('/', function(req,res) // req y res son nombres de parametros por convension
{
    res.send('Pagina Principal');
});


app.get('/hola', function(req,res)
{
    //res.send('Bienvenido'+req.params.nombre);
    res.send(`Bienvenido ${req.query.nombre}`);
});


//http://localhost/hola?nombre=tuVieja
app.get('/hola/:nombre', function(req,res) // req y res son nombres de parametros por convension
{
    //req.query.nombre
    //res.send('Bienvenido'+req.query.nombre);
    res.send('Bienvenido'+req.params.nombre);
});


app.post('/contacto', function(req,res){
    var option = 
    {
        from: 'dsvlivon@gmail.com',
        to: 'dsvlivon@gmail.com',
        subject: 'prueba',
        text: 'cuerpo del mail'
    }
    transporter.sendMail(option, function(error, data){
        if(error)
        {
            res.send('No se pudo enviar el mail');
        }
        else
        {
            res.send(req.body.nombre);
            res.send(req.body.telefono);
            res.send(req.body.mensaje); 
        }
    });    
    
});

app.get('/acerca',function(req,res){
    res.render('acerca',{titulo: 'Mi titulo'});
    res.render('acerca',{body: 'Mi texto'});
})


app.get('/formulario',function(req,res){
    res.render('formulario');
})

app.post('/procersar_alta', function(req,res){
    res.send(req.body.nombre);
});
app.listen(8080, function()
    {
        console.log('App escuchando en el puerto 8080');
    });
