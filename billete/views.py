from django.shortcuts import render
import numpy as np
import base64
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import cv2
from azure.storage.blob import BlobServiceClient
import io
import uuid

# Create your views here.
def inicio(request):
    """Vista para la página de inicio"""
    
    return render(request, 'billete/inicio.html')

@csrf_exempt
def procesar_imagen(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        img_data = data['image'].split(',')[1]
        img_bytes = base64.b64decode(img_data)
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        
        
        # Aquí puedes procesar la imagen con OpenCV
        # Por ejemplo, solo devolvemos el tamaño de la imagen:
        resultado = f"Imagen recibida. Tamaño: {img.shape}"
        return JsonResponse({'resultado': resultado})
    return JsonResponse({'error': 'Método no permitido'}, status=405)

def detectar_billetes(request):
    """Vista para detectar billetes"""
    return render(request, 'billete/billetes.html')

def detectar_monedas(request):
    """Vista para detectar monedas"""
    return render(request, 'billete/monedas.html')



