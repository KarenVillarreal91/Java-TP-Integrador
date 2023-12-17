function enviar(){
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let mail = document.getElementById('mail').value;
    let tema = document.getElementById('tema').value;
    
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

    if(nombre != '' && apellido != '' && mail != '' && tema != ''){

        fetch(`http://localhost:8080/web_app_23544_war_exploded/api/orador`, {
            mode: 'no-cors',
            method:"POST",
            body:JSON.stringify({
                nombre:nombre,
                apellido:apellido,
                mail:mail,
                tema:tema
            })
        })
        .then(()=>{
            Toast.fire({
                icon: "success",
                title: "Envíado correctamente!"
            });
            
            document.getElementById("nombre").value = "";
            document.getElementById("apellido").value = "";
            document.getElementById("mail").value = "";
            document.getElementById("tema").value = "";   
        });
    }
    else{
        Toast.fire({
            icon: "error",
            title: "No pueden quedar campos vacíos!"
        });
    }
}

async function modificar(orador){
    const { value: formValues } = await Swal.fire({
        title: "Modificación",
        html:`
        <label for="nombre" class="form-label mt-3">Nombre</label>
        <input class="form-control" placeholder="Nombre" aria-label="Nombre" id="nombre" value="${orador.nombre}">
        <label for="apellido" class="form-label mt-3">Apellido</label>
        <input class="form-control" placeholder="Apellido" aria-label="Apellido" id="apellido" value="${orador.apellido}">
        <label for="mail" class="form-label mt-3">Email</label>
        <input class="form-control" placeholder="Email" aria-label="Email" id="mail" value="${orador.mail}">
        <label for="tema" class="form-label mt-3">Tema</label>
        <input class="form-control" placeholder="Tema" aria-label="Tema" id="tema" value="${orador.tema}">`,
        showCancelButton: true,
        confirmButtonColor: "#60bb59",
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
        fetch(`http://localhost:8080/web_app_23544_war_exploded/api/orador?id=${orador.id}`, {
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

    Swal.fire({
        title: "¿Estás seguro de eliminar a este orador?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#60bb59",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if(result.isConfirmed){
            fetch(`http://localhost:8080/web_app_23544_war_exploded/api/orador?id=${id}`, {
                method:"DELETE"
            })
            .then(()=>{
                Toast.fire({
                    icon: "success",
                    title: "Eliminado correctamente!"
                });
                
                traer();
            });
        }
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
                        <button type="button" class="btn btn-outline-warning btn-mod-bor btn-sm" onclick="modificar(${JSON.stringify(orador).replace(/\"/g,"'")})"><i class="bi bi-pencil-fill"></i></button>
                        <button type="button" class="btn btn-outline-danger btn-mod-bor btn-sm" onclick="eliminar(${orador.id})"><i class="bi bi-trash3-fill"></i></button>
                    </td>
                </tr>
                `;
            }
            
            document.getElementById("tabla").innerHTML = filas;
        })
    });

}

if(window.location.pathname == "/TP-Integrador-Front/oradores.html" || window.location.pathname == "/oradores.html"){
    traer();
}

