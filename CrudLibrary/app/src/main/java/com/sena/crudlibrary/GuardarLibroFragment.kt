package com.sena.crudlibrary

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.Request.Method
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.gson.Gson
import org.json.JSONObject
import com.sena.crudlibrary.config.config
import com.sena.crudlibrary.models.libro
import kotlin.Exception

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [GuardarLibroFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class GuardarLibroFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null

    //se defienen las variables del formaulario

    private lateinit var titulo:EditText
    private lateinit var autor:EditText
    private lateinit var genero:EditText
    private lateinit var isbn:EditText
    private lateinit var numero_disponible:EditText
    private lateinit var numero_ocupado:EditText
    private lateinit var btnGuardar:Button
    //de manera temporal se asigna un id
    private var id:Int = 2

    //metodo encargdo de traer la informacion de libro
    fun consultarLibro(){
        if (id!=0){
            var request = JsonObjectRequest(
                Method.GET,//metodo de la peticion
                config.urlLibro+id+"/",//url
                null, //parametros
                {response->
                    //se convierte de json a objeto
                    val gson = Gson()
                    val libro:libro = gson.fromJson(response.toString(), libro::class.java)
                    titulo.setText(response.getString("titulo"))
                    autor.setText(response.getString("autor"))
                    isbn.setText(response.getInt("isbn").toString())
                    genero.setText(response.getString("genero"))
                    numero_disponible.setText(response.getInt("numero_disponible").toString())
                    numero_ocupado.setText(response.getInt("numero_ocupado").toString())

                },//respuesta correcta

                { error->
                    Toast.makeText(
                        context,
                        "Error al colsultar",
                        Toast.LENGTH_LONG
                    ).show()
                }//error en la peticion
            )
            val queue = Volley.newRequestQueue(context)
            //
            queue.add(request)
        }
    }

    /*request es peticion q hace la api
    StringRequest=responde un String
    JsonRequest=responde un json
     JsonArrayRequest=Responde un arreglo de json*/
    fun guardarLibro(){
        try {
            if (id ==0){//se crea el libro

                var parametros = JSONObject()
                parametros.put("titulo", titulo.text.toString())
                parametros.put("autor", autor.text.toString())
                parametros.put("isbn", isbn.text.toString())
                parametros.put("genero", genero.text.toString())
                parametros.put("numero_disponible", numero_disponible.text.toString())
                parametros.put("numero_ocupado", numero_ocupado.text.toString())

                var request=JsonObjectRequest(
                    Request.Method.POST,//metodo
                    config.urlLibro,
                    parametros,//datos de la peticios
                    {response->
                        Toast.makeText(
                            context,
                            "Se guardó correctamente ",
                            Toast.LENGTH_LONG
                        ).show()
                    },
                    { error->
                        Toast.makeText(
                            context,
                            "Error al guardar",
                            Toast.LENGTH_LONG
                        ).show()
                    }
                )
                //queue = cola
                val queue = Volley.newRequestQueue(context)
                //
                queue.add(request)
            } else
            {
                val  parametros=JSONObject()

                parametros.put("titulo",titulo.text.toString())
                parametros.put("autor",autor.text.toString())
                parametros.put("isbn",isbn.text.toString())
                parametros.put("genero",genero.text.toString())
                parametros.put("numero_disponible",numero_disponible.text.toString())
                parametros.put("numero_ocupado",numero_ocupado.text.toString())

                var request= JsonObjectRequest(
                    Request.Method.PUT, //metodo
                    config.urlLibro + id + "/", //ur
                    parametros,//datos de la peticion
                    {response->Toast.makeText( context,"se Actualizo correctamente", Toast.LENGTH_SHORT).show() },//cuando la respuesta es correcta

                    {error->Toast.makeText(context, "se genero un error", Toast.LENGTH_LONG).show() }//cuando es incorrecta
                )


                // se crea la cola del trabajo
                val queue=Volley.newRequestQueue(context)
                // se añade la peticion
                queue.add(request)
            }
        }catch (error:Exception){

        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            param1 = it.getString(ARG_PARAM1)
            param2 = it.getString(ARG_PARAM2)
        }
    }

    @SuppressLint("MissingInflatedId")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        var view = inflater.inflate(R.layout.fragment_guardar_libro, container, false)
        titulo=view.findViewById(R.id.titulo)
        autor=view.findViewById(R.id.autor)
        isbn=view.findViewById(R.id.isbn)
        genero=view.findViewById(R.id.genero)
        numero_ocupado=view.findViewById(R.id.lblNumeroOcupado)
        numero_disponible=view.findViewById(R.id.numero_disponible)
        btnGuardar = view.findViewById(R.id.btnGuardar)
        btnGuardar.setOnClickListener(){guardarLibro()
        }
        consultarLibro()


        return view

    }


    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment GuardarLibroFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            GuardarLibroFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}