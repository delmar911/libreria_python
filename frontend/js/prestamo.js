//se almacena la url de la api
let url="http://127.0.0.1:8000/libreria/api/v1/prestamo/";//se debe cambiar la url cuando de conecta por movil

function listarPrestamo() {
    var busqueda = document.getElementById("buscar").value;
    var urlBusqueda = url;
    if (busqueda!=""){
        urlBusqueda+="?search="+busqueda;
    }   
    $.ajax({
        url:urlBusqueda,
        type: "GET",
        success: function(result){//success: funcion que se ejecuta cusndo la peticion tiene exito
            console.log(result);
            let curpoTablaprestamo = document.getElementById("curpoTablaprestamo");
            curpoTablaprestamo.innerHTML="";
            console.log(result);
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdafecha_prestamo = document.createElement("td");
                let celdaDevolucion = document.createElement("td");
                let celdausuario = document.createElement("td");
                let celdaLibro = document.createElement("td");
                let celdaestado_prestamo = document.createElement("td");
                // let celdaEditar = document.createElement("td");
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id"];
                celdafecha_prestamo.innerText= result[i]["fecha_prestamo"];
                celdaDevolucion.innerText = result[i]["fecha_devolucion"];
                obtenerNombreUsuario(result[i]["usuario"], celdausuario);
                obtenerTituloLibro(result[i]["libro"], celdaLibro);
                celdaestado_prestamo.innerText = result[i]["estado_prestamo"];
               
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdafecha_prestamo);
                trRegistro.appendChild(celdaDevolucion);
                trRegistro.appendChild(celdausuario);
                trRegistro.appendChild(celdaLibro);
                trRegistro.appendChild(celdaestado_prestamo);
                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarventas= document.createElement("button");
                botonEditarventas.value=result[i]["id"];
                botonEditarventas.innerHTML="Editar"; 

                botonEditarventas.onclick=function(e){
                    $('#exampleModal').modal('show');
                    CargarFormulario();
                    consultarPrestamoID(this.value); 
                }
                botonEditarventas.className= "btn btn-primary"

                celdaOpcion.appendChild(botonEditarventas); 
                trRegistro.appendChild(celdaOpcion);

                curpoTablaprestamo.appendChild(trRegistro);//se traen todos los registros

                 //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                 let botonDeshabilitarventas= document.createElement("button");
                 botonDeshabilitarventas.innerHTML="<i class='fa-solid fa-trash'></i>"; 
                 botonDeshabilitarventas.className="btn btn-danger"; 
 
                 let ventasIdParaDeshabilitar= result[i]["id"]; 
                 botonDeshabilitarventas.onclick=function(){
                   deshabilitarventas(ventasIdParaDeshabilitar);
                 }
                 celdaOpcion.appendChild(botonDeshabilitarventas); 
                 trRegistro.appendChild(celdaOpcion)
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
 
}
function obtenerNombreUsuario(id, celdaUsuario) {
  // Hacer una petición AJAX para obtener el nombre del usuario
  $.ajax({
      url: 'http://127.0.0.1:8000/libreria/api/v1/usuarios/'+ id + '/',  // Ajusta la URL según tu configuración
      type: 'GET',
      success: function (usuario) {
          celdaUsuario.innerText = usuario.nombres;
      },
      error: function (error) {
          console.error('Error obteniendo nombre de usuario: ', error);
      }
  });
}

function obtenerTituloLibro(id, celdaLibro) {
  // Hacer una petición AJAX para obtener el título del libro
  $.ajax({
      url: 'http://127.0.0.1:8000/libreria/api/v1/libros'+ '/' + id + '/',  // Ajusta la URL según tu configuración
      type: 'GET',
      success: function (libro) {
          celdaLibro.innerText = libro.titulo;
      },
      error: function (error) {
          console.error('Error obteniendo título de libro: ', error);
      }
  });
}

//Paso para crear el registro de un médico ****
function registrarPrestamo() {
    
    let fecha_prestamo = document.getElementById("fecha_prestamo").value;
    let fecha_devolucion = document.getElementById("fecha_devolucion").value;
    let usuario = document.getElementById("usuario").value;
    let libro = document.getElementById("libro").value;
    let estado_prestamo = document.getElementById("estado_prestamo").value;

    let formData = {
        
        "fecha_prestamo": fecha_prestamo,
        "fecha_devolucion": fecha_devolucion,
        "usuario": usuario,
        "libro": libro,
        "estado_prestamo": estado_prestamo
    };
    if(validarCampos()){

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        success: function(result){
          Swal.fire({
            title: "Excelente",
            text: "Su registro se guardó correctamente",
            icon: "success"
          });
          // window.location.href= "http://127.0.0.1:5500/front_end/usuarioRegistro.html";
        },
        error: function(error){
          Swal.fire("Error", "Error al guardar "+error.responseText, "error");
        }
      });
    }else{
     // alert("llena los campos correctamente")
      Swal.fire({
        title: "Error!",
        text: "complete los campos correctamente",
        icon: "error"
      });
    }
}


prestamo:

function validarCampos() {
   
    var fecha_prestamo = document.getElementById("fecha_prestamo");
    var fecha_devolucion = document.getElementById("fecha_devolucion");
    var usuario = document.getElementById("usuario"); 
    var libro = document.getElementById("libro"); 
    var estado_prestamo = document.getElementById("estado_prestamo"); 

    return validarFechaPrestamo(fecha_prestamo) && validarFechaDevolucion(fecha_devolucion) && validarUsuarioPrestamo(usuario) 
    && validarLibroPrestado(libro) && validarEstadoPrestamo(estado_prestamo);
}

function validarFechaPrestamo(fecha_prestamo) {
    if (!fecha_prestamo || !fecha_prestamo.value) {
        return false;
    }

    let valor = fecha_prestamo.value;
    let valido = true;
    if (valor.length < 1 || valor.length > 60) {
        valido = false;
    }

    if (valido) {
      fecha_prestamo.className = "form-control is-valid";
    } else {
      fecha_prestamo.className = "form-control is-invalid";
    }
    return valido;
}


function validarFechaDevolucion(fechaDevolucion) {
    if (!fechaDevolucion || !fechaDevolucion.value) {
        return false;
    }

    let valor = fechaDevolucion.value;
    let valido = true;
    if (valor.length < 1 || valor.length > 60) {
        valido = false;
    }

    if (valido) {
        fechaDevolucion.className = "form-control is-valid";
    } else {
        fechaDevolucion.className = "form-control is-invalid";
    }
    return valido;
}


function validarUsuarioPrestamo(usuarioPrestamo){
    var valido=true;
    if(usuarioPrestamo.value.length <=0 || usuarioPrestamo.value.length > 45){
        valido=false;
    }

    if (valido) {
        usuarioPrestamo.className = "form-control is-valid"
    }
    else{
        usuarioPrestamo.className = "form-control is-invalid"
    }
    return valido;
}

function validarLibroPrestado(libroPrestado){
    var valido=true;
    if(libroPrestado.value.length <=0 || libroPrestado.value.length > 100){
        valido=false;
    }

    if (valido) {
        libroPrestado.className = "form-control is-valid"
    }
    else{
        libroPrestado.className = "form-control is-invalid"
    }
    return valido;
}

function validarEstadoPrestamo(estado){
    var valido=true;
    if(estado.value.length <= 0 || estado.value.length > 20){
        valido=false;
    }

    if (valido) {
        estado.className = "form-control is-valid"
    }
    else{
        estado.className = "form-control is-invalid"
    }
    return valido;
}




function CargarFormulario() {
  cargarUsuario();
  cargarLibro();

}
//funcion para traer los usuarios
function cargarUsuario() {
  let urlusuario = "http://127.0.0.1:8000/libreria/api/v1/usuarios/";

  $.ajax({
    url: urlusuario,
    type: "GET",
    success: function (result) {
      let usuario_prestamo = document.getElementById("usuario");
      usuario_prestamo.innerHTML = '<option selected disabled value="">Seleccione el usuario</option>';
      for (let i = 0; i < result.length; i++) {
        let usuario = document.createElement("option");
        usuario.value = result[i]["id"];
        usuario.innerText = nombre_completo_usuario =
          result[i]["nombres"]
          usuario_prestamo.appendChild(usuario);
        
      }
    },
  });
}
function cargarLibro() {
  let urlLibro = "http://127.0.0.1:8000/libreria/api/v1/libros/";

  $.ajax({
    url: urlLibro,
    type: "GET",
    success: function (result) {
      let libro_prestamo = document.getElementById("libro");
      libro_prestamo.innerHTML = '<option selected disabled value="">Seleccione el libro</option>';
      for (let i = 0; i < result.length; i++) {
        let libro = document.createElement("option");
        libro.value = result[i]["id"];
        libro.innerText = libro_titulo = result[i]["titulo"]
        libro_prestamo.appendChild(libro);
      
      }
    },
  });
}




//Cuando le damos click al boton de guardar, este llamara a la function updateventas por medio del onclick******
function updatePrestamo() {
    var id = document.getElementById("id").value;

    let formData = {
        "fecha_prestamo": document.getElementById("fecha_prestamo").value,
        "fecha_devolucion": document.getElementById("fecha_devolucion").value,
        "usuario": document.getElementById("usuario").value,
        "libro": document.getElementById("libro").value,
        "estado_prestamo": document.getElementById("estado_prestamo").value,
       
    };


    //Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE *****
    if(validarCampos()){
    $.ajax({
        url: url + id+"/",
        type: "PUT",
        data: formData,
        success: function(result) {
            Swal.fire({
                title: "Excelente",
                text: "Su registro se actualizó correctamente",
                icon: "success"
            });
            
            var modal = document.getElementById("exampleModal"); 
            modal.style.display = "hide";
            
            listarventas(); //Lista los médicos después de actualizar
        },
        error: function(error) {
            Swal.fire("Error", "Error al guardar", "error");
        }  
    });
    }else{
        Swal.fire({
            title: "Error!",
            text: "Complete los campos correctamente",
            icon: "error"
        });
        }
}


/* metodo para obtener los datos en el modal de actualizar*/ 
//1.Crear petición que traiga la información del ventas por id
function consultarPrestamoID(id){
    //alert(id);
    $.ajax({
        url: url + id+"/",
        type:"GET",
        success: function(result){
            console.log(result);
            document.getElementById("id").value=result["id"];
            document.getElementById("fecha_prestamo").value=result["fecha_prestamo"];
            document.getElementById("fecha_devolucion").value=result["fecha_devolucion"];
            document.getElementById("usuario").value=result["usuario"];
            document.getElementById("libro").value = result["libro"];
            document.getElementById("estado_prestamo").value = result["estado_prestamo"];
        
     },
     error: function(error) {
         console.error('Error obteniendo detalles del préstamo: ', error);
     }
 });
}


function limpiar(){
    document.getElementById("fecha_prestamo").className="form-control";
    document.getElementById("fecha_devolucion").className="form-control";
    document.getElementById("usuario").className="form-control";
    document.getElementById("libro").className = "form-control";
    document.getElementById("estado_prestamo").className="form-control";

    document.getElementById("fecha_prestamo").value = "";
    document.getElementById("fecha_devolucion").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("libro").value = "";
    document.getElementById("estado_prestamo").value="";
}
// funcion  de deshabilitar ventas
function deshabilitarventas(id){
    swal.fire({
      title: '¿Estás seguro?',
      text: "Esta opción no tiene marcha atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonText:'Cancelar',
      cancelButtonColor:'#d33',
      confirmButtonText:'Sí, deshabilitar!',
  
    }).then((result)=>{
      if (result.isConfirmed){
        $.ajax({
          url: url +id,
          type: "DELETE",
          success: function(result){
            swal.fire(
              'Deshabilitado',
              'El registro ha sido deshabilitado ',
              'success'
            );
            listarventas();//recarga la lista de ventass
          },
          error: function(error){
            Swal.fire(
              'Error',
              'No se puede deshabilitar el registro ',
              'Error',
            );
          }
        });
      }
    });
  }





