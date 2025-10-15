from ultralytics import YOLO


class Scanner:
    def __init__(self, model_path = "dataset/best.pt"):
        self.model = YOLO(model_path)

    def scan_billete(self, image_path):
        ...
    
    def scan_coin(self, image_path):
        ...
    
