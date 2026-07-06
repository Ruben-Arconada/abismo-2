#!/usr/bin/env python3
from PIL import Image
base = "/Users/clickcom/Documents/abismo"

# --- ICONO: recorte cuadrado centrado en la bola (de la imagen cuadrada 1254x1254) ---
src = Image.open(f"{base}/abismo-icon.png").convert("RGB")
crop = src.crop((200, 275, 1100, 1175))   # 900x900 centrado en la bola + pañuelo
for size, name in [(512, "icon-512.png"), (192, "icon-192.png"), (180, "apple-touch-icon.png")]:
    crop.resize((size, size), Image.LANCZOS).save(f"{base}/{name}", optimize=True)
    print("icono", name)

# --- OG (preview al compartir): cuadrada con la bola, JPEG ligero ---
crop.resize((800, 800), Image.LANCZOS).save(f"{base}/abismo-og.jpg", quality=86, optimize=True)
print("og abismo-og.jpg")

# --- PORTADA (splash de inicio): la vertical optimizada ---
port = Image.open(f"{base}/abismo-vertical.png").convert("RGB")
port.save(f"{base}/abismo-portada.jpg", quality=84, optimize=True, progressive=True)
print("portada abismo-portada.jpg", port.size)
print("OK")
