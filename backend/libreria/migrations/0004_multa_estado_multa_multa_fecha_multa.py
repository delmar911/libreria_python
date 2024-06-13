# Generated by Django 5.0.6 on 2024-06-13 19:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('libreria', '0003_rename_pretamo_multa_prestamo'),
    ]

    operations = [
        migrations.AddField(
            model_name='multa',
            name='estado_multa',
            field=models.IntegerField(choices=[(1, 'Pendiente'), (2, 'Pagado')], default=1),
        ),
        migrations.AddField(
            model_name='multa',
            name='fecha_multa',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
