function enviar(){
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let mail = document.getElementById('mail').value;
    let tema = document.getElementById('tema').value;
    
    fetch(`http://localhost:8080/web_app_23544_war_exploded/api/orador`, {
        mode: 'no-cors',
        method:"POST",
        body:JSON.stringify({
            nombre:nombre,
            apellido:apellido,
            mail:mail,
            tema:tema
        })
    });
}

async function modificar(id){

    const { value: formValues } = await Swal.fire({
        title: "Modificación",
        html:`
        <label for="nombre" class="form-label text-start">Nombre</label>
        <input class="form-control" placeholder="Nombre" aria-label="Nombre" id="nombre">
        <label for="apellido" class="form-label text-start">Apellido</label>
        <input class="form-control" placeholder="Apellido" aria-label="Apellido" id="apellido">
        <label for="mail" class="form-label text-start">Email</label>
        <input class="form-control" placeholder="Email" aria-label="Email" id="mail">
        <label for="tema" class="form-label text-start">Tema</label>
        <input class="form-control" placeholder="Tema" aria-label="Tema" id="tema">`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return [
                document.getElementById("nombre").value,
                document.getElementById("apellido").value,
                document.getElementById("mail").value,
                document.getElementById("tema").value
            ];
        }
    });
    
    if(formValues){
        fetch(`http://localhost:8080/web_app_23544_war_exploded/api/orador?id=${id}`, {
            method:"PUT",
            body:JSON.stringify({
                nombre:formValues[0],
                apellido:formValues[1],
                mail:formValues[2],
                tema:formValues[3]
            })
        })
        .then(()=>{
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Modificado correctamente!"
              });
            
              traer();
        });
        
    }
}

function eliminar(id){
    fetch(`http://localhost:8080/web_app_23544_war_exploded/api/orador?id=${id}`, {
        method:"DELETE"
    })
    .then(()=>{
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Eliminado correctamente!"
          });
        
          traer();
    });
}

async function traer(){
    let filas = '';

    await fetch(`http://localhost:8080/web_app_23544_war_exploded/api/orador`)
    .then(res => {
        res.json()
        .then(data => {
            for(let orador of data){
                filas += `
                <tr>
                    <td>${orador.id}</td>
                    <td>${orador.nombre}</td>
                    <td>${orador.apellido}</td>
                    <td>${orador.mail}</td>
                    <td>${orador.tema}</td>
                    <td>${orador.fechaAlta}</td>
                    <td>
                        <button type="button" class="btn btn-outline-info btn-sm" onclick="modificar(${orador.id})">Modificar</button>
                        <button type="button" class="btn btn-outline-danger btn-sm" onclick="eliminar(${orador.id})">Eliminar</button>
                    </td>
                </tr>
                `;
            }
            
            document.getElementById("tabla").innerHTML = filas;
        })
    });

}

traer();

