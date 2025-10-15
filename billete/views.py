from django.shortcuts import render
import numpy as np
import base64
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import cv2
from billete.utils import Tools
import os
from django.conf import settings

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
        
        
        
        # Construir la ruta absoluta a static/img/
        static_img_dir = os.path.join(settings.BASE_DIR, 'billete', 'static', 'img')
        if not os.path.exists(static_img_dir):
            os.makedirs(static_img_dir)
        img_path = os.path.join(static_img_dir, 'img.jpeg')
        cv2.imwrite(img_path, img)
        
        think = Tools()
        think.scan_billete(img_path)
        
        img_url = "static/img/output.jpg"
        
        # Aquí puedes procesar la imagen con OpenCV
        # Por ejemplo, solo devolvemos el tamaño de la imagen:
        resultado = "Imagen procesada y señalada"
        return JsonResponse({'resultado': resultado, 'img_url': img_url})
    return JsonResponse({'error': 'Método no permitido'}, status=405)

def detectar_billetes(request):
    """Vista para detectar billetes"""
    return render(request, 'billete/billetes.html')

def detectar_monedas(request):
    """Vista para detectar monedas"""
    return render(request, 'billete/monedas.html')



