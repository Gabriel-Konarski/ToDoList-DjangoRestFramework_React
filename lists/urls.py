from django.urls import path
from . import views
from rest_framework_simplejwt.views import (TokenRefreshView)

urlpatterns = [
    path("lists/", views.lists, name="lists"),
    path("list/<str:pk>/", views.viewList, name="view"),

    # simple jwt
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
