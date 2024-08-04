package com.sena.crudlibrary.models

import android.text.format.DateFormat

data class Prestamo(
    var fecha_prestamo: DateFormat,
    var fecha_devolucion: DateFormat,
    var usuario: Usuario,
    var libro: libro,
    var estado_prestamo: String


)
