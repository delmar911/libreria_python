# Generated by Django 5.0.6 on 2024-06-13 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('libreria', '0004_multa_estado_multa_multa_fecha_multa'),
    ]

    operations = [
        migrations.AlterField(
            model_name='multa',
            name='fecha_multa',
            field=models.DateField(),
        ),
    ]
