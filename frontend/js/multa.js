//se almacena la url de la api
let url="http://127.0.0.1:8000/libreria/api/v1/multa/";
function listarmulta() {
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
            let cuerpoTablamulta = document.getElementById("cuerpoTablamulta");
            cuerpoTablamulta.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdausuario_multado = document.createElement("td");
                let celdaprestamo = document.createElement("tr");
                let celdaValorMulta = document.createElement("td");
                let celdaestado_multa = document.createElement("td");
                // let celdaEditar = document.createElement("td");
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id"];
                celdaValorMulta.innerText = result[i]["valor_multa"];
                celdausuario_multado.innerText = result[i]["usuario_multado"]["nombres"];
                celdaprestamo.innerText = result[i]["prestamo"]["prestamo"];
                celdaestado_multa.innerText = result[i]["estado_multa"];
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaValorMulta);
                trRegistro.appendChild(celdausuario_multado);
                trRegistro.appendChild(celdaprestamo);
                trRegistro.appendChild(celdaestado_multa);
                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarventas= document.createElement("button");
                botonEditarventas.value=result[i]["id"];
                botonEditarventas.innerHTML="Editar"; 

                botonEditarventas.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarmultaID(this.value); 
                }
                botonEditarventas.className= "btn btn-primary"

                celdaOpcion.appendChild(botonEditarventas); 
                trRegistro.appendChild(celdaOpcion);

                cuerpoTablamulta.appendChild(trRegistro);//se traen todos los registros

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
function registrarmulta() {
    
    let usuario_multado = document.getElementById("usuario_multado").value;
    let valor_multa = document.getElementById("valor_multa").value;
    let prestamo = document.getElementById("prestamo").value;
    let estado_multa = document.getElementById("estado_multa").value;

    let formData = {
        
        "valor_multa": valor_multa,
        "usuario_multado": usuario_multado,
        "prestamo": prestamo,
        "estado_multa": estado_multa
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
          // window.location.href= "http://127.0.0.1:5500/front_end/usuario_multadoRegistro.html";
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


//Paso para que el usuario_multado se registre y llene todos los datos correctamente :D****
function validarCampos() {
  
  let valor_multa = document.getElementById("valor_multa");
  var usuario_multado = document.getElementById("usuario_multado"); 


  return  validarNombreusuario_multado(usuario_multado);
}

function validarNombreusuario_multado(campo){
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



function CargarFormulario() {
  cargarusuario_multado();
  cargarprestamo();
  cargarMulta();
}
//funcion para traer los usuario_multados
function cargarusuario_multado() {
  let urlusuario = "http://127.0.0.1:8000/libreria/api/v1/usuarios/";

  $.ajax({
    url: urlusuario,
    type: "GET",
    success: function (result) {
      let usuario_multado = document.getElementById("usuario_multado");
      usuario_multado.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        let usuario = document.createElement("option");
        usuario.value = result[i]["id"];
        usuario.innerText = nombre_completo_usuario =
          result[i]["nombres"]
          usuario_multado.appendChild(usuario);
        
      }
    },
  });
}
function cargarprestamo() {
  let urlprestamo = "http://127.0.0.1:8000/libreria/api/v1/prestamo/";

  $.ajax({
    url: urlprestamo,
    type: "GET",
    success: function (result) {
      let prestamo_multa = document.getElementById("prestamo");
      prestamo_multa.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        let estado_prestamo = document.createElement("option");
        estado_prestamo.value = result[i]["id"];
        estado_prestamo.innerText = prestamo_estado =
          result[i]["estado_prestamo"]
          prestamo_multa.appendChild(estado_prestamo);
        
      }
    },
  });
}
function cargarMulta() {
  let urlmulta = "http://127.0.0.1:8000/libreria/api/v1/multa/";

  $.ajax({
    url: urlmulta,
    type: "GET",
    success: function (result) {
      let multaestado = document.getElementById("estado_multa");
      multaestado.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        let estado_multa = document.createElement("option");
        estado_multa.value = result[i]["id"];
        estado_multa.innerText = estadoMulta =
          result[i]["estado_multa"]
          multaestado.appendChild(estado_multa);
        
      }
    },
  });
}


//Cuando le damos click al boton de guardar, este llamara a la function updateventas por medio del onclick******
function updatemultas() {
    var id = document.getElementById("id").value;

    let formData = {
        "valor_multa": document.getElementById("valor_multa").value,
        "usuario_multado": document.getElementById("usuario_multado").value,
        "prestamo": document.getElementById("prestamo").value,
        "estado_multa": document.getElementById("estado_multa").value
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
            
            listarmulta(); //Lista los médicos después de actualizar
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
function consultarmultaID(id){
    //alert(id);
    $.ajax({
        url: url + id+"/",
        type:"GET",
        success: function(result){
            console.log(result);
            document.getElementById("id").value=result["id"];
            document.getElementById("valor_multa").value=result["valor_multa"];
            document.getElementById("usuario_multado").value=result["usuario_multado"];
            document.getElementById("prestamo").value = result["prestamo"]
            document.getElementById("estado_multa").value=result["estado_multa"];
        }
    });
}
function limpiar(){
    document.getElementById("valor_multa").className="form-control";
    document.getElementById("usuario_multado").className="form-control";
    document.getElementById("prestamo").className = "form-control";
    document.getElementById("estado_multa").className="form-control";
    
    document.getElementById("valor_multa").value = "";
    document.getElementById("usuario_multado").value = "";
    document.getElementById("prestamo").value = "";
    document.getElementById("estado_multa").value="";
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
            listarmulta();//recarga la lista de ventass
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





