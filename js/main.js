/* ==========================================================================
   Mariachi Huacana — JavaScript principal
   Sin dependencias. Todo lo editable está en el objeto CONFIG.
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   1. CONFIGURACIÓN  ·  EDITA AQUÍ TODOS LOS DATOS DEL NEGOCIO
   -------------------------------------------------------------------------- */
const CONFIG = {
  grupo: 'Mariachi Huacana',
  ciudad: 'Estado de México',
  estado: 'México',
  base: 'Estado de México y CDMX',

  // Teléfono en formato visible y WhatsApp solo con dígitos (lada de país + número).
  // REEMPLAZAR con el número real.
  telefono: '+52 722 123 4567',
  whatsapp: '527221234567',

  email: 'contacto@mariachihuacana.mx',
  direccion: 'Estado de México y CDMX',
  horario: 'Lunes a domingo · 8:00 a 22:00',

  // Mensaje que se precarga cuando alguien pulsa un botón general de WhatsApp.
  whatsappMensaje: 'Hola, Mariachi Huacana. Me gustaría cotizar un evento. ¿Me pueden dar información?',

  // Zona de cobertura que se muestra en el sitio.
  cobertura: ['Toluca', 'Metepec', 'Naucalpan', 'Tlalnepantla', 'CDMX', 'Zona Metropolitana'],

  // REEMPLAZAR por las redes oficiales del grupo.
  redes: {
    facebook: 'https://www.facebook.com/mariachihuacana',
    instagram: 'https://www.instagram.com/mariachihuacana',
    youtube: 'https://www.youtube.com/@mariachihuacana'
  },

  // Precios visibles en la sección de paquetes.
  paquetes: {
    basico: 'Desde $4,500 MXN',
    fiesta: 'Desde $7,500 MXN',
    gran: 'Cotiza tu evento'
  },

  // ------------------------------------------------------------------------
  // VIDEOS: pega el ID de YouTube en youtubeId (ej. "dQw4w9WgXcQ").
  // Si se deja vacío, se muestra un marcador elegante dentro del modal.
  // Para Facebook, convierte el video a YouTube o usa un enlace directo en
  // "enlaceExterno" (se abrirá en una pestaña nueva).
  // ------------------------------------------------------------------------
  videos: [
    { titulo: 'Serenata en Toluca', etiqueta: 'Serenata', youtubeId: '', enlaceExterno: '', poster: 'assets/img/video-1.svg' },
    { titulo: 'Fiesta en Metepec', etiqueta: 'En vivo', youtubeId: '', enlaceExterno: '', poster: 'assets/img/video-2.svg' },
    { titulo: 'Popurrí Ranchero', etiqueta: 'Rancheras', youtubeId: '', enlaceExterno: '', poster: 'assets/img/video-3.svg' },
    { titulo: 'Boda en Metepec', etiqueta: 'Boda', youtubeId: '', enlaceExterno: '', poster: 'assets/img/video-4.svg' },
    { titulo: 'Boleros para el Alma', etiqueta: 'Boleros', youtubeId: '', enlaceExterno: '', poster: 'assets/img/video-5.svg' },
    { titulo: 'Sones de Michoacán', etiqueta: 'Sones', youtubeId: '', enlaceExterno: '', poster: 'assets/img/video-6.svg' }
  ]
};

/* --------------------------------------------------------------------------
   2. Utilidades
   -------------------------------------------------------------------------- */
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const WA_ICON = '<svg class="icon icon--solid" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5ZM12 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.3-.4A9.8 9.8 0 1 1 12 21.8Zm5.6-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.5-.6.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.3 4.7 3.1 1.3 3.1.9 3.7.8.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3Z"/></svg>';

function digitsOnly(value) {
  return String(value).replace(/\D/g, '');
}

function waUrl(message) {
  return `https://wa.me/${digitsOnly(CONFIG.whatsapp)}?text=${encodeURIComponent(message || CONFIG.whatsappMensaje)}`;
}

function syncBodyLock() {
  const dialogOpen = $$('dialog[open]').length > 0;
  const navOpen = document.body.classList.contains('nav-open');
  document.body.classList.toggle('no-scroll', dialogOpen || navOpen);
}

/* --------------------------------------------------------------------------
   3. Datos de configuración en el DOM
   -------------------------------------------------------------------------- */
function initConfig() {
  const textMap = {
    grupo: CONFIG.grupo,
    ciudad: CONFIG.ciudad,
    estado: CONFIG.estado,
    base: CONFIG.base,
    telefono: CONFIG.telefono,
    email: CONFIG.email,
    direccion: CONFIG.direccion,
    horario: CONFIG.horario
  };

  $$('[data-config]').forEach((el) => {
    const value = textMap[el.dataset.config];
    if (value) el.textContent = value;
  });

  $$('[data-tel]').forEach((el) => {
    el.setAttribute('href', `tel:+${digitsOnly(CONFIG.telefono)}`);
  });

  $$('[data-email]').forEach((el) => {
    el.setAttribute('href', `mailto:${CONFIG.email}`);
  });

  $$('[data-social]').forEach((el) => {
    const url = CONFIG.redes[el.dataset.social];
    if (url) el.setAttribute('href', url);
  });

  const coverageList = $('#coverage-list');
  if (coverageList && Array.isArray(CONFIG.cobertura)) {
    coverageList.replaceChildren(...CONFIG.cobertura.map((place) => {
      const item = document.createElement('li');
      item.textContent = place;
      return item;
    }));
  }

  const mapCity = $('#map-city');
  if (mapCity) mapCity.textContent = CONFIG.ciudad;

  $$('[data-price]').forEach((el) => {
    const price = CONFIG.paquetes[el.dataset.price];
    if (price) el.textContent = price;
  });

  $$('a[data-wa]').forEach((el) => {
    el.setAttribute('href', waUrl(el.dataset.waMsg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
}

/* --------------------------------------------------------------------------
   4. Header y navegación móvil
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = $('#site-header');
  const toggle = $('#nav-toggle');
  const nav = $('#site-nav');
  if (!header) return;

  let ticking = false;
  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
  updateHeader();

  if (!toggle || !nav) return;

  const openLabel = 'Abrir menú de navegación';
  const closeLabel = 'Cerrar menú de navegación';
  const pageRegions = [$('main'), $('.site-footer')];

  const closeNav = (returnFocus = false) => {
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', openLabel);
    pageRegions.forEach((region) => { if (region) region.inert = false; });
    syncBodyLock();
    if (returnFocus) toggle.focus();
  };

  const openNav = () => {
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', closeLabel);
    pageRegions.forEach((region) => { if (region) region.inert = true; });
    syncBodyLock();
    const firstLink = nav.querySelector('a');
    if (firstLink) window.setTimeout(() => firstLink.focus(), 60);
  };

  toggle.addEventListener('click', () => {
    if (document.body.classList.contains('nav-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  $$('a', nav).forEach((link) => {
    link.addEventListener('click', () => closeNav());
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeNav(true);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 979 && document.body.classList.contains('nav-open')) {
      closeNav();
    }
  });
}

/* --------------------------------------------------------------------------
   5. Animaciones de aparición
   -------------------------------------------------------------------------- */
function initReveal() {
  const elements = $$('[data-reveal]');
  if (!elements.length) return;

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  elements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   6. Contadores animados
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = $$('.counter');
  if (!counters.length) return;

  const formatter = new Intl.NumberFormat('es-MX');
  const duration = 1500;

  const animate = (el) => {
    const target = Number(el.dataset.count || 0);
    if (reduceMotion.matches) {
      el.textContent = formatter.format(target);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatter.format(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => observer.observe(counter));
}

/* --------------------------------------------------------------------------
   7. Parallax ligero del hero
   -------------------------------------------------------------------------- */
function initParallax() {
  const bg = $('.hero__bg');
  const hero = $('.hero');
  if (!bg || !hero) return;

  let ticking = false;

  const update = () => {
    if (reduceMotion.matches || window.innerWidth < 900) {
      bg.style.transform = '';
      ticking = false;
      return;
    }
    const offset = Math.min(window.scrollY * 0.1, 42);
    bg.style.transform = `translate3d(0, ${offset}px, 0) scale(1.03)`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', update);
  reduceMotion.addEventListener?.('change', update);
  update();
}

/* --------------------------------------------------------------------------
   8. Pestañas del repertorio
   -------------------------------------------------------------------------- */
function initTabs() {
  const root = $('[data-tabs]');
  if (!root) return;

  const tabs = $$('[role="tab"]', root);
  const panels = $$('[role="tabpanel"]', root);
  if (!tabs.length) return;

  const activate = (index, focusTab = false) => {
    const safeIndex = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      const selected = i === safeIndex;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel, i) => {
      panel.hidden = i !== safeIndex;
      panel.classList.toggle('is-active', i === safeIndex);
    });
    if (focusTab) tabs[safeIndex].focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(index));
    tab.addEventListener('keydown', (event) => {
      let next = null;
      if (event.key === 'ArrowRight') next = index + 1;
      if (event.key === 'ArrowLeft') next = index - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) {
        event.preventDefault();
        activate(next, true);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Galería de videos + modal
   -------------------------------------------------------------------------- */
function initVideos() {
  const grid = $('#video-grid');
  const dialog = $('#video-modal');
  if (!grid || !dialog) return;

  const frame = $('#video-frame');
  const titleEl = $('#video-modal-title');
  const descEl = $('#video-modal-desc');
  const closeBtn = $('[data-close-video]', dialog);

  const close = () => {
    if (dialog.open) dialog.close();
  };

  const placeholder = (video) => {
    const box = document.createElement('div');
    box.className = 'video-modal__placeholder';

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('stroke-width', '1.2');
    icon.innerHTML = '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5Z" fill="currentColor" stroke="none"/>';

    const strong = document.createElement('strong');
    strong.textContent = 'Este video está en camino';

    const span = document.createElement('span');
    span.textContent = 'Mientras lo subimos, escríbenos por WhatsApp y con gusto te compartimos una muestra en vivo del mariachi.';

    const cta = document.createElement('a');
    cta.className = 'btn btn--gold btn--sm';
    cta.href = waUrl(`Hola, vi el video "${video.titulo}" en su sitio y me gustaría ver más. ¿Me pueden compartir una muestra?`);
    cta.target = '_blank';
    cta.rel = 'noopener noreferrer';
    cta.innerHTML = `${WA_ICON} Pedir una muestra`;

    box.append(icon, strong, span, cta);
    return box;
  };

  const open = (index) => {
    const video = CONFIG.videos[index];
    if (!video) return;

    titleEl.textContent = video.titulo;
    descEl.textContent = `${video.etiqueta || 'En vivo'} · Mariachi Huacana`;

    if (video.youtubeId) {
      frame.classList.remove('is-placeholder');
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtubeId)}?autoplay=1&rel=0`;
      iframe.title = `${video.titulo} · Mariachi Huacana`;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
    } else if (video.enlaceExterno) {
      frame.classList.add('is-placeholder');
      const box = document.createElement('div');
      box.className = 'video-modal__placeholder';
      const strong = document.createElement('strong');
      strong.textContent = video.titulo;
      const span = document.createElement('span');
      span.textContent = 'Este video está alojado en otra plataforma. Ábrelo en una pestaña nueva para verlo.';
      const cta = document.createElement('a');
      cta.className = 'btn btn--gold btn--sm';
      cta.href = video.enlaceExterno;
      cta.target = '_blank';
      cta.rel = 'noopener noreferrer';
      cta.textContent = 'Abrir video';
      box.append(strong, span, cta);
      frame.replaceChildren(box);
    } else {
      frame.classList.add('is-placeholder');
      frame.replaceChildren(placeholder(video));
    }

    dialog.showModal();
    syncBodyLock();
  };

  // Tarjetas generadas desde CONFIG.videos
  CONFIG.videos.forEach((video, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'video-card';
    card.dataset.video = String(index);
    card.setAttribute('aria-label', `Reproducir video: ${video.titulo}`);

    card.innerHTML = `
      <span class="video-card__media">
        <img src="${video.poster}" alt="" width="1280" height="720" loading="lazy" decoding="async">
        <span class="video-card__tag">${video.etiqueta || 'En vivo'}</span>
        <span class="video-card__play" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7Z"/></svg>
        </span>
      </span>
      <span class="video-card__body">
        <span class="video-card__title">${video.titulo}</span>
        <span class="video-card__meta">Mariachi Huacana</span>
      </span>`;

    card.addEventListener('click', () => open(index));
    grid.appendChild(card);
  });

  closeBtn?.addEventListener('click', close);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });
  dialog.addEventListener('close', () => {
    frame.replaceChildren();
    frame.classList.remove('is-placeholder');
    syncBodyLock();
  });
}

/* --------------------------------------------------------------------------
   10. Galería de fotos + lightbox
   -------------------------------------------------------------------------- */
function initLightbox() {
  const items = $$('[data-lightbox]');
  const dialog = $('#lightbox');
  if (!items.length || !dialog) return;

  const img = $('#lightbox-img');
  const caption = $('#lightbox-caption');
  const counter = $('#lightbox-count');
  const closeBtn = $('[data-close-lightbox]', dialog);
  const prevBtn = $('[data-lightbox-prev]', dialog);
  const nextBtn = $('[data-lightbox-next]', dialog);

  let current = 0;

  const render = (index) => {
    current = (index + items.length) % items.length;
    const item = items[current];
    const source = $('img', item);
    img.src = item.dataset.full || source?.src || '';
    img.alt = source?.alt || item.dataset.caption || 'Foto de la galería';
    caption.textContent = item.dataset.caption || 'Galería';
    counter.textContent = `${current + 1} / ${items.length}`;
  };

  const close = () => {
    if (dialog.open) dialog.close();
  };

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      render(index);
      dialog.showModal();
      syncBodyLock();
    });
  });

  prevBtn?.addEventListener('click', () => render(current - 1));
  nextBtn?.addEventListener('click', () => render(current + 1));
  closeBtn?.addEventListener('click', close);

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      render(current - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      render(current + 1);
    }
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) close();
  });

  dialog.addEventListener('close', syncBodyLock);
}

/* --------------------------------------------------------------------------
   11. Carrusel de testimonios
   -------------------------------------------------------------------------- */
function initCarousel() {
  const root = $('[data-carousel]');
  if (!root) return;

  const slides = $$('.testimonial', root);
  const dots = $$('[data-carousel-dot]', root);
  const prevBtn = $('[data-carousel-prev]', root);
  const nextBtn = $('[data-carousel-next]', root);
  const viewport = $('.carousel__viewport', root);
  if (slides.length < 2) return;

  let index = 0;

  const goTo = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  prevBtn?.addEventListener('click', () => goTo(index - 1));
  nextBtn?.addEventListener('click', () => goTo(index + 1));
  dots.forEach((dot) => {
    dot.addEventListener('click', () => goTo(Number(dot.dataset.carouselDot)));
  });

  if (viewport) {
    let startX = null;
    viewport.addEventListener('pointerdown', (event) => {
      startX = event.clientX;
    });
    viewport.addEventListener('pointerup', (event) => {
      if (startX === null) return;
      const delta = event.clientX - startX;
      startX = null;
      if (Math.abs(delta) > 45) goTo(delta > 0 ? index - 1 : index + 1);
    });
    viewport.addEventListener('pointercancel', () => { startX = null; });
  }

  goTo(0);
}

/* --------------------------------------------------------------------------
   12. Formulario → WhatsApp
   -------------------------------------------------------------------------- */
function initForm() {
  const form = $('#contact-form');
  if (!form) return;

  const status = $('#form-status');
  const fecha = $('#fecha');
  const fields = {
    nombre: $('#nombre'),
    telefono: $('#telefono'),
    fecha,
    tipo: $('#tipo'),
    mensaje: $('#mensaje')
  };

  // Fecha mínima: hoy (hora local).
  if (fecha) {
    const today = new Date();
    const iso = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0')
    ].join('-');
    fecha.min = iso;
  }

  const setError = (field, message) => {
    if (!field) return;
    const error = $(`#error-${field.id}`);
    field.setAttribute('aria-invalid', 'true');
    if (error) {
      error.textContent = message;
      error.hidden = false;
    }
  };

  const clearError = (field) => {
    if (!field) return;
    const error = $(`#error-${field.id}`);
    field.removeAttribute('aria-invalid');
    if (error) {
      error.textContent = '';
      error.hidden = true;
    }
  };

  Object.values(fields).forEach((field) => {
    if (!field) return;
    field.addEventListener('input', () => clearError(field));
    field.addEventListener('change', () => clearError(field));
  });

  const formatDate = (value) => {
    if (!value) return '';
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = fields.nombre?.value.trim() || '';
    const telefono = fields.telefono?.value.trim() || '';
    const tipo = fields.tipo?.value || '';
    const mensaje = fields.mensaje?.value.trim() || '';
    const fechaValue = fecha?.value || '';

    let firstInvalid = null;

    if (nombre.length < 2) {
      setError(fields.nombre, 'Escribe tu nombre para saber cómo llamarte.');
      firstInvalid = firstInvalid || fields.nombre;
    }

    if (!fechaValue) {
      setError(fecha, 'Elige la fecha de tu evento.');
      firstInvalid = firstInvalid || fecha;
    } else {
      const selected = new Date(`${fechaValue}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (Number.isNaN(selected.getTime()) || selected < today) {
        setError(fecha, 'Elige una fecha de hoy en adelante.');
        firstInvalid = firstInvalid || fecha;
      }
    }

    if (!tipo) {
      setError(fields.tipo, 'Selecciona el tipo de evento.');
      firstInvalid = firstInvalid || fields.tipo;
    }

    if (mensaje.length < 5) {
      setError(fields.mensaje, 'Cuéntanos un poco más sobre tu evento (mínimo 5 caracteres).');
      firstInvalid = firstInvalid || fields.mensaje;
    }

    if (firstInvalid) {
      if (status) status.textContent = 'Revisa los campos marcados para continuar.';
      firstInvalid.focus();
      return;
    }

    const partes = [
      `Hola, soy ${nombre}.`,
      `Me interesa cotizar ${tipo} para el ${formatDate(fechaValue)}.`
    ];
    if (mensaje) partes.push(mensaje);
    if (telefono) partes.push(`Mi teléfono: ${telefono}.`);
    partes.push('Enviado desde el sitio web.');

    const url = waUrl(partes.join(' '));
    window.open(url, '_blank', 'noopener,noreferrer');

    if (status) {
      status.replaceChildren();
      const text = document.createTextNode('Abrimos WhatsApp en una pestaña nueva. Si no se abrió, ');
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'toca aquí para enviar tu mensaje';
      const tail = document.createTextNode('.');
      status.append(text, link, tail);
    }
  });
}

/* --------------------------------------------------------------------------
   13. Enlace activo en la navegación
   -------------------------------------------------------------------------- */
function initActiveNav() {
  const sections = $$('main section[id]');
  const links = $$('.site-nav__link');
  if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

  const setActive = (id) => {
    links.forEach((link) => {
      if (link.getAttribute('href') === `#${id}`) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      if (id === 'inicio') {
        links.forEach((link) => link.removeAttribute('aria-current'));
        return;
      }
      setActive(id);
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------------
   14. Arranque
   -------------------------------------------------------------------------- */
function init() {
  initConfig();
  initHeader();
  initReveal();
  initCounters();
  initParallax();
  initTabs();
  initVideos();
  initLightbox();
  initCarousel();
  initForm();
  initActiveNav();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
