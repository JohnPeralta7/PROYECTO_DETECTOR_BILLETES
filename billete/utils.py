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

    def __init__(self, model_path=model_path, model_path3=model_path3, model_path2=model_path2):
        self.model = YOLO(model_path)
        self.model2 = YOLO(model_path3)
        self.model3 = YOLO(model_path2)

    # --- DETECCIÓN DE BILLETES ---
    def scan(self, img_path, output_path):
        result = self.model(img_path)
        result[0].save(filename=output_path)
        return result

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
    