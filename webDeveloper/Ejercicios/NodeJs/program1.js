function llamarLuegoDe3Seg() {
    console.log('Me llamo luego de 3 segundos');
}
console.log('Antes');
setTimeout(llamarLuegoDe3Seg, 3000);
console.log('Despues');


setInterval(llamarLuegoDe3Seg, 3000); //buclea hasta que apriete ctrl+c

setInterval(1000) // ejemplo de promise
    .then(llamarLuegoDe3Seg)
    .catch(llamarError)

async functionx()
{
    await setInterval(1000);
    llamarLuegoDe3Seg();
}