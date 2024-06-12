
from django.db import models

# Create your models here.
#blank = true acepta valores nulos
#charField campo de texto

class libro(models.Model):
    
    titulo = models.CharField(max_length=30 )
    autor = models.CharField(max_length=60 )
    isbn = models.CharField(max_length=13)
    genero = models.CharField(max_length=50)
    numero_disponible = models.IntegerField()
    numero_ocupado = models.IntegerField()
   
    def __str__(self):
       return self.titulo
   
class usuario(models.Model):
    tipo_usuario = [
        (1, 'Lector'),
        (2, 'Bibliotecario'),
        (3, 'Administrador')
    ]
    nombres = models.CharField(max_length=60)
    direccion = models.CharField(max_length=60)
    correo = models.CharField(max_length=150)
    tipoUsuario = models.IntegerField(choices=tipo_usuario)
    
    def __str__(self):
       return self.nombres
    
    
    