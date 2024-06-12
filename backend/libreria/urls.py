from django.urls import path,include

from rest_framework import routers

from libreria import views

# Crear enrutadores separados para las vistas de Libro y Usuario
router_libros = routers.DefaultRouter()
router_libros.register(r'libros', views.LibroView)

router_usuarios = routers.DefaultRouter()
router_usuarios.register(r'usuarios', views.UsuarioView)

urlpatterns = [
    # Incluir las URLs de los enrutadores correspondientes en los patrones de URL
    path("api/v1/", include(router_libros.urls)),
    path("api/v1/", include(router_usuarios.urls)),
]
