package com.sena.crudlibrary

import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

import java.security.Principal

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        var btnLibro: Button =findViewById(R.id.btnLibro)
        btnLibro.setOnClickListener { CambioLibro() }

        var btnUsuario: Button = findViewById(R.id.btnUsuario)
        btnUsuario.setOnClickListener{CambioUsuario()}

        var btnPrestamo: Button = findViewById(R.id.btnPrestamo)
        btnPrestamo.setOnClickListener{CambioPrestamo()}

        var btnHome: Button = findViewById(R.id.btnHome)
        btnHome.setOnClickListener { Home() }



    }
    fun Home() {
        // Obtener el FragmentManager del contexto actual
        val fragmentManager = supportFragmentManager // Usa supportFragmentManager si estás en una actividad

        // Crear una instancia del fragmento
        val fragmento = principal() // Asegúrate de que PaginaPrincipalFragment es el nombre correcto del fragmento

        // Comenzar la transacción de fragmentos
        val transaction = fragmentManager.beginTransaction()

        // Reemplazar el fragmento actual con el nuevo fragmento
        transaction.replace(R.id.fragmentContainerView, fragmento) // Asegúrate de que R.id.fragmentContainerView es el ID del contenedor en tu layout

        // Añadir la transacción al back stack si quieres permitir que el usuario regrese al fragmento anterior
        transaction.addToBackStack(null)

        // Confirmar los cambios
        transaction.commit()
    }
    fun CambioLibro() {
        // Obtener el FragmentManager del contexto actual
        val fragmentManager = supportFragmentManager // Usa supportFragmentManager si estás en una actividad

        // Crear una instancia del fragmento
        val fragmento = GuardarLibroFragment() // Asegúrate de que PaginaPrincipalFragment es el nombre correcto del fragmento

        // Comenzar la transacción de fragmentos
        val transaction = fragmentManager.beginTransaction()

        // Reemplazar el fragmento actual con el nuevo fragmento
        transaction.replace(R.id.fragmentContainerView, fragmento) // Asegúrate de que R.id.fragmentContainerView es el ID del contenedor en tu layout

        // Añadir la transacción al back stack si quieres permitir que el usuario regrese al fragmento anterior
        transaction.addToBackStack(null)

        // Confirmar los cambios
        transaction.commit()
    }
    fun CambioUsuario() {
        // Obtener el FragmentManager del contexto actual
        val fragmentManager = supportFragmentManager // Usa supportFragmentManager si estás en una actividad

        // Crear una instancia del fragmento
        val fragmento = GuardarUsuarioFragment() // Asegúrate de que PaginaPrincipalFragment es el nombre correcto del fragmento

        // Comenzar la transacción de fragmentos
        val transaction = fragmentManager.beginTransaction()

        // Reemplazar el fragmento actual con el nuevo fragmento
        transaction.replace(R.id.fragmentContainerView, fragmento) // Asegúrate de que R.id.fragmentContainerView es el ID del contenedor en tu layout

        // Añadir la transacción al back stack si quieres permitir que el usuario regrese al fragmento anterior
        transaction.addToBackStack(null)

        // Confirmar los cambios
        transaction.commit()
    }
    fun CambioPrestamo() {
        // Obtener el FragmentManager del contexto actual
        val fragmentManager = supportFragmentManager // Usa supportFragmentManager si estás en una actividad

        // Crear una instancia del fragmento
        val fragmento = GuardarPrestamoFragment() // Asegúrate de que PaginaPrincipalFragment es el nombre correcto del fragmento

        // Comenzar la transacción de fragmentos
        val transaction = fragmentManager.beginTransaction()

        // Reemplazar el fragmento actual con el nuevo fragmento
        transaction.replace(R.id.fragmentContainerView, fragmento) // Asegúrate de que R.id.fragmentContainerView es el ID del contenedor en tu layout

        // Añadir la transacción al back stack si quieres permitir que el usuario regrese al fragmento anterior
        transaction.addToBackStack(null)

        // Confirmar los cambios
        transaction.commit()
    }


}



