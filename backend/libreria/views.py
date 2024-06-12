# View: Gestiona las solicitudes HTTP y devuelve respuestas web.
# En DRF, las vistas pueden manejar la lógica CRUD y están estrechamente
# integradas con los serializadores para manejar la representación de datos.

from django.shortcuts import render
from rest_framework import viewsets
from .serializer import LibroSerializer, UsuarioSerializer
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