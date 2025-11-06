from ultralytics import YOLO
import cv2
import numpy as np
import os
from django.conf import settings

# --- Diccionario de diámetros aproximados de monedas de Ecuador (en mm) ---
MONEDAS_ECUADOR = {
    "1ctv": 17.00,
    "5ctvs": 19.05,
    "10ctvs": 21.21,
    "25ctvs": 24.26,
    "50ctvs": 26.50
}

# --- CLASE PRINCIPAL ---
class Tools:
    model_path = os.path.join(settings.BASE_DIR, 'billete', 'dataset', 'best.pt')
    model_path2 = os.path.join(settings.BASE_DIR, 'billete', 'dataset', 'moneda.pt')
    model_path3 = os.path.join(settings.BASE_DIR, 'billete', 'dataset', 'estado.pt')

    static_img_dir = os.path.join(settings.BASE_DIR, 'billete', 'static', 'img')

    def __init__(self, model_path=model_path, model_path3=model_path3, model_path2=model_path2):
        self.model = YOLO(model_path)
        self.model2 = YOLO(model_path3)
        self.model3 = YOLO(model_path2)

    # --- DETECCIÓN DE BILLETES ---
    def scan(self, img_path, output_path, static_img_dir = static_img_dir):
        transformation = self.equalization(img_path, output_path)
        result = self.model(transformation)
        result[0].save(filename=output_path)

        res = result[0]
        img = cv2.imread(output_path)



        for i, box in enumerate(res.boxes):
            # Coordenadas del bounding box
            x1, y1, x2, y2 = map(int, box.xyxy[0])

            # Clase y confianza
            cls = int(box.cls[0])
            conf = float(box.conf[0])
            label = self.model.names[cls]

            print(f"Detección: {label} ({conf:.2f}) -> [{x1}, {y1}, {x2}, {y2}]")

            # 🔹 Solo recortar si la clase es billete_frontal
            if label == "billete_frontal":
                recorte = img[y1:y2, x1:x2]
                nombre_archivo = f"recorte_{label}_{i}.jpg"
                cv2.imwrite(os.path.join(static_img_dir, nombre_archivo), recorte)
                print(f" Recorte guardado: {nombre_archivo}")

                #-----------------------------------

                #teniendo la img cortada recientemente
                imgcut = cv2.imread(os.path.join(static_img_dir, nombre_archivo))

                #consiguiendo las dimensiones
                h, w, _ = imgcut.shape

                # zona de recorte con porcentajes
                x_inicio = 0
                x_fin = int(w * 0.45)      # 45% del ancho
                y_inicio = 0
                y_fin = int(h * 0.45)      # 45% de la altura

                #este recorte se hara dentro del if, para validar que sea el frontal del $ donde esta el cod

                esquina_izq = imgcut[y_inicio:y_fin, x_inicio:x_fin]


                cv2.imwrite(os.path.join(static_img_dir, "recorte_final.jpg"), esquina_izq)

                print("si funciona papu")






            else:
                print("Detección ignorada (no es billete_frontal)")


        return result
    

    # segunda validacion - aplicando ocr
    def read_img(self):
        ...








    # Aplicacion de adaptive equalization - ajuste
    def equalization(self, img_path, output_path):
    
        # Cargar imagen en color (BGR)
        img = cv2.imread(img_path)

        # Convertir a espacio de color LAB
        lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

        # Separar canales
        l, a, b = cv2.split(lab)

        # Crear el objeto CLAHE (igual al adaptive equalization de Roboflow)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))

        # Aplicar sobre el canal L (luminancia)
        cl = clahe.apply(l)

        # Volver a combinar canales
        merged = cv2.merge((cl, a, b))

        # Convertir de nuevo a BGR
        final_img = cv2.cvtColor(merged, cv2.COLOR_LAB2BGR)
        #final_img.save(filename = output_path) esta linea daba error

        return final_img


    # --- ANÁLISIS DEL ESTADO DEL BILLETE ---
    def scan_state(self, img_path, output_path):
        result = self.model2(img_path)
        result[0].save(filename=output_path)
        return result

    # --- DETECCIÓN DE MONEDAS ---
    def scan_coin(self, img_path, output_path):
        img = cv2.imread(img_path)
        result = self.model3(img_path)

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (7, 7), 0)
        thresh = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                       cv2.THRESH_BINARY_INV, 11, 2)
        kernel = np.ones((3, 3), np.uint8)
        thresh = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)

        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        monedas_detectadas = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area < 500:  # menor área mínima
                continue
            perimeter = cv2.arcLength(contour, True)
            if perimeter == 0:
                continue
            circularity = 4 * np.pi * area / (perimeter * perimeter)
            if circularity > 0.8:
                (x, y), radius = cv2.minEnclosingCircle(contour)
                monedas_detectadas.append({'centro': (int(x), int(y)), 'radio': int(radius), 'contorno': contour})

        for moneda in monedas_detectadas:
            diametro_px = moneda['radio'] * 2
            diametro_mm_aprox = diametro_px / 5.2  # Ajusta este divisor según tus pruebas
            denominacion = min(MONEDAS_ECUADOR.items(), key=lambda x: abs(x[1] - diametro_mm_aprox))[0]
            cv2.drawContours(img, [moneda['contorno']], -1, (0, 255, 0), 2)
            cv2.circle(img, moneda['centro'], 3, (0, 0, 255), -1)
            cv2.putText(img, denominacion,
                        (moneda['centro'][0] - 20, moneda['centro'][1] - 20),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

        cv2.imwrite(output_path, img)
        return result
    