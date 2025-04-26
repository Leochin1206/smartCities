from django.db import models

'''
    exemplo de chave estrangeira:
        manutentor = models.ForeignKey(Manutentores, on_delete=models.SET_NULL, null=True, blank=True)

    exemplo de data:
        data_abertura = models.DateTimeField(auto_now_add=True)
    
    exemplo de booleano:
        is_superUser = models.BooleanField(default=False)
        is_staff = models.BooleanField(default=True)
'''

class Contador(models.Model):
    inteiro = models.IntegerField()
    caracteres = models.CharField(max_length=255)

class Luminosidade(models.Model):
    inteiro = models.IntegerField()
    caracteres = models.CharField(max_length=255)

class Temperatura(models.Model):
    inteiro = models.IntegerField()
    caracteres = models.CharField(max_length=255)

class Umidade(models.Model):
    inteiro = models.IntegerField()
    caracteres = models.CharField(max_length=255)