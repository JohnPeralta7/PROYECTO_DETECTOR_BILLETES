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
from .models import bancos

# Create your views here.
def inicio(request):
    """Vista para la página de inicio"""
    
    return render(request, 'billete/inicio.html')

@csrf_exempt
def procesar_imagen(request):
    mssj = [
        
        "Textura analizada: Papel Moneda",
        "Textura analizada: No es Papel Moneda",
        "Cumple con codigo de coherencia",
        "No cumple con codigo de coherencia",
        "Esta dentro de la base de datos de la FED",
        "NO esta dentro de la base de datos de la FED",
        "Billete Verdadero",
        "Billete Falso!",
        "Tomar foto al billete donde se vean sus codigos para validarlo",
        "Falta mas informacion para determinar",

    ]

    


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
        think.clean()
        think.scan(img_path, output_path)

        


        if (think.label == "billete_frontal"):

            resultado1 = mssj[0]
            codes = think.code_read()
            first = ''
            second = ''
            valid = ''
            if len(codes) > 2:
                first = codes[1][1]
                second = codes[2][0]
                valid = codes[2]
                print(first, second) #comprobar si todo bien
            elif len(codes) <= 2:
                first = codes[0][1]
                second = codes[1][0]
                valid = codes[1]
                print(first, second) #comprobar si todo bien
            else:
                print('hola')

            if first.upper() == second.upper():
                resultado2 = mssj[2]
                #ORM PARA VALIDAR
                banks = bancos.objects.all().values()
                print(banks)
                valid = str(valid).strip()
                print("💬 Valor de valid:", repr(valid))
                print("📋 Tipo de valid:", type(valid))
                print("📊 Valores en la base de datos:", list(bancos.objects.values_list('indicador', flat=True)))

                consult_bd = list(bancos.objects.values_list('indicador', flat=True))
                if valid in consult_bd:
                    resultado3 = mssj[4] 
                else:
                    resultado3 = mssj[5]
                '''
                bank = bancos.objects.filter(indicador__iexact=valid).first()

                if bank:
                    resultado3 = mssj[4]         
                else:
                    resultado3 = mssj[5] '''

            elif first != second:
                resultado2 = mssj[3]
                resultado3 = ''
            else:
                resultado2 = ''
                resultado3 = ''

        elif (think.label == "billete_trasero"):

            resultado1 = mssj[8]
            resultado2 = ''
            resultado3 = ''
            
        else:
            resultado1 = mssj[1] 


        if (resultado1 == mssj[0] and resultado2 == mssj[2] and resultado3 == mssj[4] ):
            resultado4 = mssj[6]
        elif (resultado1 == mssj[8]):
            resultado4 = mssj[9]    
        else:
            resultado2 = mssj[3]
            resultado3 = mssj[5]
            resultado4 = mssj[7]
            ...

        
        img_url = "static/img/output.jpg"
        
        # Aquí puedes procesar la imagen con OpenCV
        # Por ejemplo, solo devolvemos el tamaño de la imagen:
        resultado = "Imagen procesada y señalada"
        return JsonResponse({'resultado': [resultado,resultado1,  resultado2, resultado3, resultado4 ], 'img_url': img_url})
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



