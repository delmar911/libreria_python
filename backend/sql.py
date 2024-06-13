from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import sqlite3

class LibroConsultaView(APIView):
    def get(self, request, titulo=None, *args, **kwargs):
        try:
            # Conectar a la base de datos
            conexion = sqlite3.connect('db.sqlite3')
            cursor = conexion.cursor()

            # Construir la consulta SQL con el filtro por título
            query = "SELECT * FROM libreria_libro WHERE titulo LIKE ?"
            params = [f"%{titulo}%"]
            cursor.execute(query, params)
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
