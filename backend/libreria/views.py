# View: Gestiona las solicitudes HTTP y devuelve respuestas web.
# En DRF, las vistas pueden manejar la lógica CRUD y están estrechamente
# integradas con los serializadores para manejar la representación de datos.

from django.shortcuts import render
from rest_framework import viewsets
from .serializer import LibroSerializer, MultaSerializer, PrestamoSerializer, UsuarioSerializer
from rest_framework import filters
from rest_framework.views import Response

from .models import libro, multa, prestamo
from .models import usuario
# from django_filters.rest_framework import filters


def tipoUsuario():
    
    return render ("listaTipoUsuario")

# Create your views here.
#se crea la clase view por cada modelo
class LibroView(viewsets.ModelViewSet):
    serializer_class = LibroSerializer
    queryset = libro.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields=['$titulo', '$autor','$genero', '$isbn']
    
class UsuarioView(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    queryset = usuario.objects.all()
    filter_backends = [filters.SearchFilter]
    search_fields=['$nombres', '$correo']
    
class PrestamoView(viewsets.ModelViewSet):
    serializer_class = PrestamoSerializer
    queryset = prestamo.objects.all()
    
class MultaView(viewsets.ModelViewSet):
    serializer_class = MultaSerializer
    queryset = multa.objects.all()