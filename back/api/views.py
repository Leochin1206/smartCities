from django.http import HttpResponse
from .models import Contador, Luminosidade,  Temperatura, Umidade
from .serializer import ContadorSerializer, LuminosidadeSerializer, TemperaturaSerializer, UmidadeSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

# ======================= Contador =======================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_contador(request):
    if request.method == 'GET':
        queryset = Contador.objects.all()
        serializer = ContadorSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ContadorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class ContadorView(ListCreateAPIView):
    queryset = Contador.objects.all()
    serializer_class = ContadorSerializer
    permission_classes = [IsAuthenticated]

class ContadorDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Contador.objects.all()
    serializer_class = ContadorSerializer
    permission_classes = [IsAuthenticated]

class ContadorSearchView(ListAPIView):
    queryset = Contador.objects.all()
    serializer_class = ContadorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ['inteiro', 'caracteres']