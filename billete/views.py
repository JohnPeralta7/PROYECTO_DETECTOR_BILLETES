from django.shortcuts import render

# Create your views here.
def inicio(request):
    """Vista para la página de inicio"""
    return render(request, 'billete/inicio.html')

def detectar_billetes(request):
    """Vista para detectar billetes"""
    return render(request, 'billete/billetes.html')

def detectar_monedas(request):
    """Vista para detectar monedas"""
    return render(request, 'billete/monedas.html')



