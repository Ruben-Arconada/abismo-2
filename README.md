# 🎳 ABISMO 2.0 — el remake en 3D real

La **bola de bolos aventurera** vuelve en 2026. Mismo juego que la gente recuerda y ama —rueda por plataformas flotantes sobre un abismo sin fin, salta los huecos y llega lo más lejos que puedas— pero reconstruido desde cero en **3D real (WebGL / Three.js)**: luces y sombras dinámicas, materiales PBR con reflejos, niebla volumétrica por bioma, partículas (nieve, brasas, polvo) y *bloom* cinematográfico.

La jugabilidad es **idéntica** al ABISMO original: mismas físicas, mismo salto variable con *coyote time*, misma generación de tramos y los mismos 6 biomas que se funden entre sí (ciudad → pradera → montañas → montaña nevada → cueva → volcánica).

## ▶️ Jugar

**https://ruben-arconada.github.io/abismo-2/**

## 🎮 Controles

- **Diestro** (por defecto): mitad izquierda = *joystick*, mitad derecha = saltar. **Mantén pulsado = salto más largo.**
- **Zurdo**: lados invertidos.
- **Deslizar + tocar**: desliza para moverte, toca para saltar.
- En ordenador: **flechas** para moverte y **espacio / ↑** para saltar.
- Botón 🔊 para silenciar · ⚙️ para cambiar de control en cualquier momento.

## 📲 Instalar en el móvil

- **iPhone (Safari):** botón *Compartir* → **Añadir a pantalla de inicio**.
- **Android (Chrome):** menú ⋮ → **Instalar aplicación**.

## ✨ Qué hay de nuevo en la 2.0

- **3D real**: geometría, cámara en perspectiva y profundidad de verdad (Three.js + WebGL).
- **Iluminación dinámica** por bioma: sol, atardecer, luna, cristales de cueva y resplandor volcánico, con **sombras suaves reales** (PCF).
- **Materiales PBR**: la bola es de mármol morado con laca (*clearcoat*) y refleja el entorno; cada bioma tiene su propio material de suelo (asfalto con líneas, tierra, roca, nieve, cueva, basalto con vetas de lava).
- **Efectos**: *bloom* HDR con tono ACES, partículas de nieve y brasas, polvo al aterrizar, grietas 3D y temblor de cámara en el choque, murciélagos y estrellas.
- **Props en 3D**: farolas encendidas, árboles y pinos low-poly, cristales emisivos y rocas con magma.
- **Calidad automática**: si el móvil no llega a 40 fps, baja el postprocesado y la resolución para mantener la fluidez.
- Récord guardado en el dispositivo.

## 🛠️ Desarrollo

Es estático: basta con servir la carpeta.

```bash
python3 -m http.server 8123
# abre http://localhost:8123/
```

- `index.html` contiene todo el juego (módulo ES + Three.js desde CDN, cacheado offline por el service worker).
- Modo de pruebas: añade `#test` a la URL para saltar directamente a cada bioma.
- Los iconos se regeneran con `tools/make_icons.py` (requiere Pillow).

## 🕹️ El original

El ABISMO clásico (pseudo-3D, Canvas 2D) sigue disponible en
**https://ruben-arconada.github.io/abismo/**
