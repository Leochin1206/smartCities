from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenBlacklistView)
from .views import listar_contador, ContadorView, ContadorDetailView, ContadorSearchView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),

    path('contador', listar_contador),
    path('cont', ContadorView.as_view()),
    path('cont/<int:pk>', ContadorDetailView.as_view()),
    path('contador/search/', ContadorSearchView.as_view()),
]