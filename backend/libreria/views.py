# View: Gestiona las solicitudes HTTP y devuelve respuestas web.
# En DRF, las vistas pueden manejar la lógica CRUD y están estrechamente
# integradas con los serializadores para manejar la representación de datos.

from django.shortcuts import render
from rest_framework import viewsets
from .serializer import LibroSerializer, UsuarioSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import sqlite3
from .models import libro
from .models import usuario


# Create your views here.
#se crea la clase view por cada modelo
class LibroView(viewsets.ModelViewSet):
    serializer_class = LibroSerializer
    queryset = libro.objects.all()
    
class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = usuario.objects.all()
    
class LibroConsultaView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            # Conectar a la base de datos
            conexion = sqlite3.connect('db.sqlite3')
            cursor = conexion.cursor()

            # Ejecutar la consulta SQL
            cursor.execute("SELECT * FROM libreria_libro")
            libros = cursor.fetchall()

            # Cerrar la conexión
            conexion.close()

            # Formatear los resultados como una lista de diccionarios
            libros_list = []
            for libro in libros:
                libro_dict = {
                    'id': libro[0],
                    'titulo': libro[1],
                    'autor': libro[2],
                    'fecha_publicacion': libro[3],
                    'precio': libro[4]
                }
                libros_list.append(libro_dict)

            return Response(libros_list, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)