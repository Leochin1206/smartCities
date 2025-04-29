from django.db import models
from django.contrib.auth.models import AbstractUser 

class CustomUser(AbstractUser): 
    telefone = models.CharField(max_length=20, blank=True) 
    data_nascimento = models.DateField(null=True, blank=True)