function suma()
{
    var elementUno = parseInt(document.getElementById("txtNumero1").value);
    var elementDos = parseInt(document.getElementById("txtNumero2").value);

    var res = elementDos + elementUno;

    document.getElementById("result").value = res;

}
function clean()
{
    var buffer = " ";
    
    document.getElementById("txtNumero1").value = buffer;
    document.getElementById("txtNumero2").value = buffer;
    document.getElementById("result").value = buffer;
}