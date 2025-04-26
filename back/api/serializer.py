from rest_framework import serializers
from .models import Contador, Luminosidade, Temperatura, Umidade

class ContadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contador
        fields = '__all__'

class LuminosidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Luminosidade
        fields = '__all__'

class TemperaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temperatura
        fields = '__all__'

class UmidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Umidade
        fields = '__all__'