from django.contrib import admin

from libreria.models import libro, usuario

# Register your models here.

#esto se hace para que salgan las entidades en el admin de django
admin.site.register(libro)
admin.site.register(usuario)
