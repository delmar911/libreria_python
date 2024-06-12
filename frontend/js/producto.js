//se almacena la url de la api
let url="http://localhost:8082/api/v1/producto/";
function listarproducto() {
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
            let curpoTablaproducto = document.getElementById("curpoTablaproducto");
            curpoTablaproducto.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaNombre = document.createElement("td");
                let celdaDescripcion = document.createElement("td");
                let celdaCantidad = document.createElement("td");
                let celdaPrecio = document.createElement("td");
                let celdaPorcentajeIva = document.createElement("td");
                let celdaPorcentajeDescuento = document.createElement("td");
                let celdaEstado = document.createElement("td");
                // let celdaEditar = document.createElement("td");
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id_producto"];
                celdaNombre.innerText= result[i]["nombre"];
                celdaDescripcion.innerText = result[i]["descripcion"];
                celdaCantidad.innerText = result[i]["cantidad"];
                celdaPrecio.innerText = result[i]["precio"];
                celdaPorcentajeIva.innerText = result[i]["porcentaje_iva"];
                celdaPorcentajeDescuento.innerText = result[i]["porcentaje_descuento"];
                celdaEstado.innerText = result[i]["estado"];
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaNombre);
                trRegistro.appendChild(celdaDescripcion);
                trRegistro.appendChild(celdaCantidad);
                trRegistro.appendChild(celdaPrecio);
                trRegistro.appendChild(celdaPorcentajeIva);
                trRegistro.appendChild(celdaPorcentajeDescuento);
                trRegistro.appendChild(celdaEstado);
                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarproducto= document.createElement("button");
                botonEditarproducto.value=result[i]["id_producto"];
                botonEditarproducto.innerHTML="Editar"; 

                botonEditarproducto.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarproductoID(this.value); 
                }
                botonEditarproducto.className= "btn btn-primary"

                celdaOpcion.appendChild(botonEditarproducto); 
                trRegistro.appendChild(celdaOpcion);

                curpoTablaproducto.appendChild(trRegistro);//se traen todos los registros

                 //boton desahiblitar- la funcion de deshabilitar se encuentra abajo 
                 let botonDeshabilitarproducto= document.createElement("button");
                 botonDeshabilitarproducto.innerHTML="<i class='fa-solid fa-trash'></i>"; 
                 botonDeshabilitarproducto.className="btn btn-danger"; 
 
                 let productoIdParaDeshabilitar= result[i]["id_producto"]; 
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

//Paso para crear el registro de un médico ****
function registrarproducto() {
    
    let nombre = document.getElementById("nombre").value;
    let descripcion = document.getElementById("descripcion").value;
    let cantidad = document.getElementById("cantidad").value;
    let precio = document.getElementById("precio").value;
    let porcentaje_iva = document.getElementById("porcentaje_iva").value;
    let porcentaje_descuento = document.getElementById("porcentaje_descuento").value;
    let estado = document.getElementById("estado").value;

    let formData = {
        
        "nombre": nombre,
        "descripcion": descripcion,
        "cantidad": cantidad,
        "precio": precio,
        "porcentaje_iva": porcentaje_iva,
        "porcentaje_descuento": porcentaje_descuento,
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
  var nombre = document.getElementById("nombre");
  let descripcion = document.getElementById("descripcion");
  var cantidad = document.getElementById("cantidad"); 
  var precio = document.getElementById("precio"); 
  var porcentaje_iva = document.getElementById("porcentaje_iva"); 
  var porcentaje_descuento=document.getElementById("porcentaje_descuento"); 

  return validarNombreProducto(nombre) && validarNombreProducto(descripcion) && validarCantidad(cantidad) 
       && validarPrecio(precio) && validarIvaDescuento(porcentaje_iva) && validarIvaDescuento(porcentaje_descuento);
}

function validarNombreProducto(campo){
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

function validarCantidad(Numero) {
  
  let valor = Numero.value;
  let valido = true;
  if(cantidad.value.length < 0 || cantidad.value.length > 10000){
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



function validarPrecio(Numero) {
  
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

function validarIvaDescuento(campo){
  var valido=true;
  if(campo.value.length < 0 || campo.value.length > 2){
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

//Cuando le damos click al boton de guardar, este llamara a la function updateproducto por medio del onclick******
function updateproducto() {
    var id_producto = document.getElementById("id_producto").value;

    let formData = {
        "nombre": document.getElementById("nombre").value,
        "descripcion": document.getElementById("descripcion").value,
        "cantidad": document.getElementById("cantidad").value,
        "precio": document.getElementById("precio").value,
        "porcentaje_iva": document.getElementById("porcentaje_iva").value,
        "porcentaje_descuento": document.getElementById("porcentaje_descuento").value,
        "estado": document.getElementById("estado").value
    };


    //Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE *****
    if(validarCampos()){
    $.ajax({
        url: url + id_producto,
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
function consultarproductoID(id){
    //alert(id);
    $.ajax({
        url:url+id,
        type:"GET",
        success: function(result){
            console.log(result);
            document.getElementById("id_producto").value=result["id_producto"];
            document.getElementById("nombre").value=result["nombre"];
            document.getElementById("descripcion").value=result["descripcion"];
            document.getElementById("cantidad").value=result["cantidad"];
            document.getElementById("precio").value=result["precio"];
            document.getElementById("porcentaje_iva").value=result["porcentaje_iva"];
            document.getElementById("porcentaje_descuento").value=result["porcentaje_descuento"];
            document.getElementById("estado").value=result["estado"];
        }
    });
}
function limpiar(){
    document.getElementById("descripcion").className="form-control";
    document.getElementById("cantidad").className="form-control";
    document.getElementById("porcentaje_iva").className="form-control";
    document.getElementById("celular").className="form-control";
    document.getElementById("correo_electronico").className="form-control";
    document.getElementById("direccion").className="form-control";
    document.getElementById("estado").className="form-control";

    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("porcentaje_iva").value = "";
    document.getElementById("porcentaje_descuento").value = "";
    document.getElementById("estado").value="";
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





