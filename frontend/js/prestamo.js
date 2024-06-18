//se almacena la url de la api
let url="http://127.0.0.1:8000/libreria/api/v1/prestamo/";
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
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdafecha_prestamo = document.createElement("td");
                let celdaDevolucion = document.createElement("td");
                let celdausuario = document.createElement("td");
                let celdaLibro = document.createElement("tr");
                let celdaestado_prestamo = document.createElement("td");
                // let celdaEditar = document.createElement("td");
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id"];
                celdafecha_prestamo.innerText= result[i]["fecha_prestamo"];
                celdaDevolucion.innerText = result[i]["fecha_devolucion"];
                celdausuario.innerText = result[i]["usuario"]["nombres"];
                celdaLibro.innerText = result[i]["libro"]["titulo"];
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


//Paso para que el usuario se registre y llene todos los datos correctamente :D****
function validarCampos() {
  var fecha_prestamo = document.getElementById("fecha_prestamo");
  let fecha_devolucion = document.getElementById("fecha_devolucion");
  var usuario = document.getElementById("usuario"); 


  return validarfecha_prestamoventas(fecha_prestamo)
       && validarNombreusuario(usuario);
}

function validarNombreusuario(campo){
  var valido=true;
  if(campo.value.length < 3 || campo.value.length > 45){
      valido=false;
  }

  if (valido) {
      campo.className = "form-control is-valid"
  }
  else{
      campo.className = "form-control is-invalid"
  }
  return valido;
}


function validarfecha_prestamoventas(Numero) {
  
  let valor = Numero.value;
  let valido = true;
  if (valor.length <= 0  ) {
      valido = false
  }

  if (valido) {
      Numero.className = "form-control is-valid"
  }
  else{
      Numero.className = "form-control is-invalid"
  }
  return valido;
}

function CargarFormulario() {
  cargarUsuario();
  cargarLibro();
  cargarEstado();
}
//funcion para traer los usuarios
function cargarUsuario() {
  let urlusuario = "http://127.0.0.1:8000/libreria/api/v1/usuarios/";

  $.ajax({
    url: urlusuario,
    type: "GET",
    success: function (result) {
      let usuario_prestamo = document.getElementById("usuario_prestamo");
      usuario_prestamo.innerHTML = "";
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
      let libro_prestamo = document.getElementById("libro_prestamo");
      libro_prestamo.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        let libro = document.createElement("option");
        libro.value = result[i]["id"];
        libro.innerText = libro_titulo = result[i]["titulo"]
          libro_prestamo.appendChild(libro);
        
      }
    },
  });
}
function cargarEstado() {
  let urlPrestamo = "http://127.0.0.1:8000/libreria/api/v1/prestamo/";

  $.ajax({
    url: urlPrestamo,
    type: "GET",
    success: function (result) {
      let estado_prestamo = document.getElementById("estado_prestamo");
      estado_prestamo.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        let estado = document.createElement("option");
        estado.value = result[i]["id"];
        estado.innerText = prestamo_estado =
          result[i]["estado_prestamo"]
          estado_prestamo.appendChild(estado);
        
      }
    },
  });
}


//Cuando le damos click al boton de guardar, este llamara a la function updateventas por medio del onclick******
function updatePrestamos() {
    var id = document.getElementById("id").value;

    let formData = {
        "fecha_prestamo": document.getElementById("fecha_prestamo").value,
        "fecha_devolucion": document.getElementById("fecha_devolucion").value,
        "usuario": document.getElementById("usuario").value,
        "libro": document.getElementById("libro").value,
        "estado_prestamo": document.getElementById("estado_prestamo").value
    };


    //Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE *****
    if(validarCampos()){
    $.ajax({
        url: url + id,
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
            document.getElementById("libro").value = result["libro"]
            document.getElementById("estado_prestamo").value=result["estado_prestamo"];
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




