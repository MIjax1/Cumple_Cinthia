# Para Cinthia 💗 — cumpleaños 20

Sitio estático preparado para GitHub Pages. No necesita framework, servidor, base de datos ni instalación de paquetes.

## 1. Lo único que falta: la canción

El proyecto ya está configurado para buscar:

```text
assets/audio/amor.mp3
```

Debes colocar allí una copia del audio que tengas derecho a usar. El proyecto **no incluye la canción**.

Canción seleccionada: **“Amor” — Emmanuel Cortes (2023)**.

### Sobre el autoplay

`index.html` intenta reproducir la música al cargar. Sin embargo, Chrome, Safari, navegadores de WhatsApp y otros navegadores móviles suelen bloquear audio con sonido antes de una interacción del usuario.

Por eso la portada dice **“Entrar a tu sorpresa”**. En el momento en que Cinthia toca ese botón, la página inicia la música inmediatamente. Es la forma más confiable de conseguir una experiencia tipo autoplay en celular.

## 2. Estructura

```text
/
├─ index.html
├─ styles.css
├─ app.js
├─ manifest.webmanifest
├─ sw.js
├─ .nojekyll
└─ assets/
   ├─ audio/
   │  ├─ amor.mp3              <-- AÑADIR TÚ
   │  └─ COLOCA_AQUI_LA_CANCION.txt
   ├─ gif/
   │  ├─ heart-pulse.gif
   │  └─ sparkles.gif
   ├─ icons/
   │  ├─ favicon.svg
   │  ├─ icon-192.png
   │  └─ icon-512.png
   └─ images/
      ├─ cinthia-card.png
      └─ cinthia-card.webp
```

## 3. Probar en tu PC

Puedes abrir `index.html` directamente, pero para probar correctamente el Service Worker conviene levantar un servidor local.

Si tienes Python:

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## 4. Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub, por ejemplo `para-cinthia`.
2. Sube **todo el contenido de esta carpeta a la raíz del repositorio**.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment / Source**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`.
6. Guarda.
7. GitHub mostrará la URL de tu sitio. Normalmente tendrá una forma parecida a:

```text
https://TU-USUARIO.github.io/para-cinthia/
```

8. Abre la URL desde tu celular y verifica audio, animaciones y botones antes de enviarla.

## 5. Enviar por WhatsApp

Mensaje sugerido:

> Mi amor, hice una cosita para ti 🥹❤️  
> No te voy a decir qué es. Solo ábrelo con calma, sube un poquito el volumen y empieza desde el principio.  
> Espero que te guste. 🫶  
> [TU ENLACE]

## 6. Para que WhatsApp muestre una vista previa bonita

`index.html` ya incluye etiquetas Open Graph. Para máxima compatibilidad, después de conocer tu URL pública cambia:

```html
<meta property="og:image" content="assets/images/cinthia-card.webp" />
```

por la URL absoluta, por ejemplo:

```html
<meta property="og:image" content="https://TU-USUARIO.github.io/para-cinthia/assets/images/cinthia-card.webp" />
```

También puedes dejarlo tal como está; la página seguirá funcionando.

## Funcionalidades incluidas

- Entrada cinematográfica.
- Música con intento de autoplay + inicio confiable después del primer toque.
- Reproductor flotante, volumen, progreso y Media Session.
- Tarjeta de Cinthia con efecto 3D/parallax.
- Línea temporal 19 → 20 → ∞.
- Juego de 20 razones interactivas con progreso.
- Mini juego de constelación de 5 estrellas.
- Tarjeta de rascar con Canvas.
- Sobre animado y carta completa.
- Animaciones GIF locales.
- Confeti y corazones generados por Canvas.
- Botón de promesa que se sella manteniéndolo presionado.
- Pregunta final interactiva.
- Modo pantalla completa.
- Compartir por Web Share API / copiar enlace como respaldo.
- Diseño responsive para celular y PC.
- Soporte `prefers-reduced-motion`.
- PWA básica y cache offline de archivos principales.
- Sin trackers ni analíticas.

---

Hecho para Cinthia, de parte de Mijail. ♡
