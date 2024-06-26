#  serializer convierte instancias 
# del modelo en representaciones JSON y viceversa.

from rest_framework import serializers
#se importa el modulo serializer
from .models import libro, multa, prestamo, usuario
#se importa la clase del model

#se crea una clase serializer por cada entidad
#la clase meta dentro de un serializador dirve para
#proporcionar metadatos adicionales y
#configuaciones especificas para ese serializador


class LibroSerializer(serializers.ModelSerializer):
    #agregar los campos necesarios para mostrar
    #si de desea agregar todos los campos se puede utilizar la 
    #funcion __all__
    
    class Meta:
        model = libro
        fields = '__all__'
        # fields = {
        #     'id',
        #     'autor',
        #     'genero',
        #     etc
        # }
# class listarLibroSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=libro
#         fields =['id','titulo']  
# class listaUsuarioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=usuario
#         fields =['id','nombres']  
             
class UsuarioSerializer(serializers.ModelSerializer):
    #agregar los campos necesarios para mostrar
    #si de desea agregar todos los campos se puede utilizar la 
    #funcion __all__
    class Meta:
        model = usuario
        fields = '__all__'



class PrestamoSerializer(serializers.ModelSerializer):
    #agregar los campos necesarios para mostrar
    #si de desea agregar todos los campos se puede utilizar la 
    #funcion __all__
    libro = serializers.SlugRelatedField(slug_field='id', queryset=libro.objects.all())
    usuario = serializers.SlugRelatedField(slug_field='id', queryset=usuario.objects.all())
    
  
    class Meta:
        model = prestamo
        fields = '__all__'
        
class MultaSerializer(serializers.ModelSerializer):
    #agregar los campos necesarios para mostrar
    #si de desea agregar todos los campos se puede utilizar la 
    #funcion __all__
    
    class Meta:
        model = multa
        fields = '__all__'