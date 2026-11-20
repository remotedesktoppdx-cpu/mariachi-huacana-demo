# Mariachi Huacana — Sitio web demo

Sitio estático, elegante y responsive para **Mariachi Huacana**, agrupación con base en el **Estado de México y la CDMX**. El nombre nace de La Huacana, Michoacán, y esa raíz se cuenta en la sección "Sobre nosotros".

Está pensado para que un cliente potencial conozca el grupo, escuche su propuesta y cotice por WhatsApp en pocos segundos.

**Stack:** HTML5, CSS3 y JavaScript vanilla. Sin frameworks, sin build y sin dependencias locales.

**Demo en línea:** https://remotedesktoppdx-cpu.github.io/mariachi-huacana-demo/

---

## 1. Cómo abrirlo

1. Descarga o clona la carpeta completa.
2. Haz **doble clic en `index.html`**.

También puedes validarlo con un servidor local. Por ejemplo, en la carpeta del proyecto:

```bash
python -m http.server 8080
```

Y abrir `http://localhost:8080`. En XAMPP funciona en `http://localhost/MariachiHuacana/`.

El sitio funciona directamente desde el sistema de archivos (`file://`). Solo necesita conexión a internet para cargar las tipografías de Google Fonts; si no hay conexión, usa las fuentes de respaldo del sistema.

### Publicarlo en GitHub Pages

1. Crea un repositorio nuevo y sube el contenido de esta carpeta (la raíz debe contener `index.html`).
2. En GitHub entra a **Settings → Pages**.
3. En **Build and deployment** elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
4. Guarda y espera a que GitHub te dé la URL publicada.
5. Las URLs canónicas y de Open Graph ya apuntan a la demo en GitHub Pages (`https://remotedesktoppdx-cpu.github.io/mariachi-huacana-demo/`). Si publicas el sitio en otro dominio, actualiza esas URLs y el bloque JSON-LD en `index.html`.

Todas las rutas son relativas, así que también funciona si el sitio se publica en una subcarpeta (por ejemplo `usuario.github.io/MariachiHuacana/`).

---

## 2. Dónde cambiar los datos

Casi todo se edita en un solo lugar: **el objeto `CONFIG`, al inicio de `js/main.js`**.

```js
const CONFIG = {
  grupo: 'Mariachi Huacana',
  ciudad: 'Estado de México',       // etiqueta del mapa
  estado: 'México',
  base: 'Estado de México y CDMX',  // base que se muestra en contacto y footer
  telefono: '+52 722 123 4567',
  whatsapp: '527221234567',         // solo dígitos: 52 + número, sin +, espacios ni guiones
  email: 'contacto@mariachihuacana.mx',
  redes: { facebook: '...', instagram: '...', youtube: '...' },
  cobertura: ['Toluca', 'Metepec', 'Naucalpan', 'Tlalnepantla', 'CDMX', 'Zona Metropolitana'],
  paquetes: { basico: 'Desde $4,500 MXN', fiesta: 'Desde $7,500 MXN', gran: 'Cotiza tu evento' },
  videos: [ ... ]
};
```

Con eso se actualizan automáticamente:

- Todos los botones y enlaces de WhatsApp (con mensajes precargados por sección).
- El teléfono visible y los enlaces `tel:`.
- La base, el horario, el correo y la lista de cobertura.
- Los precios de los paquetes.
- Las redes sociales.
- El año del copyright.
- La etiqueta central del mapa.

**Importante:** `telefono` es el número que se muestra; `whatsapp` debe llevar solo dígitos y la lada de país (`52` para México). Ejemplo: para `+52 722 000 0000`, escribe `527220000000`. El número actual es un **placeholder**; sustitúyelo antes de publicar.

### Datos que viven en el HTML

Por buenas prácticas de SEO, estos datos también están escritos en `index.html` y conviene actualizarlos si cambias de grupo, base o número:

- `<title>`, `meta description`, `canonical`, Open Graph y Twitter Card.
- El bloque JSON-LD (`LocalBusiness`): teléfono, correo, región, redes y zonas atendidas.
- El nombre del grupo aparece en el header, hero, footer, portada y textos alternativos. Si el nombre cambia, haz una búsqueda y reemplazo.
- La etiqueta central del mapa se actualiza desde `CONFIG.ciudad`; las demás etiquetas del mapa (Toluca, Metepec, CDMX) se editan directamente en el SVG si cambia la cobertura.
- La historia de "Sobre nosotros" explica que el nombre viene de La Huacana, Michoacán, pero la base operativa es el Estado de México y CDMX.

---

## 3. Logo y marca

El logo se rediseñó en vector a partir del emblema original de Facebook. Conserva los elementos de identidad —azul marino, dorado, anillo tipo cuerda, sombrero, monograma **MH**, guitarra y el lema *"El ritmo de nuestra sangre"*— pero con trazos más limpios y legibles a tamaños pequeños.

| Archivo | Uso |
|---|---|
| `assets/brand/logo-huacana.svg` | Emblema completo; se usa en el footer |
| `assets/brand/logo-huacana-mark.svg` | Marca compacta; se usa en el header |
| `assets/favicon.svg` | Favicon; es la marca compacta |

Para sustituirlo por el archivo oficial del grupo:

1. Reemplaza `assets/brand/logo-huacana.svg` y `logo-huacana-mark.svg` conservando los nombres, o actualiza las rutas en `index.html`.
2. Copia la versión compacta a `assets/favicon.svg`.
3. Mantén el fondo transparente y un tamaño cuadrado para el favicon (por ejemplo 512 × 512 px).

---

## 4. Cómo sustituir fotos

Los archivos están en `assets/img/` y todos los espacios están marcados en el HTML con `<!-- REEMPLAZAR -->`.

| Archivo / uso | Medida sugerida | Dónde se usa |
|---|---|---|
| `hero-portrait.svg` | 900 × 1200 px (3:4) | Foto principal del hero |
| `hero-bg.svg` | 1920 × 1200 px | Fondo del hero |
| `about-1.svg`, `about-2.svg`, `about-3.svg` | 800 × 1000 px | Collage de "Sobre nosotros" |
| `gallery-1.svg` … `gallery-9.svg` | 900 × 1200 px aprox. | Galería tipo masonry |
| `video-1.svg` … `video-6.svg` | 1280 × 720 px (16:9) | Miniaturas de video |
| `og-cover.png` | 1200 × 630 px | Vista previa al compartir en redes |

Recomendaciones:

1. Usa fotos propias del grupo, con autorización de las personas que aparecen.
2. Guarda tus fotos como `.jpg` o `.webp` para que pesen menos.
3. Puedes conservar el mismo nombre de archivo y extensión, o cambiar el `src` en el HTML.
4. Actualiza siempre `width`, `height` y `alt`. El `alt` debe describir la foto ("Mariachi tocando en una boda al aire libre"), no repetir palabras clave.
5. Para la galería, actualiza también `data-full` (versión de alta resolución para el lightbox) y `data-caption` (texto que aparece en el visor).
6. Si reemplazas el fondo del hero por un video, cambia el `<img class="hero__bg">` por:

```html
<video class="hero__bg" autoplay muted loop playsinline poster="assets/img/hero-bg.svg" aria-hidden="true">
  <source src="assets/video/hero.mp4" type="video/mp4">
</video>
```

Agrega `preload="none"` si el video es pesado y evita archivos de más de 5–8 MB.

---

## 5. Cómo agregar videos

En `js/main.js`, dentro de `CONFIG.videos`, cada elemento corresponde a una tarjeta:

```js
{
  titulo: 'Serenata en Toluca',
  etiqueta: 'Serenata',
  youtubeId: 'dQw4w9WgXcQ',   // solo el ID de YouTube, no la URL completa
  enlaceExterno: '',           // para Facebook, Vimeo u otra plataforma
  poster: 'assets/img/video-1.svg'
}
```

- **YouTube:** copia el ID de la URL (`https://www.youtube.com/watch?v=EL_ID`). El modal usará el reproductor de YouTube sin cookies.
- **Facebook u otra plataforma:** deja `youtubeId` vacío y pega la URL completa en `enlaceExterno`. El modal mostrará un botón para abrirla en una pestaña nueva.
- **Miniatura:** puedes seguir usando las tarjetas SVG o poner una imagen propia en `poster`. Para YouTube, también puedes usar `https://i.ytimg.com/vi/EL_ID/hqdefault.jpg`.
- Si dejas ambos campos vacíos, el modal muestra un marcador elegante con un botón de WhatsApp, como en esta demo.

---

## 6. Personalización visual

- **Colores, tipografías, sombras, radios y espaciados:** variables CSS al inicio de `css/styles.css`, dentro de `:root`.
- **Tipografías:** Playfair Display (títulos), Cinzel (etiquetas/inscripciones) e Inter (texto), cargadas desde Google Fonts en el `<head>`.
- **Animaciones:** clase `.js [data-reveal]` + `IntersectionObserver`; el parallax del hero y los contadores se desactivan con `prefers-reduced-motion`.
- **Modo oscuro:** es el modo por defecto del diseño. La paleta está pensada para contraste AA sobre negro charro.
- **Portada para redes:** edita `assets/img/og-cover.svg` y expórtalo a PNG de 1200 × 630, o reemplaza `og-cover.png` por una foto con esas medidas.

---

## 7. Estructura del proyecto

```
MariachiHuacana/
├─ index.html
├─ README.md
├─ .gitignore
├─ css/
│  └─ styles.css
├─ js/
│  └─ main.js               ← CONFIG editable
└─ assets/
   ├─ favicon.svg
   ├─ brand/
   │  ├─ logo-huacana.svg
   │  └─ logo-huacana-mark.svg
   └─ img/
      ├─ hero-bg.svg
      ├─ hero-portrait.svg
      ├─ about-1.svg … about-3.svg
      ├─ gallery-1.svg … gallery-9.svg
      ├─ video-1.svg … video-6.svg
      ├─ og-cover.png
      └─ og-cover.svg
```

---

## 8. Contenido de ejemplo

Este sitio es una **demostración**. Antes de publicarlo con fines comerciales:

- Sustituye el teléfono, WhatsApp, correo y redes por los reales.
- Cambia precios, paquetes y duración por los que maneje el grupo.
- Reemplaza las fotos y videos de muestra.
- Sustituye las tres reseñas de ejemplo por opiniones reales (el sitio ya incluye una nota aclaratoria). Las ubicaciones actuales son Metepec, Naucalpan y CDMX.
- Ajusta los contadores de "Sobre nosotros" (12 años, 8 músicos, 950+ eventos) y la historia del grupo directamente en `index.html`.
- Revisa el nombre, la base (Estado de México/CDMX), la cobertura y las etiquetas del mapa.
- Actualiza el dominio en las etiquetas SEO/OG y en el JSON-LD.
- Revisa el número de teléfono de ejemplo y las redes sociales antes de publicar.
- Actualiza `assets/img/og-cover.png` con una foto real o vuelve a exportar `og-cover.svg` con los datos definitivos.

Las imágenes de muestra son SVG originales creados para esta demo; no contienen fotografías con derechos de autor.

---

## 9. Accesibilidad y rendimiento

- HTML semántico, un solo `h1`, landmarks y enlace "Saltar al contenido".
- Foco visible, navegación por teclado en menú, tabs, carrusel y modales.
- `aria-expanded`, `aria-selected`, `aria-hidden`, `role="tablist"`, diálogos nativos y foco atrapado por el navegador.
- `prefers-reduced-motion` desactiva parallax, animaciones, contadores y transiciones.
- Imágenes con `alt`, dimensiones declaradas y `loading="lazy"` en las secciones inferiores.
- Sin dependencias JS; solo Google Fonts como recurso externo.

Validado en Chromium a **375 px, 768 px y 1440 px**, sin errores de consola ni desbordes horizontales.

---

## 10. Créditos

- Tipografías: [Google Fonts](https://fonts.google.com/) — Playfair Display, Cinzel e Inter.
- Rediseño vectorial del logo, ilustraciones y patrones: realizados para esta demo a partir del emblema proporcionado por el grupo.
- Fotografías y videos definitivos: a cargo del grupo.
