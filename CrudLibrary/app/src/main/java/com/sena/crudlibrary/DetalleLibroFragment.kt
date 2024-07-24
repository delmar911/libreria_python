package com.sena.crudlibrary

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.gson.Gson
import com.sena.crudlibrary.config.config
import com.sena.crudlibrary.models.libro

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [DetalleLibroFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class DetalleLibroFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }
    private lateinit var lblTitulo: TextView
    private lateinit var lblAutor: TextView
    private lateinit var lblGenero: TextView
    private lateinit var lblIsbn: TextView
    private lateinit var lblNumeroDisponible: TextView
    private lateinit var lblNumeroOcupado: TextView
    private lateinit var btnEditar: Button
    private lateinit var btnEliminar: Button


    private var id:Int = 2

    fun consultarLibro(){
        if (id!=0){
            var request = JsonObjectRequest(
                Request.Method.GET,//metodo de la peticion
                config.urlLibro+id+"/",//url
                null, //parametros
                {response->
                    //se convierte de json a objeto
                    val gson = Gson()
                    val libro: libro = gson.fromJson(response.toString(), libro::class.java)
                    lblTitulo.setText(response.getString("titulo"))
                    lblAutor.setText(response.getString("autor"))
                    lblIsbn.setText(response.getInt("isbn").toString())
                    lblGenero.setText(response.getString("genero"))
                    lblNumeroDisponible.setText(response.getInt("numero_disponible").toString())
                    lblNumeroOcupado.setText(response.getInt("numero_ocupado").toString())



                },//respuesta correcta

                { error->
                    Toast.makeText(
                        context,
                        "Error al consultar",
                        Toast.LENGTH_LONG
                    ).show()
                }//error en la peticion
            )
            val queue = Volley.newRequestQueue(context)
            //
            queue.add(request)
        }
    }



    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view  = inflater.inflate(R.layout.fragment_detalle_libro, container, false)
        lblTitulo = view.findViewById(R.id.lblTitulo)
        lblAutor = view.findViewById(R.id.lblAutor)
        lblIsbn = view.findViewById(R.id.lblIsbn)
        lblGenero = view.findViewById(R.id.lblGenero)
        lblNumeroDisponible = view.findViewById(R.id.lblNumeroDisponible)
        lblNumeroOcupado = view.findViewById(R.id.lblNumeroOcupado)

        consultarLibro()

        btnEditar=view.findViewById(R.id.btnEditar)
        btnEditar.setOnClickListener {editarLibro()}
        btnEliminar=view.findViewById(R.id.btnEliminar)
        btnEliminar.setOnClickListener {eliminarLibro()}

        // Inflate the layout for this fragment
        return view
    }

    fun editarLibro(){

    }
    fun eliminarLibro(){

    }


    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment DetalleLibroFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            DetalleLibroFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }


}