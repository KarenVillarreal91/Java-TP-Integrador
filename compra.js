
function traerResumen(){
    let cantidad = document.getElementById('cantidad').value;
    let descuento = document.getElementById('categoria').value;

    if(cantidad > 0){
        if(descuento == '0'){
            descuento = 0.2;
        }
        else if(descuento == '1'){
            descuento = 0.5;
        }
        else{
            descuento = 0.85;
        }
    
        let precioTotal = 200 * cantidad;
        mostrarResumen(precioTotal * descuento);
    }
}

function mostrarResumen(total){
    document.getElementById('totalTexto').innerHTML = 'Total a Pagar: $' + total;
    document.getElementById('totalDiv').removeAttribute('hidden');
}

function borrar(){
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('correo').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('totalDiv').setAttribute('hidden', true);
}