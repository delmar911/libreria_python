package com.sena.crudlibrary.models

data class Usuario(
    var id: Int,
    var nombres:String,
    var direccion:String,
    var correo:String,
    var tipoUsuario:String
)
