from django.db import models

# Create your models here.

class año_mision(models.Model):
    año = models.CharField(max_length=5)
    serie_letra = models.CharField(max_length=2)
    
    def __str__(self):
        return f"{self.año} - {self.serie_letra}"
    
class bancos(models.Model):
    indicador = models.CharField(max_length=10)
    banco = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.banco} - {self.indicador}"