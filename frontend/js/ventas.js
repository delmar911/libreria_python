//se almacena la url de la api
let url="http://localhost:8082/api/v1/ventas/";
function listarventas() {
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
            let curpoTablaventas = document.getElementById("curpoTablaventas");
            curpoTablaventas.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaTotal = document.createElement("td");
                let celdaFechaVenta = document.createElement("td");
                let celdaCliente = document.createElement("td");
                let celdaEstado = document.createElement("td");
                // let celdaEditar = document.createElement("td");
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id_venta"];
                celdaTotal.innerText= result[i]["total"];
                celdaFechaVenta.innerText = result[i]["fecha_venta"];
                celdaCliente.innerText = result[i]["cliente"]["nombres"]+" "+result[i]["cliente"]["apellidos"];
                celdaEstado.innerText = result[i]["estado"];
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTotal);
                trRegistro.appendChild(celdaFechaVenta);
                trRegistro.appendChild(celdaCliente);
                trRegistro.appendChild(celdaEstado);
                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarventas= document.createElement("button");
                botonEditarventas.value=result[i]["id_venta"];
                botonEditarventas.innerHTML="Editar"; 

                botonEditarventas.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarventasID(this.value); 
                }
                botonEditarventas.className= "btn btn-primary"

                celdaOpcion.appendChild(botonEditarventas); 
                trRegistro.appendChild(celdaOpcion);

                curpoTablaventas.appendChild(trRegistro);//se traen todos los registros

                 //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                 let botonDeshabilitarventas= document.createElement("button");
                 botonDeshabilitarventas.innerHTML="<i class='fa-solid fa-trash'></i>"; 
                 botonDeshabilitarventas.className="btn btn-danger"; 
 
                 let ventasIdParaDeshabilitar= result[i]["id_venta"]; 
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
function registrarventas() {
    
    let total = document.getElementById("total").value;
    let fecha_venta = document.getElementById("fecha_venta").value;
    let cliente = document.getElementById("cliente").value;
    let estado = document.getElementById("estado").value;

    let formData = {
        
        "total": total,
        "fecha_venta": fecha_venta,
        "cliente": cliente,
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
          // window.location.href= "http://127.0.0.1:5500/front_end/clienteRegistro.html";
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
  var total = document.getElementById("total");
  let fecha_venta = document.getElementById("fecha_venta");
  var cliente = document.getElementById("cliente"); 


  return validartotalventas(total)
       && validarNombreCliente(cliente);
}

function validarNombreCliente(campo){
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


function validartotalventas(Numero) {
  
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
  cargarCliente();
  alert(nombrecliente);
}
//funcion para traer los clientes
function cargarCliente() {
  let urlcliente = "http://localhost:8082/api/v1/cliente/";

  $.ajax({
    url: urlcliente,
    type: "GET",
    success: function (result) {
      let cliente = document.getElementById("cliente");
      cliente.innerHTML = "";
      for (let i = 0; i < result.length; i++) {
        let nombrecliente = document.createElement("option");
        nombrecliente.value = result[i]["id_cliente"];
        nombrecliente.innerText = nombre_completo_cliente =
          result[i]["nombres"] +
          " " +
          result[i]["apellidos"] +
        cliente.appendChild(nombrecliente);
        
      }
    },
  });
}

//Cuando le damos click al boton de guardar, este llamara a la function updateventas por medio del onclick******
function updateventas() {
    var id_venta = document.getElementById("id_venta").value;

    let formData = {
        "total": document.getElementById("total").value,
        "fecha_venta": document.getElementById("fecha_venta").value,
        "cliente": document.getElementById("cliente").value,
        "estado": document.getElementById("estado").value
    };


    //Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE *****
    if(validarCampos()){
    $.ajax({
        url: url + id_venta,
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
function consultarventasID(id){
    //alert(id);
    $.ajax({
        url:url+id,
        type:"GET",
        success: function(result){
            console.log(result);
            document.getElementById("id_venta").value=result["id_venta"];
            document.getElementById("total").value=result["total"];
            document.getElementById("fecha_venta").value=result["fecha_venta"];
            document.getElementById("cliente").value=result["cliente"];
            document.getElementById("estado").value=result["estado"];
        }
    });
}
function limpiar(){
    document.getElementById("total").className="form-control";
    document.getElementById("fecha_venta").className="form-control";
    document.getElementById("cliente").className="form-control";
    document.getElementById("estado").className="form-control";

    document.getElementById("total").value = "";
    document.getElementById("fecha_venta").value = "";
    document.getElementById("cliente").value = "";
    document.getElementById("estado").value="";
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





