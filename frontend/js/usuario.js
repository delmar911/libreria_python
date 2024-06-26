//se almacena la url de la api
let url="http://127.0.0.1:8000/libreria/api/v1/usuarios/";

document.getElementById("nombres").addEventListener("keypress", soloLetras);
document.getElementById("direccion").addEventListener("keypress", soloLetras);
document.getElementById("correo").addEventListener("keypress", soloLetras);
document.getElementById("tipoUsuario").addEventListener("keypress", soloLetras);

function soloLetras(event){
  console.log("LLave presionada: "+event.key);
  console.log("Codigo tecla: "+event.keyCode);

  const caracteresNoPermitidos = [
    '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '{', '}', '[', ']',
    '\\', '|', ';', ':', '"', , '<', '>', '/', '`', '~'
  ]; // Lista de caracteres no permitidos

 
  // Verificar si el carácter no está permitido
  if (caracteresNoPermitidos.includes(event.key)) {
    event.preventDefault(); // Prevenir la entrada del carácter
    return;
  }
}

function listarUsuario() {
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
            let cuerpoTablaUsuario = document.getElementById("cuerpoTablaUsuario");
            cuerpoTablaUsuario.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdanombres = document.createElement("td");
                let celdadireccion = document.createElement("td");
                let celdacorreo = document.createElement("td");
                let celdatipoUsuario = document.createElement("td");
                
                // let celdaEditar = document.createElement("td");
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id"];
                celdanombres.innerText= result[i]["nombres"];
                celdadireccion.innerText = result[i]["direccion"];
                celdacorreo.innerText = result[i]["correo"];
                celdatipoUsuario.innerText = result[i]["tipoUsuario"];
            
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdanombres);
                trRegistro.appendChild(celdadireccion);
                trRegistro.appendChild(celdacorreo);
                trRegistro.appendChild(celdatipoUsuario);
                                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarcliente= document.createElement("button");
                botonEditarcliente.value=result[i]["id"];
                botonEditarcliente.innerHTML="Editar"; 

                botonEditarcliente.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarUsuarioID(this.value); 
                }
                botonEditarcliente.className= "btn btn-primary"

                celdaOpcion.appendChild(botonEditarcliente); 
                trRegistro.appendChild(celdaOpcion)

                cuerpoTablaUsuario.appendChild(trRegistro);
                 //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                 let botonDeshabilitarproducto= document.createElement("button");
                 botonDeshabilitarproducto.innerHTML="<i class='fa-solid fa-trash'></i>"; 
                 botonDeshabilitarproducto.className="btn btn-danger"; 
 
                 let productoIdParaDeshabilitar= result[i]["id"]; 
                 botonDeshabilitarproducto.onclick=function(){
                  deshabilitarproducto(productoIdParaDeshabilitar);
                 }
                 celdaOpcion.appendChild(botonDeshabilitarproducto); 
                 trRegistro.appendChild(celdaOpcion)
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
}
// function cargarUsuario() {
//   let urlusuario = "http://127.0.0.1:8000/libreria/api/v1/tipoUsuario/";

//   $.ajax({
//     url: urlusuario,
//     type: "GET",
//     success: function (result) {
//       let tipoUsuario = document.getElementById("tipoUsuario");
//       tipoUsuario.innerHTML = "";
//       for (let i = 0; i < result.length; i++) {
//         let usuario = document.createElement("option");
//         usuario.value = result[i]["id"];
       
//            //se utiliza el switch para que traiga los choices    
//         switch (result[i]["tipoUsuario"]) {
//           case 1:
//             usuario.innerText = "Lector";
//               break;
//           case 2:
//             usuario.innerText = "Bibliotecario";
//               break;
//           case 3:
//             usuario.innerText = "Administrador";
//               break;
//           default:
//             usuario.innerText = "valor no valido";
//               break;
//       }
//           tipoUsuario.appendChild(usuario);
        
//       }
//     },
//   });
// }
//Paso para crear el registro de un médico
function registrarUsuario() {
    
    let nombres = document.getElementById("nombres").value;
    let direccion = document.getElementById("direccion").value;
    let correo = document.getElementById("correo").value;
    let tipoUsuario = document.getElementById("tipoUsuario").value;

    let formData = {
        
        "nombres": nombres,
        "direccion": direccion,
        "correo": correo,
        "tipoUsuario": tipoUsuario,

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
          // window.location.href= "http://127.0.0.1:5500/front_end/medicoRegistro.html";
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
  var nombres = document.getElementById("nombres");
  let direccion = document.getElementById("direccion");
  var correo = document.getElementById("correo"); 
  var tipoUsuario = document.getElementById("tipoUsuario"); 
 

  return validarnombresProducto(nombres) && validarnombresProducto(direccion) && validarcorreo(correo) 
  && validartipoUsuario(tipoUsuario);
}

function validarnombresProducto(campo){
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

function validarcorreo(Numero) {
  
  let valor = Numero.value;
  let valido = true;
  if(correo.value.length < 0 || correo.value.length > 10000){
      valido=false;
  }

  if (valido) {
      Numero.className = "form-control is-valid"
  }
  else{
      Numero.className = "form-control is-invalid"
  }
  return valido;
}



function validartipoUsuario(Numero) {
  
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



//Cuando le damos click al boton de guardar, este llamara a la function updateproducto por medio del onclick******
function updateUsuario() {
    var id = document.getElementById("id").value;

    let formData = {
        "nombres": document.getElementById("nombres").value,
        "direccion": document.getElementById("direccion").value,
        "correo": document.getElementById("correo").value,
        "tipoUsuario": document.getElementById("tipoUsuario").value
    };


    //Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE *****
    if(validarCampos()){
    $.ajax({
        url: url + id + "/",
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
            
            listarproducto(); //Lista los médicos después de actualizar
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
//1.Crear petición que traiga la información del producto por id
function consultarUsuarioID(id){
    //alert(id);
    $.ajax({
        url:url+id+"/",
        type:"GET",
        success: function(result){
            console.log(result);
            document.getElementById("id").value=result["id"];
            document.getElementById("nombres").value=result["nombres"];
            document.getElementById("direccion").value=result["direccion"];
            document.getElementById("correo").value=result["correo"];
            document.getElementById("tipoUsuario").value=result["tipoUsuario"];
         
        }
      });

}

function limpiar(){
    document.getElementById("nombres").className="form-control";
    document.getElementById("correo").className="form-control";
    document.getElementById("tipoUsuario").className="form-control";
    document.getElementById("direccion").className="form-control";
   

    document.getElementById("nombres").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("tipoUsuario").value = "";
}
// funcion  de deshabilitar producto
function deshabilitarproducto(id){
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
            listarproducto();//recarga la lista de productos
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





