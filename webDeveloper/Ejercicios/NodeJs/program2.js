function contarHasta100(fn) {
    setTimeout(function () { fn(); },3000);
}
function puntoYComa() {
    console.log('Punto y coma el que no se escondio se embroma');
}
console.log('Iniciando'); //Paso 1

contarHasta100(puntoYComa);// formato callback

// Poner el codigo aqui para llamar a contarHasta100 y pasar como callback la funcion punto y coma
console.log('Escondiendome');





function contarHasta100() 
{
    return new Promise(function(resolve, reject) 
    {
        setTimeout(function() 
        {
            resolve()
        }, 
        3000);
    });
}
function puntoYComa() {
    console.log('Punto y coma el que no se escondio se embroma');
}
console.log('Iniciando');
    contarHasta100.then(puntoYComa).catch(mensajeError);
console.log('Escondiendome');




async function iniciar()
{
    console.log('Iniciando');
    console.log('Escondiendome');
    await contarHasta100();
    puntoYComa();//esta funcion se debe llamar despues de contarHasta100
    

}