from django.urls import path
from . import views

app_name = 'billete'

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('billetes/', views.detectar_billetes, name='billetes'),
    path('monedas/', views.detectar_monedas, name='monedas'),
    path('estado/', views.estado, name='estado'),
    path('procesar-imagen/', views.procesar_imagen, name='procesar_imagen'),
    #
    path('procesar-moneda/', views.procesar_moneda, name='procesar_moneda'),
    path('procesar-estado/', views.procesar_estado, name='procesar_estado'),
]
