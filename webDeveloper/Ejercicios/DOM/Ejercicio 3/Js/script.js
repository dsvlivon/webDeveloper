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

function clickCounter()
{
    var count=0;

    count++;
    
    return count;
}

function colorCh()
{
    var flag = clickCounter;

    if(flag/flag==1)
    {
        document.getElementById("caja").style.background ="yellow";    
    }
    else
    {
        document.getElementById("caja").style.background ="blue";    
    }
}

function colorChY() 
{
    document.getElementById("caja").style.background ="yellow";
}
function colorChA() 
{
    document.getElementById("caja").style.background ="blue";
}

function show() 
{
    document.getElementById("caja").style.show;
}
function hide() 
{
    document.getElementById("caja").style.hide;
}

function cambioColorFondo() 
{
    cuerpo.style.backgroundColor = document.getElementById("color").value;
}