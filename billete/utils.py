from ultralytics import YOLO
import cv2
import numpy as np
import os
from django.conf import settings

class Tools:
    model_path = os.path.join(settings.BASE_DIR, 'billete', 'dataset', 'best.pt')
    model_path2 = os.path.join(settings.BASE_DIR, 'billete', 'dataset', 'moneda.pt')
    model_path3 = os.path.join(settings.BASE_DIR, 'billete', 'dataset', 'estado.pt')
    def __init__(self, model_path=model_path, model_path3=model_path3, model_path2=model_path2):
        self.model = YOLO(model_path)
        self.model2 = YOLO(model_path3)
        self.model3 = YOLO(model_path2)


    def scan(self, img_path, output_path):
        result = self.model(img_path)
        result[0].save(filename=output_path)  # Guarda la imagen con los boxes
        return result
        

    def scan_state(self, img_path, output_path):
        # Aquí podrías implementar un análisis específico para el estado del billete
        result = self.model2(img_path)
        result[0].save(filename=output_path)  # Guarda la imagen con los boxes
        return result
    
    def scan_coin(self, img_path, output_path):
        # Aquí podrías implementar un análisis específico para el estado del billete
        result = self.model3(img_path)
        result[0].save(filename=output_path)  # Guarda la imagen con los boxes
        return result




