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
        output_path = os.path.join(static_img_dir, 'output.jpg')
        cv2.imwrite(img_path, img)
        
        think = Tools()
        think.scan(img_path, output_path)
        
        img_url = "static/img/output.jpg"
        
        # Aquí puedes procesar la imagen con OpenCV
        # Por ejemplo, solo devolvemos el tamaño de la imagen:
        resultado = "Imagen procesada y señalada"
        return JsonResponse({'resultado': resultado, 'img_url': img_url})
    return JsonResponse({'error': 'Método no permitido'}, status=405)











#----------------------------------------------------------------
#COMPLETO MONEDAS
@csrf_exempt
def procesar_moneda(request):
    """Procesar monedas - detección y conteo"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            img_data = data['image'].split(',')[1]
            img_bytes = base64.b64decode(img_data)
            nparr = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            # Construir la ruta absoluta a static/img/
            static_img_dir = os.path.join(settings.BASE_DIR, 'billete', 'static', 'img')
            if not os.path.exists(static_img_dir):
                os.makedirs(static_img_dir)
            
            img_path = os.path.join(static_img_dir, 'img_moneda.jpeg')
            output_path = os.path.join(static_img_dir, 'coin_result.jpg')
            cv2.imwrite(img_path, img)
            
            think = Tools()
            think.scan_coin(img, output_path)
            
            img_url = "static/img/coin_result.jpg"
            resultado = "✓ Monedas identificadas y contadas"
            
            return JsonResponse({'resultado': resultado, 'img_url': img_url})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Método no permitido'}, status=405)



#ESTADO DEL BILLETE
@csrf_exempt
def procesar_estado(request):
    """Procesar estado del billete - análisis de deterioro"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            img_data = data['image'].split(',')[1]
            img_bytes = base64.b64decode(img_data)
            nparr = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            # Construir la ruta absoluta a static/img/
            static_img_dir = os.path.join(settings.BASE_DIR, 'billete', 'static', 'img')
            if not os.path.exists(static_img_dir):
                os.makedirs(static_img_dir)
            
            img_path = os.path.join(static_img_dir, 'img_estado.jpeg')
            output_path = os.path.join(static_img_dir, 'estado_result.jpg')
            cv2.imwrite(img_path, img)
            
            # Aquí puedes agregar tu lógica específica para analizar el estado
            # Por ahora usamos el mismo método scan como placeholder
            think = Tools()
            think.scan_state(img_path, output_path)
            
            img_url = "static/img/estado_result.jpg"
            resultado = "✓ Estado del billete analizado"
            
            return JsonResponse({'resultado': resultado, 'img_url': img_url})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Método no permitido'}, status=405)





#----------------------------------------------------------------
















def detectar_billetes(request):
    """Vista para detectar billetes"""
    return render(request, 'billete/billetes.html')


@csrf_exempt
def procesar_moneda(request):
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
        output_path = os.path.join(static_img_dir, 'coin_result.jpg')
        cv2.imwrite(img_path, img)
        
        think = Tools()
        think.scan_coin(img_path, output_path)
        
        img_url = "static/img/coin_result.jpg"
        
        # Aquí puedes procesar la imagen con OpenCV
        # Por ejemplo, solo devolvemos el tamaño de la imagen:
        resultado = "Imagen procesada y señalada"
        return JsonResponse({'resultado': resultado, 'img_url': img_url})
    return JsonResponse({'error': 'Método no permitido'}, status=405)



def detectar_monedas(request):
    """Vista para detectar monedas"""
    return render(request, 'billete/monedas.html')


def estado(request):
    """Vista para la página de estado (analizar el estado del billete/moneda)."""
    return render(request, 'billete/estado.html')



