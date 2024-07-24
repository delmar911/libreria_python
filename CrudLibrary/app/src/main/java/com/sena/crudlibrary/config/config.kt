package com.sena.crudlibrary.config

class config {
/*se crea una static url, para consultar sin instanciar
* metodo de companion object srive para almacenar las variables static*/
    companion object{
        val urlBase = "http://192.168.140.176:8000"
        val urlLibro = urlBase+"/libreria/api/v1/libros/"

    }
}
