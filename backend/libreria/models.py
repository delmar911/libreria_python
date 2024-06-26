
from django.db import models

# Create your models here.
#blank = true acepta valores nulos
#charField campo de texto

class libro(models.Model):
    
    titulo = models.CharField(max_length=30)
    autor = models.CharField(max_length=60)
    isbn = models.CharField(max_length=13)
    genero = models.CharField(max_length=50)
    numero_disponible = models.IntegerField()
    numero_ocupado = models.IntegerField()

    def __str__(self):
       return self.titulo

class usuario(models.Model):
    lector = 'Lector'
    bibliotecario = 'Bibliotecario'
    administrador = 'Administrador'
    
    tipo_usuario = [
        (lector, 'Lector'),
        (bibliotecario, 'Bibliotecario'),
        (administrador, 'Administrador')
    ]

    nombres = models.CharField(max_length=60)
    direccion = models.CharField(max_length=60)
    correo = models.CharField(max_length=150)
    tipoUsuario = models.CharField(choices=tipo_usuario, max_length=60)

    def __str__(self):
       return self.nombres

class prestamo(models.Model):
    
    prestamo = 'prestamo'
    entregado = 'entregado'
    cancelado = 'cancelado'
    
    estado_tipo_prestamo = [
        (prestamo, 'prestamo'),
        (entregado, 'entregado'),
        (cancelado, 'cancelado')
    ]

    fecha_prestamo = models.DateField()
    fecha_devolucion = models.DateField()
    usuario = models.ForeignKey(usuario, related_name='prestamos', on_delete=models.PROTECT)
    libro = models.ForeignKey(libro, related_name='prestamos', on_delete=models.CASCADE)
    estado_prestamo = models.CharField(choices=estado_tipo_prestamo, max_length=60)
    
    def __str__(self):
        return f"Prestamo de {self.libro.titulo} a {self.usuario.nombres}"

class multa(models.Model):
    pendiente = 'pendiente'
    pagado = 'pagado'
    estado = [
        (pendiente, 'pendiente'),
        (pagado, 'pagado')
    ]
    
    fecha_multa = models.DateField()
    usuario_multado = models.ForeignKey(usuario,related_name='multa', on_delete=models.CASCADE)
    prestamo = models.ForeignKey(prestamo, related_name='multa', on_delete=models.CASCADE)
    valor_multa = models.IntegerField()
    
    estado_multa = models.CharField(choices=estado, max_length=60)
    
    
    def __str__(self):
        return f"Multa de {self.valor_multa} para {self.usuario_multado}"

    