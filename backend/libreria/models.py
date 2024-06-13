
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

class prestamo(models.Model):
    estado_prestamo = [
        (1, 'Préstamo'),
        (2, 'Entregado'),
        (3, 'Cancelado')
    ]
    fecha_prestamo = models.DateField()
    fecha_devolucion = models.DateField()
    usuario = models.ForeignKey(usuario, related_name='prestamo', on_delete=models.PROTECT)
    libro = models.ForeignKey(libro, related_name='prestamo', on_delete=models.CASCADE)
    estado_prestamo = models.IntegerField(choices=estado_prestamo)
    
    def __str__(self):
        return f"Prestamo de {self.libro} a {self.usuario} ({self.get_estado_prestamo_display()})"

class multa(models.Model):
    fecha_multa = models.DateField()
    usuario_multado = models.ForeignKey(usuario,related_name='multa', on_delete=models.CASCADE)
    prestamo = models.ForeignKey(prestamo, related_name='multa', on_delete=models.CASCADE)
    valor_multa = models.IntegerField()
    estado = [
        (1, 'Pendiente'),
        (2, 'Pagado')
    ]
    estado_multa = models.IntegerField(choices=estado, default=1)
    
    
    def __str__(self):
        return f"Multa de {self.valor_multa} para {self.usuario_multado}"

    