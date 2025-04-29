from django.db import models
from django.contrib.auth.models import AbstractUser 
class Ambientes(models.Model):
    sig = models.CharField(max_length=255)
    descricao = models.CharField(max_length=255)
    ni = models.CharField(max_length=255)
    responsavel = models.CharField(max_length=255)

class Sensores(models.Model):
    sensor = models.CharField(max_length=255)
    mac_address = models.CharField(max_length=255)
    unidade_med = models.CharField(max_length=255)
    valor = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.CharField(max_length=255)
    timestamp = models.CharField(max_length=255)

class Historico(models.Model):
    observacoes = models.TextField()
    sensor = models.ForeignKey(Sensores, on_delete=models.CASCADE)
    ambiente = models.ForeignKey(Ambientes, on_delete=models.CASCADE)

class CustomUser(AbstractUser): 
    telefone = models.CharField(max_length=20, blank=True) 
    data_nascimento = models.DateField(null=True, blank=True)