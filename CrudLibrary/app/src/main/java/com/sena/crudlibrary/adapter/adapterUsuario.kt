package com.sena.crudlibrary.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.sena.crudlibrary.R
import org.json.JSONArray
import org.json.JSONObject

class adapterUsuario (
    var listUsuario: JSONArray,
    var context: Context,

    ): RecyclerView.Adapter<adapterUsuario.MyHolder>() {
    inner class MyHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        /*
        Dentro de la clase MyHolder se crea las variables
        y se asocian los objetos de la vista item
         */
        lateinit var lblNombres: TextView
        lateinit var lblCorreo: TextView
        lateinit var btnEditar: Button
        lateinit var btnEliminar: Button

        init {
            lblNombres = itemView.findViewById(R.id.lblNombres)
            lblCorreo = itemView.findViewById(R.id.lblCorreo)
            btnEditar = itemView.findViewById(R.id.btnEditar)
            btnEliminar = itemView.findViewById(R.id.btnEliminar)
        }
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): adapterUsuario.MyHolder {
        var itemView= LayoutInflater.from(context).inflate(R.layout.item_usuario,parent,false)
        return MyHolder(itemView)
    }
    //variable que almacena la función onclick nuevo que puse
    var onclick:((JSONObject)->Unit)?=null
    var onclickEliminar:((JSONObject)->Unit)?=null
    override fun onBindViewHolder(holder: adapterUsuario.MyHolder, position: Int) {
        //obtener el registro
        val usuario=listUsuario.getJSONObject(position)
        //asignar valores
        holder.lblNombres.text=usuario.getString("nombres")
        holder.lblCorreo.text=usuario.getString("correo")


        //se crea la función del onclick nuevo que puse
        holder.btnEditar.setOnClickListener{
            onclick?.invoke(listUsuario.getJSONObject(position))
        }

        holder.btnEliminar.setOnClickListener{
            onclickEliminar?.invoke(listUsuario.getJSONObject(position))
        }
    }
    override fun getItemCount(): Int {
        return listUsuario.length()
    }
}