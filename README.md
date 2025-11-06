Guía de Instalación - Detector de Billetes y Monedas
Paso 1: Instalar Python
1.	Descargar Python
○	Ve a python.org
○	Descarga Python 3.8 o superior
○	IMPORTANTE: Marca "Add Python to PATH" durante la instalación
2.	o si ya tienes instalado Verificar instalación
cmd
   python --version
   pip --version


Paso 2: Instalar Git (opcional pero recomendado)
1.	Descarga Git desde git-scm.com
2.	Instala con opciones predeterminadas
3.	Verifica:
cmd
   git --version


Paso 4: Descargar el Proyecto
Opción A: Con Git
open git bash here
git init .
git clone 
https://github.com/JohnPeralta7/PROYECTO_DETECTOR_BILLETES.git       ose el link del repositorio

Opción B: Descarga Manual
1.	Descarga el ZIP del proyecto
2.	Extrae en una carpeta de tu elección
3.	Abre CMD en esa carpeta
luego abrir el proyecto con su editor de código
o con open git bash here 
code .
Paso 5: Crear Entorno Virtual opcional
cmd
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
venv\Scripts\activate

# Tu prompt debería mostrar (venv) al inicio

Paso 6: Instalar Dependencias
cmd
# Actualizar pip
python -m pip install --upgrade pip

# Instalar dependencias
pip install django==5.2.7
pip install ultralytics
pip install opencv-python
pip install numpy
pip install python-decouple
pip install psycopg2-binary

# O instalar todas desde requirements.txt
pip install -r requirements.txt
Paso 8: Ejecutar el Servidor
cmd
python manage.py runserver
Abre tu navegador en: http://127.0.0.1:8000/



Guía de Uso - Detector de Billetes y Monedas 💵🪙
📖 Bienvenido
Esta aplicación te permite detectar billetes falsos, identificar monedas no locales y analizar el estado de conservación de billetes mediante inteligencia artificial.

🏠 Página de Inicio
Al abrir la aplicación, verás tres opciones principales:
Opciones Disponibles
1.	🔍 Escanear Billetes
○	Detecta si un billete es auténtico o falso
○	Identifica la denominación
○	Señala características sospechosas
2.	🪙 Escanear Monedas
○	Identifica monedas de Ecuador
○	Cuenta cuántas monedas hay
○	Calcula el valor total
3.	📊 Escanear Estado
○	Analiza el estado de conservación
○	Detecta rasgaduras y manchas
○	Evalúa nivel de deterioro
  4 🌐 Cambiar Idioma 
○	español
○	inglés
💵 Cómo Detectar Billetes
Paso 1: Acceder al Detector
1.	Haz clic en "Escanear billetes"
2.	Permite el acceso a la cámara cuando se solicite
Paso 2: Capturar Imagen
Opción A: Usar la Cámara
1.	Coloca el billete frente a la cámara
2.	Asegúrate de tener buena iluminación
3.	Mantén el billete plano y visible
4.	Haz clic en "Escanea tu billete" 💵
Opción B: Subir una Foto
1.	Haz clic en "Subir imagen" 📤
2.	Selecciona una foto de tu galería
3.	Espera a que se procese
Paso 3: Ver Resultados
●	El sistema procesará la imagen
●	Verás el billete con marcadores
●	Lee el resultado en la caja de texto
Resultados Posibles
●	✅ "Billete auténtico": El billete es legítimo
●	⚠️ "Billete sospechoso": Puede ser falso
●	❌ "Billete falso detectado": No es auténtico
Consejos para Mejores Resultados
●	✓ Usa luz natural o buena iluminación artificial
●	✓ Coloca el billete sobre fondo oscuro
●	✓ Evita sombras sobre el billete
●	✓ Mantén la cámara estable
●	✓ Enfoca todo el billete en el cuadro
🪙 Cómo Detectar Monedas
Paso 1: Preparar las Monedas
1.	Coloca las monedas sobre una superficie plana
2.	Sepáralas para que no se toquen
3.	Usa un fondo de color uniforme (preferiblemente oscuro)
Paso 2: Escanear
1.	Haz clic en "Escanear monedas"
2.	Permite el acceso a la cámara
3.	Enfoca todas las monedas en el cuadro
4.	Haz clic en "Escanea tus monedas" 🪙
Paso 3: Interpretar Resultados
meguie con esto para las monedas checa si esta bien 
 
El sistema identificará:
●	Denominación de cada moneda (1¢, 5¢, 10¢, 25¢, 50¢)
●	Cantidad de monedas ,
●	Ubicación de cada moneda (círculos verdes)


Consejos para Monedas
●	✓ Limpia las monedas antes de escanear
●	✓ No sobreponer monedas
●	✓ Evita brillos fuertes en las monedas
📊 Cómo Analizar Estado de Billetes
Paso 1: Preparar el Billete
1.	Extiende el billete completamente
2.	Alísalo si está arrugado
3.	Colócalo sobre fondo uniforme
Paso 2: Capturar
1.	Haz clic en "Escanear estado"
2.	Captura o sube imagen del billete
3.	Haz clic en "Analizar estado" 📊
Paso 3: Comprender el Análisis
El sistema evaluará:
●	Nivel de deterioro: Nuevo, Usado, Deteriorado
●	Rasgaduras: Ubicación y severidad
●	Manchas: Tipo y cantidad
●	Decoloración: Áreas descoloridas
Estados Posibles
 si es que hace eso si no canbiale
●	🟢 Nuevo/Excelente: Apto para circulación
●	🟡 Usado/Bueno: Circulable con desgaste normal
●	🟠 Deteriorado: Circulable con precaución
●	🔴 Muy Deteriorado: No apto para circulación

🌐 Cambiar Idioma
Selector de Idioma
1.	Haz clic en el botón de idioma (esquina superior derecha)
2.	Verás las opciones: 🇪🇸 Español / 🇬🇧 English
3.	Selecciona tu idioma preferido
Nota: El idioma se guarda automáticamente y persiste entre sesiones.
________________________________________
🔄 Botón Reiniciar
Cuándo Usar
●	Después de procesar una imagen
●	Si quieres escanear otro billete/moneda
●	Si ocurre un error
Cómo Funciona
1.	Haz clic en "Reiniciar" 🔄
2.	La cámara se reiniciará
3.	Podrás hacer un nuevo escaneo
📱 Uso en Dispositivos Móviles
Permisos de Cámara
1.	La primera vez, el navegador pedirá permiso
2.	Selecciona "Permitir"
3.	Si denegaste el permiso:
○	Android: Configuración → Apps → Navegador → Permisos → Cámara
○	iOS: Ajustes → Safari → Cámara → Permitir
Orientación Recomendada
●	Billetes: Horizontal (landscape)
●	Monedas: Vertical (portrait) o horizontal
●	Estado: Horizontal preferiblemente
Consejos Móviles
●	✓ Usa ambas manos para estabilizar
●	✓ Apoya los codos en una superficie
●	✓ Evita hacer zoom digital
●	✓ Limpia la lente de la cámara
💻 Uso en Computadora
Cámara Web
1.	Coloca el billete/moneda frente a la webcam
2.	Ajusta la distancia para enfocar bien
3.	Usa iluminación adicional si es necesario
Subir Imágenes
1.	Toma foto con tu teléfono móvil
2.	Transfiérela a la computadora
3.	Usa el botón "Subir imagen" 📤

❓ Solución de Problemas
"Permiso de cámara denegado"
Solución:
1.	Haz clic en el ícono de candado 🔒 en la barra de direcciones
2.	Busca "Cámara" y selecciona "Permitir"
3.	Recarga la página (F5)
"No se encontró cámara"
Solución:
●	Verifica que tu dispositivo tenga cámara
●	Usa el botón "Subir imagen" 📤 como alternativa
●	Conecta una cámara externa (en computadora)
"Error al procesar la imagen"
Causas comunes:
●	Imagen muy borrosa
●	Iluminación insuficiente
●	Billete/moneda no visible
●	Conexión a internet inestable
Solución:
1.	Mejora la iluminación
2.	Toma una nueva foto más clara
3.	Verifica tu conexión a internet
4.	Haz clic en "Reiniciar" 🔄
La imagen se ve oscura
Solución:
●	Aumenta la iluminación del ambiente
●	Acércate a una ventana (luz natural)
●	Usa una lámpara adicional
●	Ajusta el brillo de tu pantalla
Resultados Inexactos
Posibles causas:
●	Billete/moneda parcialmente visible
●	Múltiples billetes superpuestos
●	Monedas muy juntas
●	Imagen de baja calidad
Solución:
●	Asegura que solo haya un billete visible
●	Separa las monedas
●	Toma foto con mejor calidad


Guía Técnica - Detector de Billetes y Monedas

📋 Índice de Archivos
1.	views.py - Controladores Django
2.	utils.py - Procesamiento de IA
3.	camara.js - Control de Cámara
4.	translations.js - Sistema de Idiomas
5.	menu.js - Navegación
6.	models.py - Modelos de Base de Datos
7.	settings.py - Configuración
8.	urls.py - Enrutamiento
📄 1. views.py - Controladores Django {#views}
Importaciones
python
from django.shortcuts import render
# render: función para renderizar templates HTML
# Parámetros: (request, 'ruta/template.html', contexto)

import numpy as np
# numpy: biblioteca para arrays y matemáticas
# Usada para manipular imágenes como matrices

import base64
# base64: codifica/decodifica datos binarios a texto
# Usado para recibir imágenes desde JavaScript

from django.views.decorators.csrf import csrf_exempt
# csrf_exempt: desactiva protección CSRF
# ⚠️ Solo para desarrollo, no usar en producción

from django.http import JsonResponse
# JsonResponse: retorna respuestas JSON al cliente
# Automáticamente serializa diccionarios Python

import json
# json: maneja datos en formato JSON
# Usado para parsear el body del request

import cv2
# OpenCV: biblioteca de procesamiento de imágenes
# Usada para leer, escribir y manipular imágenes

from billete.utils import Tools
# Tools: clase personalizada con modelos YOLO
# Contiene métodos scan(), scan_coin(), scan_state()

import os
# os: operaciones del sistema operativo
# Usado para manejar rutas de archivos

from django.conf import settings
# settings: configuración de Django
# Acceso a BASE_DIR, DEBUG, etc.


Vista: inicio()
python
def inicio(request):
    """Vista para la página de inicio"""
    # Función que maneja la ruta principal '/'
    # request: objeto HttpRequest con datos de la petición
    
    return render(request, 'billete/inicio.html')
    # render() busca el template en:
    # billete/templates/billete/inicio.html
    # Retorna HttpResponse con HTML renderizado
Flujo:
1.	Usuario accede a http://localhost:8000/
2.	Django enruta a esta función
3.	Renderiza inicio.html
4.	Retorna HTML al navegador

Vista: procesar_imagen()
python
@csrf_exempt
# Decorador que desactiva verificación CSRF
# Necesario porque recibimos datos desde JavaScript
# ⚠️ En producción, implementar CSRF correctamente

def procesar_imagen(request):
    # Función para procesar billetes
    
    if request.method == 'POST':
        # Verificar que sea una petición POST
        # GET no contendría datos de imagen
        
        data = json.loads(request.body)
        # request.body: bytes del cuerpo del request
        # json.loads(): convierte JSON string a diccionario Python
        # data = {'image': 'data:image/jpeg;base64,/9j/4AAQ...'}
        
        img_data = data['image'].split(',')[1]
        # data['image']: "data:image/jpeg;base64,XXXXXXX"
        # .split(',')[1]: obtiene solo "XXXXXXX" (datos Base64)
        # [0] sería "data:image/jpeg;base64"
        
        img_bytes = base64.b64decode(img_data)
        # Decodifica Base64 string a bytes
        # img_bytes: secuencia de bytes de la imagen JPEG
        
        nparr = np.frombuffer(img_bytes, np.uint8)
        # np.frombuffer(): crea array numpy desde bytes
        # np.uint8: tipo de dato (entero sin signo 8 bits)
        # nparr: array 1D con valores 0-255
        
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        # cv2.imdecode(): decodifica bytes a imagen
        # cv2.IMREAD_COLOR: cargar como imagen color (BGR)
        # img: array numpy 3D [altura, ancho, canales]
        # Ejemplo: (1080, 1920, 3)
        
        
        # Construir rutas para guardar imágenes
        static_img_dir = os.path.join(
            settings.BASE_DIR,           # /ruta/al/proyecto/DBM
            'billete',                   # /ruta/al/proyecto/DBM/billete
            'static',                    # /ruta/al/proyecto/DBM/billete/static
            'img'                        # /ruta/al/proyecto/DBM/billete/static/img
        )
        # os.path.join(): une rutas de forma segura
        # independiente del sistema operativo (/ vs \)
        
        if not os.path.exists(static_img_dir):
            # Verificar si el directorio existe
            os.makedirs(static_img_dir)
            # Crear directorio y todos los padres necesarios
        
        img_path = os.path.join(static_img_dir, 'img.jpeg')
        # Ruta completa: .../billete/static/img/img.jpeg
        # Archivo temporal de entrada
        
        output_path = os.path.join(static_img_dir, 'output.jpg')
        # Ruta completa: .../billete/static/img/output.jpg
        # Archivo de salida con anotaciones YOLO
        
        cv2.imwrite(img_path, img)
        # Guardar imagen en disco
        # img_path: ruta donde guardar
        # img: array numpy de la imagen
        
        think = Tools()
        # Instanciar clase Tools
        # Carga los 3 modelos YOLO en memoria
        # ⚠️ Esto puede ser lento, considerar singleton
        
        think.scan(img_path, output_path)
        # Ejecutar detección de billetes
        # img_path: imagen de entrada
        # output_path: donde guardar resultado
        # El modelo YOLO procesa y guarda imagen con boxes
        
        img_url = "static/img/output.jpg"
        # URL relativa para el frontend
        # Accesible desde: http://localhost:8000/static/img/output.jpg
        
        resultado = "Imagen procesada y señalada"
        # Mensaje para mostrar al usuario
        
        return JsonResponse({
            'resultado': resultado,
            'img_url': img_url
        })
        # Retorna JSON al frontend:
        # {
        #   "resultado": "Imagen procesada y señalada",
        #   "img_url": "static/img/output.jpg"
        # }
        
    return JsonResponse({'error': 'Método no permitido'}, status=405)
    # Si no es POST, retornar error 405
    # status=405: Method Not Allowed
Flujo Completo:
1. JavaScript envía POST con imagen Base64
2. Django recibe y parsea JSON
3. Extrae datos Base64
4. Decodifica a bytes
5. Convierte a array numpy
6. Decodifica a imagen OpenCV
7. Guarda en disco
8. Ejecuta modelo YOLO
9. YOLO guarda resultado
10. Retorna JSON con URL

Guía Código Línea por Línea - Detector de Billetes y Monedas
📋 Índice de Archivos
1.	views.py - Controladores Django
2.	utils.py - Procesamiento de IA
3.	camara.js - Control de Cámara
4.	translations.js - Sistema de Idiomas
5.	menu.js - Navegación
6.	models.py - Modelos de Base de Datos
7.	settings.py - Configuración
8.	urls.py - Enrutamiento
________________________________________
📄 1. views.py - Controladores Django {#views}
Importaciones
python
from django.shortcuts import render
# render: función para renderizar templates HTML
# Parámetros: (request, 'ruta/template.html', contexto)

import numpy as np
# numpy: biblioteca para arrays y matemáticas
# Usada para manipular imágenes como matrices

import base64
# base64: codifica/decodifica datos binarios a texto
# Usado para recibir imágenes desde JavaScript

from django.views.decorators.csrf import csrf_exempt
# csrf_exempt: desactiva protección CSRF
# ⚠️ Solo para desarrollo, no usar en producción

from django.http import JsonResponse
# JsonResponse: retorna respuestas JSON al cliente
# Automáticamente serializa diccionarios Python

import json
# json: maneja datos en formato JSON
# Usado para parsear el body del request

import cv2
# OpenCV: biblioteca de procesamiento de imágenes
# Usada para leer, escribir y manipular imágenes

from billete.utils import Tools
# Tools: clase personalizada con modelos YOLO
# Contiene métodos scan(), scan_coin(), scan_state()

import os
# os: operaciones del sistema operativo
# Usado para manejar rutas de archivos

from django.conf import settings
# settings: configuración de Django
# Acceso a BASE_DIR, DEBUG, etc.
________________________________________
Vista: inicio()
python
def inicio(request):
    """Vista para la página de inicio"""
    # Función que maneja la ruta principal '/'
    # request: objeto HttpRequest con datos de la petición
    
    return render(request, 'billete/inicio.html')
    # render() busca el template en:
    # billete/templates/billete/inicio.html
    # Retorna HttpResponse con HTML renderizado
Flujo:
1.	Usuario accede a http://localhost:8000/
2.	Django enruta a esta función
3.	Renderiza inicio.html
4.	Retorna HTML al navegador
________________________________________
Vista: procesar_imagen()
python
@csrf_exempt
# Decorador que desactiva verificación CSRF
# Necesario porque recibimos datos desde JavaScript
# ⚠️ En producción, implementar CSRF correctamente

def procesar_imagen(request):
    # Función para procesar billetes
    
    if request.method == 'POST':
        # Verificar que sea una petición POST
        # GET no contendría datos de imagen
        
        data = json.loads(request.body)
        # request.body: bytes del cuerpo del request
        # json.loads(): convierte JSON string a diccionario Python
        # data = {'image': 'data:image/jpeg;base64,/9j/4AAQ...'}
        
        img_data = data['image'].split(',')[1]
        # data['image']: "data:image/jpeg;base64,XXXXXXX"
        # .split(',')[1]: obtiene solo "XXXXXXX" (datos Base64)
        # [0] sería "data:image/jpeg;base64"
        
        img_bytes = base64.b64decode(img_data)
        # Decodifica Base64 string a bytes
        # img_bytes: secuencia de bytes de la imagen JPEG
        
        nparr = np.frombuffer(img_bytes, np.uint8)
        # np.frombuffer(): crea array numpy desde bytes
        # np.uint8: tipo de dato (entero sin signo 8 bits)
        # nparr: array 1D con valores 0-255
        
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        # cv2.imdecode(): decodifica bytes a imagen
        # cv2.IMREAD_COLOR: cargar como imagen color (BGR)
        # img: array numpy 3D [altura, ancho, canales]
        # Ejemplo: (1080, 1920, 3)
        
        
        # Construir rutas para guardar imágenes
        static_img_dir = os.path.join(
            settings.BASE_DIR,           # /ruta/al/proyecto/DBM
            'billete',                   # /ruta/al/proyecto/DBM/billete
            'static',                    # /ruta/al/proyecto/DBM/billete/static
            'img'                        # /ruta/al/proyecto/DBM/billete/static/img
        )
        # os.path.join(): une rutas de forma segura
        # independiente del sistema operativo (/ vs \)
        
        if not os.path.exists(static_img_dir):
            # Verificar si el directorio existe
            os.makedirs(static_img_dir)
            # Crear directorio y todos los padres necesarios
        
        img_path = os.path.join(static_img_dir, 'img.jpeg')
        # Ruta completa: .../billete/static/img/img.jpeg
        # Archivo temporal de entrada
        
        output_path = os.path.join(static_img_dir, 'output.jpg')
        # Ruta completa: .../billete/static/img/output.jpg
        # Archivo de salida con anotaciones YOLO
        
        cv2.imwrite(img_path, img)
        # Guardar imagen en disco
        # img_path: ruta donde guardar
        # img: array numpy de la imagen
        
        think = Tools()
        # Instanciar clase Tools
        # Carga los 3 modelos YOLO en memoria
        # ⚠️ Esto puede ser lento, considerar singleton
        
        think.scan(img_path, output_path)
        # Ejecutar detección de billetes
        # img_path: imagen de entrada
        # output_path: donde guardar resultado
        # El modelo YOLO procesa y guarda imagen con boxes
        
        img_url = "static/img/output.jpg"
        # URL relativa para el frontend
        # Accesible desde: http://localhost:8000/static/img/output.jpg
        
        resultado = "Imagen procesada y señalada"
        # Mensaje para mostrar al usuario
        
        return JsonResponse({
            'resultado': resultado,
            'img_url': img_url
        })
        # Retorna JSON al frontend:
        # {
        #   "resultado": "Imagen procesada y señalada",
        #   "img_url": "static/img/output.jpg"
        # }
        
    return JsonResponse({'error': 'Método no permitido'}, status=405)
    # Si no es POST, retornar error 405
    # status=405: Method Not Allowed
Flujo Completo:
1. JavaScript envía POST con imagen Base64
2. Django recibe y parsea JSON
3. Extrae datos Base64
4. Decodifica a bytes
5. Convierte a array numpy
6. Decodifica a imagen OpenCV
7. Guarda en disco
8. Ejecuta modelo YOLO
9. YOLO guarda resultado
10. Retorna JSON con URL
________________________________________
Vista: procesar_moneda()
python
@csrf_exempt
def procesar_moneda(request):
    """Procesar monedas - detección y conteo"""
    # Similar a procesar_imagen pero usa scan_coin()
    
    if request.method == 'POST':
        try:
            # try-except para capturar errores
            
            data = json.loads(request.body)
            img_data = data['image'].split(',')[1]
            img_bytes = base64.b64decode(img_data)
            nparr = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            # ↑ Mismo proceso de decodificación
            
            static_img_dir = os.path.join(
                settings.BASE_DIR, 
                'billete', 
                'static', 
                'img'
            )
            if not os.path.exists(static_img_dir):
                os.makedirs(static_img_dir)
            # ↑ Mismo manejo de directorios
            
            img_path = os.path.join(static_img_dir, 'img_moneda.jpeg')
            # Nombre diferente para no sobrescribir billetes
            
            output_path = os.path.join(static_img_dir, 'coin_result.jpg')
            # Resultado específico para monedas
            
            cv2.imwrite(img_path, img)
            
            think = Tools()
            think.scan_coin(img_path, output_path)
            # ⚠️ NOTA: El método original espera img_path pero
            # en el código dice think.scan_coin(img, output_path)
            # Debería ser img_path para consistencia
            
            img_url = "static/img/coin_result.jpg"
            resultado = "✓ Monedas identificadas y contadas"
            
            return JsonResponse({
                'resultado': resultado, 
                'img_url': img_url
            })
            
        except Exception as e:
            # Capturar cualquier error
            # e: objeto de la excepción
            
            return JsonResponse({
                'error': str(e)
            }, status=500)
            # str(e): convierte excepción a string
            # status=500: Internal Server Error
    
    return JsonResponse({'error': 'Método no permitido'}, status=405)
Diferencias con procesar_imagen:
●	Nombres de archivo diferentes (img_moneda.jpeg, coin_result.jpg)
●	Usa scan_coin() en lugar de scan()
●	Manejo de errores con try-except
________________________________________
Vista: procesar_estado()
python
@csrf_exempt
def procesar_estado(request):
    """Procesar estado del billete - análisis de deterioro"""
    
    if request.method == 'POST':
        try:
            # Mismo proceso de decodificación...
            data = json.loads(request.body)
            img_data = data['image'].split(',')[1]
            img_bytes = base64.b64decode(img_data)
            nparr = np.frombuffer(img_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            # Directorios...
            static_img_dir = os.path.join(
                settings.BASE_DIR, 
                'billete', 
                'static', 
                'img'
            )
            if not os.path.exists(static_img_dir):
                os.makedirs(static_img_dir)
            
            img_path = os.path.join(static_img_dir, 'img_estado.jpeg')
            # Archivo específico para estado
            
            output_path = os.path.join(static_img_dir, 'estado_result.jpg')
            # Resultado específico para estado
            
            cv2.imwrite(img_path, img)
            
            think = Tools()
            think.scan_state(img_path, output_path)
            # Usa modelo especializado en estado (model2)
            
            img_url = "static/img/estado_result.jpg"
            resultado = "✓ Estado del billete analizado"
            
            return JsonResponse({
                'resultado': resultado, 
                'img_url': img_url
            })
            
        except Exception as e:
            return JsonResponse({
                'error': str(e)
            }, status=500)
    
    return JsonResponse({'error': 'Método no permitido'}, status=405)
________________________________________
Vistas Simples
python
def detectar_billetes(request):
    """Vista para detectar billetes"""
    return render(request, 'billete/billetes.html')
    # Renderiza la página del detector de billetes

def detectar_monedas(request):
    """Vista para detectar monedas"""
    return render(request, 'billete/monedas.html')
    # Renderiza la página del detector de monedas

def estado(request):
    """Vista para la página de estado"""
    return render(request, 'billete/estado.html')
    # Renderiza la página del analizador de estado
Propósito: Solo renderizar HTML, sin lógica adicional.
________________________________________
📄 2. utils.py - Procesamiento de IA {#utils}
Importaciones y Configuración
python
from ultralytics import YOLO
# YOLO: clase principal de Ultralytics
# Permite cargar y usar modelos YOLO entrenados

import cv2
# OpenCV para procesamiento de imágenes

import numpy as np
# NumPy para operaciones matriciales

import os
# Operaciones de sistema de archivos

from django.conf import settings
# Acceso a configuración de Django
________________________________________
Diccionario de Monedas
python
MONEDAS_ECUADOR = {
    "1ctv": 17.00,      # Diámetro en milímetros
    "5ctvs": 19.05,
    "10ctvs": 21.21,
    "25ctvs": 24.26,
    "50ctvs": 26.50
}
# Tabla de referencia para clasificar monedas
# Clave: denominación
# Valor: diámetro en mm
________________________________________
Clase Tools
python
class Tools:
    # Clase para procesamiento de IA
    
    # Atributos de clase (compartidos por todas las instancias)
    model_path = os.path.join(
        settings.BASE_DIR,      # /ruta/proyecto/DBM
        'billete',              # /ruta/proyecto/DBM/billete
        'dataset',              # /ruta/proyecto/DBM/billete/dataset
        'best.pt'               # /ruta/proyecto/DBM/billete/dataset/best.pt
    )
    # Ruta al modelo de billetes
    
    model_path2 = os.path.join(
        settings.BASE_DIR, 
        'billete', 
        'dataset', 
        'moneda.pt'
    )
    # Ruta al modelo de monedas
    
    model_path3 = os.path.join(
        settings.BASE_DIR, 
        'billete', 
        'dataset', 
        'estado.pt'
    )
    # Ruta al modelo de estado
________________________________________
Constructor init
python
    def __init__(self, model_path=model_path, model_path3=model_path3, model_path2=model_path2):
        # Constructor de la clase
        # Se ejecuta al crear instancia: think = Tools()
        
        # Parámetros con valores por defecto
        # Si no se pasan, usa los atributos de clase
        
        self.model = YOLO(model_path)
        # Cargar modelo de billetes
        # YOLO(ruta): carga pesos del modelo entrenado
        # ⚠️ Esto puede tardar ~2-3 segundos
        # ⚠️ Consume ~500MB de RAM
        
        self.model2 = YOLO(model_path3)
        # Cargar modelo de estado
        # Usa model_path3 (estado.pt)
        # ⚠️ Nota: confusión en nombres de variables
        
        self.model3 = YOLO(model_path2)
        # Cargar modelo de monedas
        # Usa model_path2 (moneda.pt)
Nota sobre Optimización:
python
# ⚠️ Problema: Cada vez que procesamos una imagen,
# se crea una nueva instancia de Tools()
# Esto recarga los modelos CADA VEZ (lento!)

# ✅ Solución (implementar en el futuro):
# Usar patrón Singleton o cargar modelos una vez
# al iniciar Django
________________________________________
Método scan() - Detección de Billetes
python
    def scan(self, img_path, output_path):
        # Detectar billetes en imagen
        
        # Parámetros:
        # img_path: ruta de entrada (ej: "static/img/img.jpeg")
        # output_path: ruta de salida (ej: "static/img/output.jpg")
        
        result = self.model(img_path)
        # Ejecutar modelo YOLO
        # self.model: instancia YOLO cargada
        # img_path: imagen a procesar
        # result: lista de resultados (usualmente 1 elemento)
        
        # result[0] contiene:
        # - boxes: coordenadas de detecciones
        # - conf: confianza de cada detección
        # - cls: clase de cada detección
        # - names: diccionario de nombres de clases
        
        result[0].save(filename=output_path)
        # Guardar imagen con anotaciones
        # - Dibuja bounding boxes
        # - Agrega etiquetas de clase
        # - Muestra porcentaje de confianza
        
        return result
        # Retornar resultado (opcional)
        # No se usa actualmente en views.py
Ejemplo Visual:
Entrada: imagen de billete
         ┌────────────────┐
         │                │
         │   [BILLETE]    │
         │                │
         └────────────────┘

Salida: imagen con anotaciones
         ┌────────────────┐
         │ ┏━━━━━━━━━━━┓  │
         │ ┃ Auténtico ┃  │ ← Bounding box
         │ ┃   95.3%   ┃  │ ← Confianza
         │ ┗━━━━━━━━━━━┛  │
         └────────────────┘
________________________________________
Método scan_state() - Análisis de Estado
python
    def scan_state(self, img_path, output_path):
        # Analizar estado de conservación
        
        result = self.model2(img_path)
        # Usar modelo especializado (model2 = estado.pt)
        # Detecta:
        # - Rasgaduras
        # - Manchas
        # - Decoloración
        # - Nivel de deterioro
        
        result[0].save(filename=output_path)
        # Guardar con anotaciones visuales
        
        return result
________________________________________
Método scan_coin() - Detección de Monedas
Este es el método más complejo, lo veremos paso a paso:
python
    def scan_coin(self, img_path, output_path):
        # Detectar y clasificar monedas
        
        # PASO 1: Cargar imagen
        img = cv2.imread(img_path)
        # cv2.imread: lee imagen desde disco
        # img: array numpy [altura, ancho, 3]
        # 3 canales: BGR (no RGB!)
        
        # PASO 2: Ejecutar YOLO (opcional, no usado actualmente)
        result = self.model3(img_path)
        # Ejecuta detección YOLO
        # Podría usarse para pre-filtrar monedas
        
        # PASO 3: Preprocesamiento
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        # Convertir a escala de grises
        # BGR (3 canales) → GRAY (1 canal)
        # Reduce complejidad, facilita detección de bordes
        # gray: array [altura, ancho]
        
        blur = cv2.GaussianBlur(gray, (7, 7), 0)
        # Aplicar filtro Gaussiano
        # (7, 7): tamaño del kernel (debe ser impar)
        # 0: desviación estándar (auto-calculada)
        # Propósito: suavizar ruido, mejorar detección
        
        thresh = cv2.adaptiveThreshold(
            blur,                              # Imagen de entrada
            255,                               # Valor máximo
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,    # Método adaptativo
            cv2.THRESH_BINARY_INV,             # Tipo de umbralización
            11,                                # Tamaño de bloque
            2                                  # Constante C
        )
        # Umbralización adaptativa
        # Convierte imagen a blanco y negro
        # Adaptativo: calcula umbral localmente
        # BINARY_INV: invierte (monedas blancas, fondo negro)
        # 11: tamaño del vecindario para calcular umbral
        # 2: constante restada del umbral
        # thresh: imagen binaria [altura, ancho]
        
        kernel = np.ones((3, 3), np.uint8)
        # Crear kernel para morfología
        # (3, 3): matriz 3x3 de unos
        # ┌───────┐
        # │ 1 1 1 │
        # │ 1 1 1 │
        # │ 1 1 1 │
        # └───────┘
        
        thresh = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)
        # Operación morfológica: Opening
        # Opening = Erosión seguida de Dilatación
        # Propósito: eliminar ruido pequeño
        # - Erosión: reduce píxeles blancos
        # - Dilatación: expande píxeles blancos
        # Efecto neto: mantiene formas grandes, elimina pequeñas
        
        # PASO 4: Detectar contornos
        contours, _ = cv2.findContours(
            thresh,                    # Imagen binaria
            cv2.RETR_EXTERNAL,         # Solo contornos externos
            cv2.CHAIN_APPROX_SIMPLE    # Simplificar contornos
        )
        # findContours: encuentra bordes de objetos blancos
        # contours: lista de arrays numpy
        # Cada contorno: array de puntos (x, y)
        # _: jerarquía (no usada)
        
        # PASO 5: Filtrar y clasificar contornos
        monedas_detectadas = []
        # Lista para almacenar monedas válidas
        
        for contour in contours:
            # Iterar sobre cada contorno
            
            area = cv2.contourArea(contour)
            # Calcular área del contorno en píxeles²
            # área = ∫∫ dA (integral de superficie)
            
            if area < 500:
                # Filtro 1: área mínima
                # 500 píxeles² ≈ 22x22 píxeles
                # Descarta ruido y objetos pequeños
                continue  # Saltar a siguiente contorno
            
            perimeter = cv2.arcLength(contour, True)
            # Calcular perímetro del contorno
            # True: contorno cerrado
            # perimeter: longitud del borde en píxeles
            
            if perimeter == 0:
                # Evitar división por cero
                continue
            
            circularity = 4 * np.pi * area / (perimeter * perimeter)
            # Calcular circularidad
            # Fórmula: 4π·A / P²
            # Círculo perfecto = 1.0
            # Cuadrado ≈ 0.785
            # Menor valor = menos circular
            
            if circularity > 0.8:
                # Filtro 2: circularidad mínima
                # 0.8: umbral empírico (80% circular)
                # Solo aceptar formas circulares
                
                (x, y), radius = cv2.minEnclosingCircle(contour)
                # Calcular círculo mínimo que encierra el contorno
                # (x, y): centro del círculo (float)
                # radius: radio del círculo (float)
                
                monedas_detectadas.append({
                    'centro': (int(x), int(y)),
                    'radio': int(radius),
                    'contorno': contour
                })
                # Guardar información de la moneda
                # int(): convertir a entero para dibujar
        
        # PASO 6: Clasificar y anotar monedas
        for moneda in monedas_detectadas:
            # Iterar sobre monedas válidas
            
            diametro_px = moneda['radio'] * 2
            # Calcular diámetro en píxeles
            # diámetro = 2 × radio
            
            diametro_mm_aprox = diametro_px / 5.2
            # Convertir píxeles a milímetros
            # 5.2: factor de escala (píxeles por mm)
            # ⚠️ Este valor es empírico y puede variar
            # Depende de:
            # - Distancia cámara-objeto
            # - Resolución de cámara
            # - Zoom utilizado
            
            denominacion = min(
                MONEDAS_ECUADOR.items(),
                key=lambda x: abs(x[1] - diametro_mm_aprox)
            )[0]
            # Clasificar moneda por diámetro
            # MONEDAS_ECUADOR.items(): [("1ctv", 17.00), ...]
            # key=lambda: función de comparación
            # abs(x[1] - diametro_mm_aprox): diferencia absoluta
            # min(...): encuentra moneda más cercana
            # [0]: obtener solo la denominación (ej: "25ctvs")
            
            # PASO 7: Dibujar anotaciones
            cv2.drawContours(
                img,                    # Imagen destino
                [moneda['contorno']],   # Lista de contornos a dibujar
                -1,                     # Índice (-1 = todos)
                (0, 255, 0),            # Color BGR (verde)
                2                       # Grosor en píxeles
            )
            # Dibujar contorno verde alrededor de moneda
            
            cv2.circle(
                img,                    # Imagen destino
                moneda['centro'],       # Centro (x, y)
                3,                      # Radio
                (0, 0, 255),            # Color BGR (rojo)
                -1                      # Grosor (-1 = relleno)
            )
            # Dibujar punto rojo en centro
            
            cv2.putText(
                img,                                    # Imagen destino
                denominacion,                           # Texto
                (moneda['centro'][0] - 20,              # X (desplazado)
                 moneda['centro'][1] - 20),             # Y (desplazado)
                cv2.FONT_HERSHEY_SIMPLEX,               # Fuente
                0.6,                                    # Escala
                (0, 255, 0),                            # Color (verde)
                2                                       # Grosor
            )
            # Escribir denominación arriba de la moneda
        
        # PASO 8: Guardar resultado
        cv2.imwrite(output_path, img)
        # Guardar imagen con todas las anotaciones
        
        return result
        # Retornar resultado YOLO (opcional)
Ejemplo Visual del Proceso:
Original        Gris            Umbralizado     Morfología      Resultado
┌──────┐       ┌──────┐       ┌──────┐       ┌──────┐       ┌──────┐
│ 🪙🪙 │  →    │ ⚫⚫ │  →    │ ⚪⚪ │  →    │ ⚪⚪ │  →    │ 🟢25¢│
│      │       │      │       │      │       │      │       │ 🟢10¢│
│  🪙  │       │  ⚫  │       │  ⚪  │       │  ⚪  │       └──────┘
└──────┘       └──────┘       └──────┘       └──────┘
________________________________________
📄 3. camara.js - Control de Cámara {#camara}
Variables Globales
javascript
let stream = null;
// Variable para guardar el stream de video
// null inicialmente, luego objeto MediaStream
// Usado para detener la cámara más tarde

let isProcessing = false;
// Flag para prevenir múltiples procesamiento simultáneos
// false: disponible para procesar
// true: ya está procesando una imagen
________________________________________
Función waitForTranslations()
javascript
function waitForTranslations() {
    // Esperar a que el sistema de traducciones esté listo
    
    return new Promise((resolve) => {
        // Crear y retornar una Promesa
        // resolve: función para completar la promesa
        
        if (window.getTranslation) {
            // Verificar si ya está disponible
            // window.getTranslation: función global
            resolve();
            // Completar inmediatamente
        } else {
            // No está disponible todavía
            const checkInterval = setInterval(() => {
                // setInterval: ejecutar función cada X ms
                // checkInterval: ID del intervalo
                
                if (window.getTranslation) {
                    // Verificar nuevamente
                    clearInterval(checkInterval);
                    // Detener el intervalo
                    resolve();
                    // Completar la promesa
                }
            }, 50);
            // Verificar cada 50 milisegundos
        }
    });
}

// Uso:
// await waitForTranslations();
// Código aquí se ejecuta solo cuando getTranslation existe
________________________________________
Funciones de Detección de Tipo
javascript
function getDetectorType() {
    // Detectar qué tipo de detector estamos usando
    // Basado en la URL actual
    
    const path = window.location.pathname;
    // window.location.pathname: ruta de la URL
    // Ejemplo: "/billetes/" o "/monedas/"
    
    if (path.includes('/billetes/')) {
        return '

