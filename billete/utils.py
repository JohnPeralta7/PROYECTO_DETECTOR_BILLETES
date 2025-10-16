from ultralytics import YOLO


class Tools:
    def __init__(self, model_path = "/Users/johnperaltarojas/Desktop/PROYECTO_DBM/billete/dataset/best.pt"):
        self.model = YOLO(model_path)

    def scan_billete(self, img_path, output_path):
        result = self.model(img_path)
        result[0].save(filename=output_path)  # Guarda la imagen con los boxes
        return result
        
    
    def scan_coin(self, image_path):
        ...
    
