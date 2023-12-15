function enviar(){
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let tema = document.getElementById('tema').value;
    
    fetch(`http://localhost:8080/web-app-23544/api/orador?nombre=${nombre}&apellido=${apellido}&mail=${email}&tema=${tema}`, {
        method:"POST"
    })
}