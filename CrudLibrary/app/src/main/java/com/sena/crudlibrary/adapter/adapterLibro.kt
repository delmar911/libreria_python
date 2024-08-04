package com.sena.crudlibrary.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.sena.crudlibrary.R
import org.json.JSONObject
import org.json.JSONArray

class adapterLibro(
    var listLibro: JSONArray,
    var context: Context,

    ): RecyclerView.Adapter<adapterLibro.MyHolder>()
{
    /*
    Se crea la clase Myholder
     */
    inner class MyHolder(itemView: View): RecyclerView.ViewHolder(itemView){
        /*
        Dentro de la clase MyHolder se crea las variables
        y se asocian los objetos de la vista item
         */
        lateinit var lblTitulo: TextView
        lateinit var lblAutor: TextView
        lateinit var btnEditar: Button
        lateinit var  btnEliminar:Button

        init{
            lblTitulo=itemView.findViewById(R.id.lblTitulo)
            lblAutor=itemView.findViewById(R.id.lblAutor)
            btnEditar=itemView.findViewById(R.id.btnEditar)
            btnEliminar=itemView.findViewById(R.id.btnEliminar)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): adapterLibro.MyHolder {
        var itemView= LayoutInflater.from(context).inflate(R.layout.item_libro,parent,false)
        return MyHolder(itemView)
    }

    //variable que almacena la función onclick nuevo que puse
    var onclick:((JSONObject)->Unit)?=null
    var onclickEliminar:((JSONObject)->Unit)?=null

    override fun onBindViewHolder(holder: adapterLibro.MyHolder, position: Int) {
        //obtener el registro
        val libro=listLibro.getJSONObject(position)
        //asignar valores
        holder.lblTitulo.text=libro.getString("titulo")
        holder.lblAutor.text=libro.getString("autor")


        //se crea la función del onclick nuevo que puse
        holder.btnEditar.setOnClickListener{
            onclick?.invoke(listLibro.getJSONObject(position))
        }

        holder.btnEliminar.setOnClickListener{
            onclickEliminar?.invoke(listLibro.getJSONObject(position))
        }
    }

    /*
    getItemCount: retorna el número de elementos
    de la lista
     */
    override fun getItemCount(): Int {
        return listLibro.length()
    }

}