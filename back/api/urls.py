from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenBlacklistView)
from .views import listar_ambientes, AmbientesView, AmbientesDetailView, AmbientesSearchView
from .views import listar_sensores, SensoresView, SensoresDetailView, SensoresSearchView
from .views import listar_historico, HistoricoView, HistoricoDetailView, HistoricoSearchView
from .views import cadastrar_usuario, importar_planilhas

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),

    path('ambientes', listar_ambientes),
    path('ambi', AmbientesView.as_view()),
    path('ambi/<int:pk>', AmbientesDetailView.as_view()),
    path('ambientes/search/', AmbientesSearchView.as_view()),

    path('sensores', listar_sensores),
    path('sens', SensoresView.as_view()),
    path('sens/<int:pk>', SensoresDetailView.as_view()),
    path('sensores/search/', SensoresSearchView.as_view()),

    path('historico', listar_historico),
    path('hist', HistoricoView.as_view()),
    path('hist/<int:pk>', HistoricoDetailView.as_view()),
    path('historico/search/', HistoricoSearchView.as_view()),

    path('cadastro/', cadastrar_usuario, name='cadastro'),
    path('importar/', importar_planilhas, name='importar_planilhas')
]