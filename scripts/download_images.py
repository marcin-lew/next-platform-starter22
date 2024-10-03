import os
import json
import requests

# Tworzymy katalog public/images, jeśli nie istnieje
if not os.path.exists('public/images'):
    os.makedirs('public/images')

# Ładujemy plik products.json
with open('data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Pobieramy każdy obraz i zapisujemy go w public/images
for product in products:
    image_url = product.get("images 1")
    if image_url:
        response = requests.get(image_url)
        image_name = product.get("name").replace(" ", "_")[:30] + ".jpg"
        with open(f'public/images/{image_name}', 'wb') as img_file:
            img_file.write(response.content)
            print(f"Pobrano: {image_name}")
