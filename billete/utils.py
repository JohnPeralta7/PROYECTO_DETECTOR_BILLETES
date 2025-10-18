from ultralytics import YOLO
import os
from django.conf import settings

class Tools:
    model_path = os.path.join(settings.BASE_DIR, 'billete', 'dataset', 'best.pt')
    def __init__(self, model_path=model_path):
        self.model = YOLO(model_path)

    def scan(self, img_path, output_path):
        result = self.model(img_path)
        result[0].save(filename=output_path)  # Guarda la imagen con los boxes
        return result
        
