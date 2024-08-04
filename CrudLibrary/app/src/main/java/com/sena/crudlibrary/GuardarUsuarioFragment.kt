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
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.google.gson.Gson
import com.sena.crudlibrary.config.config
import com.sena.crudlibrary.models.Usuario
import org.json.JSONObject

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [GuardarUsuarioFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class GuardarUsuarioFragment : Fragment() {
    // TODO: Rename and change types of parameters
    private var param1: String? = null
    private var param2: String? = null

    private lateinit var nombres:EditText
    private lateinit var direccion:EditText
    private lateinit var correo:EditText
    private lateinit var tipoUsuario:EditText
    private lateinit var btnGuardar: Button
    private var id:Int = 0

    fun consultarUsuario(){
        if (id!=0){
            var request = JsonObjectRequest(
                Request.Method.GET,//metodo de la peticion
                config.urlUsuario+id+"/",//url
                null, //parametros
                {response->
                    //se convierte de json a objeto
                    val gson = Gson()
                    val usuario: Usuario = gson.fromJson(response.toString(), Usuario::class.java)
                    nombres.setText(response.getString("nombres"))
                    direccion.setText(response.getString("direccion"))
                    correo.setText(response.getString("correo"))
                    tipoUsuario.setText(response.getString("tipoUsuario"))


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
    fun guardarUsuario(){
        try {
            if (id ==0){//se crea el libro

                var parametros = JSONObject()
                parametros.put("nombres", nombres.text.toString())
                parametros.put("direccion", direccion.text.toString())
                parametros.put("correo", correo.text.toString())
                parametros.put("tipoUsuario", tipoUsuario.text.toString())

                var request=JsonObjectRequest(
                    Request.Method.POST,//metodo
                    config.urlUsuario,
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
            }
            else{
                val  parametros= JSONObject()

                parametros.put("nombres", nombres.text.toString())
                parametros.put("direccion", direccion.text.toString())
                parametros.put("correo", correo.text.toString())
                parametros.put("tipoUsuario", tipoUsuario.text.toString())

                var request= JsonObjectRequest(
                    Request.Method.PUT, //metodo
                    config.urlUsuario + id + "/", //ur
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
        var view = inflater.inflate(R.layout.fragment_guardar_usuario, container, false)
        nombres=view.findViewById(R.id.nombres)
        direccion=view.findViewById(R.id.direccion)
        correo=view.findViewById(R.id.correo)
        tipoUsuario=view.findViewById(R.id.tipoUsuario)
        btnGuardar = view.findViewById(R.id.btnGuardar)
        btnGuardar.setOnClickListener(){guardarUsuario()
        }

        //boton volver
        var btnVolver: Button = view.findViewById(R.id.btnVolver)
        btnVolver.setOnClickListener{
            val fragmentManager = requireActivity().supportFragmentManager
            //crea la instancia del fragmentoPrincipal
            var fragmentPrincipal = principal()
            //trasaccion de fracmentos
            var transsaction = fragmentManager.beginTransaction()
            //reemplaza fragmento
            transsaction.replace(R.id.fragmentContainerView, fragmentPrincipal)

            transsaction.addToBackStack(null)
            //confirma los cambios
            transsaction.commit()
        }
        //boton de lista
        var btnLista: Button = view.findViewById(R.id.btnLista)
        btnLista.setOnClickListener {
            val fragmentManager = requireActivity().supportFragmentManager
            var fragmentListaUsuario = ListaUsuarioFragment()

            var transsaction = fragmentManager.beginTransaction()
            //reemplaza fragmento
            transsaction.replace(R.id.fragmentContainerView, fragmentListaUsuario)

            transsaction.addToBackStack(null)
            //confirma los cambios
            transsaction.commit()

        }

        consultarUsuario()
        return view
    }



    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment GuardarUsuarioFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            GuardarUsuarioFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}