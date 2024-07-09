package com.sena.crudlibrary.models

data class libro(
    /*titulo = models.CharField(max_length=30 )
  autor = models.CharField(max_length=60 )
  isbn = models.CharField(max_length=13)
  genero = models.CharField(max_length=50)
  numero_disponible = models.IntegerField()
  numero_ocupado = models.IntegerField()*/
    var id: Int,
    var titulo: String,
    var autor: String,
    var isbn: String,
    var genero: String,
    var numero_disponible: Int,
    var numero_ocupado: Int


)
