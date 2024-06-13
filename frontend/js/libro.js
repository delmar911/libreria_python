//se almacena la url de la api
let url="http://127.0.0.1:8000/libreria/api/v1/libros/";
function listarLibros() {
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
            let cuerpoTablaLibros = document.getElementById("cuerpoTablaLibros");
            cuerpoTablaLibros.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaTipoDocumento = document.createElement("td");
                let celdaNumeroDocumento = document.createElement("td");
                let celdaisbn = document.createElement("td");
                let celdagenero = document.createElement("td");
                let celdanumero_ocupado = document.createElement("td");
                let celdaNumero_disponible = document.createElement("td");
                  //almacenamos en valor
                
                celdaId.innerText = result[i]["id"];
                celdaTipoDocumento.innerText= result[i]["titulo"];
                celdaNumeroDocumento.innerText = result[i]["autor"];
                celdaisbn.innerText = result[i]["isbn"];
                celdagenero.innerText = result[i]["genero"];
                celdanumero_ocupado.innerText = result[i]["numero_ocupado"];
                celdaNumero_disponible.innerText = result[i]["numero_disponible"];
               
                
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTipoDocumento);
                trRegistro.appendChild(celdaNumeroDocumento);
                trRegistro.appendChild(celdaisbn);
                trRegistro.appendChild(celdagenero);
                trRegistro.appendChild(celdanumero_ocupado);
                trRegistro.appendChild(celdaNumero_disponible);
                
                // trRegistro.appendChild(celdaEditar);

                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarcliente= document.createElement("button");
                botonEditarcliente.value=result[i]["id"];
                botonEditarcliente.innerHTML="Editar"; 

                botonEditarcliente.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarclienteID(this.value); 
                }
                botonEditarcliente.className= "btn btn-primary"

                celdaOpcion.appendChild(botonEditarcliente); 
                trRegistro.appendChild(celdaOpcion)

                cuerpoTablaLibros.appendChild(trRegistro);//se traen todos los registros

                //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                let botonDeshabilitarcliente= document.createElement("button");
                botonDeshabilitarcliente.innerHTML="<i class='fa-solid fa-trash'></i>"; 
                botonDeshabilitarcliente.className="btn btn-danger"; 

                let clienteIdParaDeshabilitar= result[i]["id"]; 
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
function RegistrarLibros() {

  let titulo = document.getElementById("titulo").value;
  let autor = document.getElementById("autor").value;
  let isbn = document.getElementById("isbn").value;
  let genero = document.getElementById("genero").value;
  let numero_disponible = document.getElementById("numero_disponible").value;
  let numero_ocupado = document.getElementById("numero_ocupado").value;
  


  let formData = {
    "titulo": titulo,
    "autor": autor,
    "isbn": isbn,
    "genero": genero,
    "numero_disponible": numero_disponible,
    "numero_ocupado": numero_ocupado,
   
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
  var autor = document.getElementById("autor"); 
  var isbn = document.getElementById("isbn"); 
  var genero = document.getElementById("genero"); 
  var numero_ocupado = document.getElementById("numero_ocupado"); 
 

  return validarNombreApellido(isbn) 
         && validarNombreApellido(genero) 


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
  if(value.length<3 || value.length>60){
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

// function validarnumero_ocupado(Numero) {
    
//   let valor = Numero.value;
//   let valido = true;
//   if (valor.length < 10 || valor.length >13) {
//       valido = false
//   }

//   if (valido) {
//       Numero.className = "form-control is-valid"
//   }
//   else{
//       Numero.className = "form-control is-invalid"
//   }
//   return valido;
// }




/*actualizar*/
function updateLibro(){
  var id=document.getElementById("id").value;
  console.log(id);
  let formData = {

      "titulo" :  document.getElementById("titulo").value,
      "autor" : document.getElementById("autor").value,
      "isbn" : document.getElementById("isbn").value,
      "genero" : document.getElementById("genero").value,
      "numero_disponible"  : document.getElementById("numero_disponible").value,
      "numero_ocupado" : document.getElementById("numero_ocupado").value,
    
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
          
          listarLibros(); //Lista los médicos después de actualizar
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
        document.getElementById("id").value=result["id"];
        document.getElementById("titulo").value=result["titulo"];
        document.getElementById("autor").value=result["autor"];
        document.getElementById("isbn").value=result["isbn"];
        document.getElementById("genero").value=result["genero"];
        document.getElementById("numero_disponible").value=result["numero_disponible"];
        document.getElementById("numero_ocupado").value=result["numero_ocupado"];
    
      }
  });
}
function limpiar(){
  document.getElementById("autor").className="form-control";
  document.getElementById("isbn").className="form-control";
  document.getElementById("genero").className="form-control";
  document.getElementById("numero_ocupado").className="form-control";
  document.getElementById("numero_disponible").className="form-control";
  

  document.getElementById("titulo").value = "";
  document.getElementById("autor").value = "";
  document.getElementById("isbn").value = "";
  document.getElementById("genero").value = "";
  document.getElementById("numero_ocupado").value = "";
  document.getElementById("numero_disponible").value = "";

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
          listarLibros();//recarga la lista de medicos
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


