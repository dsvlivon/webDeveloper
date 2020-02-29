var express = require('express'); // config para express
var axios = require('axios'); // config para axios

var hbs = require('express-handlebars') // config para handlebar
var app = express(); // config para express
app.use(express.static('public')); //configuración para archivos estaticos

app.use(express.urlencoded({extended:true}));
 
app.engine('handlebars',hbs());// config para handlebar
app.set('view engine','handlebars');// config para handlebar

app.get('/formulario',function(req,res){
    res.render('formulario');
})

app.post('/procesar_alta', function(req,res)
{
    let name = req.body.nombre;
    let len = name.length;
    let check = req.body.check;

    console.log(len);
        if(name =="")
        {
            res.render('formulario',{error: 'Ingrese un nombre valido'})
            console.log(req.body);
        }
        else if(!check)
        {
            res.render('formulario',{errorDos: 'Falta el check',nombre: name})
        }
        else if(len<5)
        {
            res.render('formulario',{errorTres: 'el nombre es muy corto', nombre: name, check: check})
        }
        else
        {
            res.render('exito',{correct: 'Nombre correcto'})
        }
});

app.get('/listado',async function(req,res){
    try
    {
        let answer = await axios.get('https://api.mercadolibre.com/sites/MLA/categories');
        let listado = answer.data;
    
    
    res.render('listado',{element: listado});
    }
    catch(e)
    {
        res.send('Error');
    }
})

app.listen(8080, function()
{
    console.log('App escuchando en el puerto 8080');
});
