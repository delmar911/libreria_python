//se almacena la url de la api
let url="http://localhost:8082/api/v1/cliente/";
function listarcliente() {
  var busqueda = document.getElementById("buscar").value;
  var urlBusqueda = url;
  if (busqueda!=""){
    urlBusqueda+="busquedafiltro/"+busqueda; 
   
  }
  
    $.ajax({
        url:urlBusqueda,
        type: "GET",
        success: function(result){//success: funcion que se ejecuta cusndo la peticion tiene exito
            console.log(result);
            let cuerpoTablacliente = document.getElementById("cuerpoTablacliente");
            cuerpoTablacliente.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaTipoDocumento = document.createElement("td");
                let celdaNumeroDocumento = document.createElement("td");
                let celdaNombres = document.createElement("td");
                let celdaApellidos = document.createElement("td");
                let celdaTelefono = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaDireccion = document.createElement("td");
                let celdaCiudad = document.createElement("td");
                let celdaEstado = document.createElement("td");

                //almacenamos en valor
                
                celdaId.innerText = result[i]["id_cliente"];
                celdaTipoDocumento.innerText= result[i]["tipo_documento"];
                celdaNumeroDocumento.innerText = result[i]["numero_documento"];
                celdaNombres.innerText = result[i]["nombres"];
                celdaApellidos.innerText = result[i]["apellidos"];
                celdaTelefono.innerText = result[i]["telefono"];
                celdaCorreo.innerText = result[i]["correo_electronico"];
                celdaDireccion.innerText = result[i]["direccion"];
                celdaCiudad.innerText = result[i]["ciudad"];
                celdaEstado.innerText = result[i]["estado"];
                
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTipoDocumento);
                trRegistro.appendChild(celdaNumeroDocumento);
                trRegistro.appendChild(celdaNombres);
                trRegistro.appendChild(celdaApellidos);
                trRegistro.appendChild(celdaTelefono);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaDireccion);
                trRegistro.appendChild(celdaCiudad);
                trRegistro.appendChild(celdaEstado);
                // trRegistro.appendChild(celdaEditar);

                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarcliente= document.createElement("button");
                botonEditarcliente.value=result[i]["id_cliente"];
                botonEditarcliente.innerHTML="Editar"; 

                botonEditarcliente.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarclienteID(this.value); 
                }
                botonEditarcliente.className= "btn btn-primary"

                celdaOpcion.appendChild(botonEditarcliente); 
                trRegistro.appendChild(celdaOpcion)

                cuerpoTablacliente.appendChild(trRegistro);//se traen todos los registros

                //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                let botonDeshabilitarcliente= document.createElement("button");
                botonDeshabilitarcliente.innerHTML="<i class='fa-solid fa-trash'></i>"; 
                botonDeshabilitarcliente.className="btn btn-danger"; 

                let clienteIdParaDeshabilitar= result[i]["id_cliente"]; 
                botonDeshabilitarcliente.onclick=function(){
                  deshabilitarcliente(clienteIdParaDeshabilitar);
                }
                celdaOpcion.appendChild(botonDeshabilitarcliente); 
                trRegistro.appendChild(celdaOpcion)
            }

        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
}
function estadofiltro() {
  
  var estadofiltro = document.getElementById("estadofiltro").value;
  var urlBusqueda = url;
  if (estadofiltro!=""){
    urlBusqueda+="estadofiltro/"+estadofiltro; 
   
  }
  
    $.ajax({
        url:urlBusqueda,
        type: "GET",
        success: function(result){//success: funcion que se ejecuta cusndo la peticion tiene exito
            console.log(result);
            let cuerpoTablacliente = document.getElementById("cuerpoTablacliente");
            cuerpoTablacliente.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaTipoDocumento = document.createElement("td");
                let celdaNumeroDocumento = document.createElement("td");
                let celdaNombres = document.createElement("td");
                let celdaApellidos = document.createElement("td");
                let celdaTelefono = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaDireccion = document.createElement("td");
                let celdaCiudad = document.createElement("td");
                let celdaEstado = document.createElement("td");

                //almacenamos en valor
                
                celdaId.innerText = result[i]["id_cliente"];
                celdaTipoDocumento.innerText= result[i]["tipo_documento"];
                celdaNumeroDocumento.innerText = result[i]["numero_documento"];
                celdaNombres.innerText = result[i]["nombres"];
                celdaApellidos.innerText = result[i]["apellidos"];
                celdaTelefono.innerText = result[i]["telefono"];
                celdaCorreo.innerText = result[i]["correo_electronico"];
                celdaDireccion.innerText = result[i]["direccion"];
                celdaCiudad.innerText = result[i]["ciudad"];
                celdaEstado.innerText = result[i]["estado"];
                
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTipoDocumento);
                trRegistro.appendChild(celdaNumeroDocumento);
                trRegistro.appendChild(celdaNombres);
                trRegistro.appendChild(celdaApellidos);
                trRegistro.appendChild(celdaTelefono);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaDireccion);
                trRegistro.appendChild(celdaCiudad);
                trRegistro.appendChild(celdaEstado);
                // trRegistro.appendChild(celdaEditar);

                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarcliente= document.createElement("button");
                botonEditarcliente.value=result[i]["id_cliente"];
                botonEditarcliente.innerHTML="Editar"; 

                botonEditarcliente.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarclienteID(this.value); 
                }
                botonEditarcliente.className= "btn btn-primary"

                celdaOpcion.appendChild(botonEditarcliente); 
                trRegistro.appendChild(celdaOpcion)

                cuerpoTablacliente.appendChild(trRegistro);//se traen todos los registros

                //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                let botonDeshabilitarcliente= document.createElement("button");
                botonDeshabilitarcliente.innerHTML="<i class='fa-solid fa-trash'></i>"; 
                botonDeshabilitarcliente.className="btn btn-danger"; 

                let clienteIdParaDeshabilitar= result[i]["id_cliente"]; 
                botonDeshabilitarcliente.onclick=function(){
                  deshabilitarcliente(clienteIdParaDeshabilitar);
                }
                celdaOpcion.appendChild(botonDeshabilitarcliente); 
                trRegistro.appendChild(celdaOpcion)
            }

        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
}
//que es Cors
function Registrarcliente() {

  let tipo_documento = document.getElementById("tipo_documento").value;
  let numero_documento = document.getElementById("numero_documento").value;
  let nombres = document.getElementById("nombres").value;
  let apellidos = document.getElementById("apellidos").value;
  let correo_electronico = document.getElementById("correo_electronico").value;
  let telefono = document.getElementById("telefono").value;
  let direccion = document.getElementById("direccion").value;
  let ciudad = document.getElementById("ciudad").value;
  let estado = document.getElementById("estado").value;


  let formData = {
    "tipo_documento": tipo_documento,
    "numero_documento": numero_documento,
    "nombres": nombres,
    "apellidos": apellidos,
    "correo_electronico": correo_electronico,
    "telefono": telefono,
    "direccion": direccion,
    "ciudad" : ciudad,
    "estado": estado
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
        // window.location.href= "http://127.0.0.1:5500/front_end/listacliente.html";
      },
      error: function(error){
        Swal.fire("Error", "Error al guardar "+error.responseText, "error");
      }
    });
  }else{
   // alert("llena los campos correctamente")
    Swal.fire({
      title: "Error!",
      text: "Complete los campos correctamente",
      icon: "error"
    });
  }
}

function validarCampos() {
  var numero_documento = document.getElementById("numero_documento"); 
  var nombres = document.getElementById("nombres"); 
  var apellidos = document.getElementById("apellidos"); 
  var direccion=document.getElementById("direccion");
  var telefono = document.getElementById("telefono"); 
  var ciudad = document.getElementById("ciudad"); 

  return validarNumeroDocumento(numero_documento) && validarNombreApellido(nombres) 
         && validarNombreApellido(apellidos) &&  validarTelefono(telefono) && validarDireccionCiudad(direccion)
         && validarDireccionCiudad(ciudad);

}

function validarNumeroDocumento(cuadroNumero){
    var valor=cuadroNumero.value; 
    var valido=true; 
    if(valor.length<5 || valor.length>10){
      valido=false    
    }
    if (valido) {
      //cuadro de texto cumple
      //se modifica la clase del cuadro de textp
      cuadroNumero.className="form-control is-valid";
    }else{
    //cuadro de texto no cumple 
    cuadroNumero.className="form-control is-invalid";
    }
  return valido; 
}

function validarNombreApellido(campo){
  var value=campo.value;
  var valido=true;
  if(value.length<3 || value.length>30){
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

function validarTelefono(Numero) {
    
  let valor = Numero.value;
  let valido = true;
  if (valor.length < 10 || valor.length >13) {
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


function validarDireccionCiudad(Direccion){
  let valor = Direccion.value;
  let valido = true;
  if (valor.length <=0 || valor.length >45) {
      valido = false
  }
  if (valido) {
    Direccion.className = "form-control is-valid"
  }
  else{
    Direccion.className = "form-control is-invalid"
  }
  return valido;
}


/*actualizar*/
function updatecliente(){
  var id_cliente=document.getElementById("id_cliente").value;
  console.log(id_cliente);
  let formData = {

      "tipo_documento" :  document.getElementById("tipo_documento").value,
      "numero_documento" : document.getElementById("numero_documento").value,
      "nombres" : document.getElementById("nombres").value,
      "apellidos" : document.getElementById("apellidos").value,
      "correo_electronico"  : document.getElementById("correo_electronico").value,
      "telefono" : document.getElementById("telefono").value,
      "direccion" : document.getElementById("direccion").value,
      "ciudad" : document.getElementById("ciudad").value,
      "estado" : document.getElementById("estado").value
  };

//Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE *****
if(validarCampos()){
  $.ajax({
      url: url + id_cliente,
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
          
          listarcliente(); //Lista los médicos después de actualizar
      },
      error: function(error) {
          Swal.fire("Error", "Error al guardar", "error");
      }  
  });
  }else{
      Swal.fire({
          title: "Error!",
          text: "complete los campos correctamente",
          icon: "error"
      });
      }
}




/* metodo para obtener los datos en el modal de actualizar*/ 
//1.Crear petición que traiga la información del cliente por id
function consultarclienteID(id){
  
  $.ajax({
      url:url+id,
      type:"GET",
      success: function(result){
        console.log(result);
        document.getElementById("id_cliente").value=result["id_cliente"];
        document.getElementById("tipo_documento").value=result["tipo_documento"];
        document.getElementById("numero_documento").value=result["numero_documento"];
        document.getElementById("nombres").value=result["nombres"];
        document.getElementById("apellidos").value=result["apellidos"];
        document.getElementById("correo_electronico").value=result["correo_electronico"];
        document.getElementById("telefono").value=result["telefono"];
        document.getElementById("direccion").value=result["direccion"];
        document.getElementById("ciudad").value=result["ciudad"];
        document.getElementById("estado").value=result["estado"];
      }
  });
}
function limpiar(){
  document.getElementById("numero_documento").className="form-control";
  document.getElementById("nombres").className="form-control";
  document.getElementById("apellidos").className="form-control";
  document.getElementById("telefono").className="form-control";
  document.getElementById("correo_electronico").className="form-control";
  document.getElementById("direccion").className="form-control";
  document.getElementById("ciudad").className="form-control";
  document.getElementById("estado").className="form-control";

  document.getElementById("tipo_documento").value = "";
  document.getElementById("numero_documento").value = "";
  document.getElementById("nombres").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("correo_electronico").value = "";
  document.getElementById("direccion").value = "";
  document.getElementById("ciudad").value = "";
  document.getElementById("estado").value="";
}

// funcion  de deshabilitar cliente
function deshabilitarcliente(id){
  swal.fire({
    title: '¿Estás seguro?',
    text: "Esta opción no tiene marcha atrás",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor:'#3085d6',
    cancelButtonColor:'#d33',
    cancelButtonText:'Cancelar',
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
          listarcliente();//recarga la lista de medicos
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


