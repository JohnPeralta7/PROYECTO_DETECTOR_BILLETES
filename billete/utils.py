from ultralytics import YOLO
import cv2
import numpy as np
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
        

    def order_points(self, points):
        n_points = np.concatenate([points[0], points[1], points[2], points[3]]).tolist()
        y_order = sorted(n_points, key=lambda n_points: n_points[1])
        x1_order = y_order[:2]
        x1_order = sorted(x1_order, key=lambda  x1_order: x1_order[0])
        x2_order = y_order[2:4]
        x2_order = sorted(x2_order, key=lambda x2_order: x2_order[0])

        return [x1_order[0], x1_order[1], x2_order[0], x2_order[1]]
    

    def roi(self, image, wide, height):
        img_align = None
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _,th = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
        cv2.imshow('th', th)
        cnts = cv2.findContours(th, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[0]
        cnts = sorted(cnts, key=cv2.contourArea, reverse=True)[:1]

        for c in cnts:
            epsilon = 0.01*cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, epsilon, True)

            if len(approx) == 4:
                points = self.order_points(approx)
                pts1 = np.float32(points)
                pts2 = np.float32([[0,0], [wide, 0], [0,height], [wide, height]])
                M = cv2.getPerspectiveTransform(pts1, pts2)
                img_align = cv2.warpPerspective(image, M, (wide, height))
        
        return img_align


    def scan_coin(self, img, out_img):
        img_a6 = self.roi(img, wide=480, height=640)
        
        if img_a6 is not None:
            points = []
            img_gray = cv2.cvtColor(img_a6, cv2.COLOR_BGR2GRAY)
            blur = cv2.GaussianBlur(img_gray, (5, 5), 1)
            _, th_2 = cv2.threshold(blur, 0, 255, cv2.THRESH_OTSU+cv2.THRESH_BINARY_INV)
            cv2.imshow('th_monedas', th_2)
            cnts_2 =  cv2.findContours(th_2, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[0]
            cv2.drawContours(img_a6, cnts_2, -1, (255, 0, 0), 2)

        suma = 0.0
        suma2 = 0.0
        suma3 = 0.0
        suma4 = 0.0
        suma5 = 0.0
        suma6 = 0.0

        for c_2 in cnts_2:
            area = cv2.contourArea(c_2)
            Momentos = cv2.moments(c_2)

            if (Momentos["m00"] == 0):
                Momentos['m00'] = 1.0
            
            x = int(Momentos['m10']/Momentos['m00'])
            y = int(Momentos['m01']/Momentos['m00'])


            if area < 15550 and area > 13500:
                font = cv2.FONT_HERSHEY_COMPLEX
                cv2.putText(img_a6, '50 ctvs', (x,y), font, 0.75, (0, 255, 0), 2)
                suma = suma + 0.5
            elif area < 12600 and area > 9620:
                font = cv2.FONT_HERSHEY_SIMPLEX
                cv2.putText(img_a6, '1$', (x, y), font, 0.75, (0, 255, 0), 2)

                suma2 = suma2 + 1.0
            elif area < 9590 and area > 8000:
                font = cv2.FONT_HERSHEY_SIMPLEX
                cv2.putText(img_a6, '25 ctvs', (x, y), font, 0.75, (0, 255, 0), 2) 
                suma3 = suma3 + 0.25
            elif area < 7800 and area > 6400:
                font = cv2.FONT_HERSHEY_SIMPLEX
                cv2.putText(img_a6, '5 ctvs', (x, y), font, 0.75, (0, 255, 0), 2)
                suma4 = suma4 + 0.05
            elif area < 6200 and area > 5500:
                font = cv2.FONT_HERSHEY_SIMPLEX
                cv2.putText(img_a6, '1 ctvs', (x, y), font, 0.75, (0, 255, 0), 2)
                suma5 = suma5 + 0.01
            elif area < 5400 and area > 4800:
                font = cv2.FONT_HERSHEY_SIMPLEX
                cv2.putText(img_a6, '10 ctvs', (x, y), font, 0.75, (0, 255, 0), 2)
                suma6 = suma6 + 0.10
            
        
        result = cv2.imwrite(out_img, img_a6)
        #TENGO QUE PROBAR SI NO HAY ERROR ESTE APARTADO




