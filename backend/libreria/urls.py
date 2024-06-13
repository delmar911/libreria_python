from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers

from libreria import views

# Crear enrutadores separados para las vistas de Libro y Usuario
router_libros = routers.DefaultRouter()
router_libros.register(r'libros', views.LibroView)

router_usuarios = routers.DefaultRouter()
router_usuarios.register(r'usuarios', views.UsuarioView)

router_prestamo = routers.DefaultRouter()
router_prestamo.register(r'prestamo', views.PrestamoView)

router_multa = routers.DefaultRouter()
router_multa.register(r'multa', views.MultaView)

urlpatterns = [
    # Incluir las URLs de los enrutadores correspondientes en los patrones de URL
    path("api/v1/", include(router_libros.urls)),
    path("docs/", include_docs_urls(title="Libreria Api")),
    path("api/v1/", include(router_usuarios.urls)),
    path("api/v1/", include(router_prestamo.urls)),
    path("api/v1/", include(router_multa.urls)),
    
]
