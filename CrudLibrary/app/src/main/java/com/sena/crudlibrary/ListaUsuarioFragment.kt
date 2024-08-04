package com.sena.crudlibrary

import android.app.AlertDialog
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.sena.crudlibrary.adapter.adapterUsuario
import com.sena.crudlibrary.config.config

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [ListaUsuarioFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class ListaUsuarioFragment : Fragment() {
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

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        cargar_usuario()
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_lista_usuario, container, false)
    }
    fun cargar_usuario(){
        try {
            var request= JsonArrayRequest(
                Request.Method.GET,
                config.urlUsuario,
                null,
                {response->
                    var registro = response
                    //se crea y asocia una variable con el objeto de la vista
                    var recycler=requireView().findViewById<RecyclerView>(R.id.RVUsuario)

                    recycler.layoutManager= LinearLayoutManager(requireContext())
                    //se crea el adaptador
                    var adapterUsuario= adapterUsuario(registro,requireContext())

                    //acción cuando se hace click sobre el item nuevo que puse
                    adapterUsuario.onclick={
                        //cambio de fragmanto desde otro nuevo
                        val bundle=Bundle()
                        bundle.putInt("id",it.getInt("id"))
                        val transaction=requireFragmentManager()
                            .beginTransaction()
                        var fragmento=GuardarUsuarioFragment()
                        fragmento.arguments=bundle
                        transaction.replace(
                            R.id.fragmentContainerView,
                            fragmento).commit()
                        transaction.addToBackStack(null)
                    }
                    adapterUsuario.onclickEliminar={
                        // mensaje de que si deseas eliminar
                        val builder = AlertDialog.Builder(requireContext())
                        builder.setMessage("Desea eliminar este Registro")
                            .setPositiveButton("Si") { dialog, id ->
                                // START THE GAME! eliminar funcion  Llmara la funcion  eliminar()
                                EliminarLibro(it.getInt("id"))
                                // redirije a la vista de listar libro recargada pero aun me aparece un error
                                val transaction=requireFragmentManager()
                                    .beginTransaction()
                                var fragmento=ListaUsuarioFragment()
                                transaction.replace(
                                    R.id.fragmentContainerView,
                                    fragmento).commit()
                                transaction.addToBackStack(null)
                            }
                            .setNegativeButton("No") { dialog, id ->
                                // User cancelled the dialog.
                            }
                        // Create the AlertDialog object and return it.
                        builder.create()
                        builder.show()
                    }
                    //se asocia el adaptador con el objeto
                    recycler.adapter=adapterUsuario
                },
                { error->
                    Toast.makeText(context,"Error en la consulta", Toast.LENGTH_LONG).show()
                }
            )
            val queue= Volley.newRequestQueue(context)
            queue.add(request)
        }catch (e:Exception){

        }

    }
    fun EliminarLibro(id: Int){

        try {
            /*
            JsonArrayRequest=arreglo json
            JsonObjectRequest=Json
            StringRequest=texto, incluyendo ""
             */
            val request= JsonObjectRequest(
                Request.Method.DELETE,
                config.urlUsuario+id+"/",
                null,
                {response->
                    cargar_usuario()
                    Toast.makeText(context,"se elimino correctamente ",Toast.LENGTH_LONG).show()
                },
                { error->
                    Toast.makeText(context,"Error",Toast.LENGTH_LONG).show()
                }
            )
            val queue= Volley.newRequestQueue(context)
            queue.add(request)
        }catch (e:Exception){

        }

    }

    companion object {
        /**
         * Use this factory method to create a new instance of
         * this fragment using the provided parameters.
         *
         * @param param1 Parameter 1.
         * @param param2 Parameter 2.
         * @return A new instance of fragment ListaUsuarioFragment.
         */
        // TODO: Rename and change types and number of parameters
        @JvmStatic
        fun newInstance(param1: String, param2: String) =
            ListaUsuarioFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_PARAM1, param1)
                    putString(ARG_PARAM2, param2)
                }
            }
    }
}