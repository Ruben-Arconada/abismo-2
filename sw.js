/* ABISMO 2.0 — service worker (offline; network-first para el HTML, cache-first para estáticos y módulos 3D del CDN) */
const CACHE = "abismo2-v2";
const CDN = "https://cdn.jsdelivr.net/npm/three@0.161.0/";
const ASSETS = [
  ".",
  "index.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png",
  "abismo-portada.jpg",
  // three.js + addons con TODAS sus dependencias transitivas (offline desde la primera visita)
  CDN + "build/three.module.js",
  CDN + "examples/jsm/postprocessing/EffectComposer.js",
  CDN + "examples/jsm/postprocessing/RenderPass.js",
  CDN + "examples/jsm/postprocessing/UnrealBloomPass.js",
  CDN + "examples/jsm/postprocessing/OutputPass.js",
  CDN + "examples/jsm/postprocessing/Pass.js",
  CDN + "examples/jsm/postprocessing/ShaderPass.js",
  CDN + "examples/jsm/postprocessing/MaskPass.js",
  CDN + "examples/jsm/shaders/CopyShader.js",
  CDN + "examples/jsm/shaders/LuminosityHighPassShader.js",
  CDN + "examples/jsm/shaders/OutputShader.js",
  CDN + "examples/jsm/environments/RoomEnvironment.js"
];

self.addEventListener("install", e => {
  // allSettled: si un módulo del CDN falla, la instalación no se rompe
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  // El documento va network-first: al desplegar se ve la versión nueva; offline cae a la caché.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put("index.html", copy)).catch(() => {});
        return resp;
      }).catch(() => caches.match("index.html"))
    );
    return;
  }
  // Estáticos (iconos, manifest, módulos three.js del CDN): cache-first.
  // Sin fallback a index.html aquí: devolver HTML a un import de JS enmascara el error real.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
      return resp;
    }).catch(() => Response.error()))
  );
});
