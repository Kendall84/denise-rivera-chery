/* ============ CONFIGURACIÓN (lo único que hay que editar) ============
   1) WHATSAPP: número de Denise con código de país, sin + ni espacios.
      Costa Rica = 506 + 8 dígitos. Ejemplo: "50688881234"
   2) Fotos del 360: carpeta 360/ con 1.jpg, 2.jpg ... (CANTIDAD_FOTOS en total).
   3) Fotos de galería: carpeta imagenes/ con los nombres de GALERIA.
      "texto" es la clave del pie de foto en i18n.js.                     */
const WHATSAPP = "506XXXXXXXX";
const CANTIDAD_FOTOS = 36;
const RUTA_360 = "360/";
const GALERIA = [
  { archivo: "imagenes/interior-1.jpg", texto: "gInterior", area: "g-int",     ancho: 1400, alto: 933 },
  { archivo: "imagenes/tablero.jpg",    texto: "gPantalla", area: "g-pan",     ancho: 800,  alto: 800 },
  { archivo: "imagenes/volante.jpg",    texto: "gVolante", area: "g-vol",      ancho: 800,  alto: 800 },
  { archivo: "imagenes/exterior-2.jpg", texto: "gInstrumentos", area: "g-ins", ancho: 933,  alto: 1400 },
  { archivo: "imagenes/asientos.jpg",   texto: "gAsientos", area: "g-asi",     ancho: 800,  alto: 600 },
  { archivo: "imagenes/exterior-4.jpg", texto: "gMaletero", area: "g-mal",     ancho: 1400, alto: 933 },
  { archivo: "imagenes/exterior-3.jpg", texto: "gEnMovimiento", area: "g-ext", ancho: 1400, alto: 788 }
];
/* ===================================================================== */

const t = clave => window.I18N.t(clave);
const numeroValido = /^\d{8,15}$/.test(WHATSAPP);

/* ---------- WhatsApp (todos los enlaces salen de este único número) ---------- */
function linkWA(texto) {
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);
}
function actualizarEnlacesWA() {
  document.querySelectorAll("[data-wa]").forEach(a => {
    a.href = numeroValido ? linkWA(t(a.dataset.i18nMsg || "msgFloat")) : "#contacto";
  });
}
/* Si el número no está configurado, los botones llevan al formulario y avisan */
document.querySelectorAll("[data-wa]").forEach(a => {
  a.addEventListener("click", e => {
    if (numeroValido) return;
    e.preventDefault();
    document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
    error.textContent = t("errNumero");
  });
});

/* ---------- Visor 360 ---------- */
const viewer = document.getElementById("viewer");
const slider = document.getElementById("rot");
const placeholder = document.getElementById("placeholder");
let frames = [], actual = 0, total = 0;

function mostrar(n) {
  if (!total) return;
  actual = ((n % total) + total) % total;
  frames.forEach((f, i) => f.classList.toggle("on", i === actual));
  slider.value = actual;
}

function iniciar360() {
  const primera = new Image();
  primera.onload = () => {
    placeholder.remove();
    for (let i = 1; i <= CANTIDAD_FOTOS; i++) {
      const im = new Image();
      im.src = RUTA_360 + i + ".jpg";
      im.alt = t("angulo") + " " + i;
      im.draggable = false;
      viewer.appendChild(im);
      frames.push(im);
    }
    total = CANTIDAD_FOTOS;
    slider.max = total - 1;
    mostrar(0);
  };
  primera.onerror = () => {
    /* Sin fotos reales: se usa el visor 3D ilustrativo */
    slider.disabled = true;
    import("./viewer3d.js")
      .then(m => { m.iniciar3D(viewer, slider, placeholder, t("badge3d")); })
      .catch(() => {});
  };
  primera.src = RUTA_360 + "1.jpg";
}
iniciar360();

let arrastrando = false, inicioX = 0, inicioFrame = 0;
const pxPorFoto = () => viewer.clientWidth / total * 1.5;
function ini(x) { arrastrando = true; inicioX = x; inicioFrame = actual; viewer.classList.add("drag"); }
function mov(x) { if (arrastrando && total) mostrar(inicioFrame - Math.round((x - inicioX) / pxPorFoto())); }
function fin() { arrastrando = false; viewer.classList.remove("drag"); }

viewer.addEventListener("mousedown", e => ini(e.clientX));
window.addEventListener("mousemove", e => mov(e.clientX));
window.addEventListener("mouseup", fin);
viewer.addEventListener("touchstart", e => ini(e.touches[0].clientX), { passive: true });
viewer.addEventListener("touchmove", e => mov(e.touches[0].clientX), { passive: true });
viewer.addEventListener("touchend", fin);
slider.addEventListener("input", () => mostrar(Number(slider.value)));

/* ---------- Galería ---------- */
const galeria = document.getElementById("gallery");
GALERIA.forEach(item => {
  const fig = document.createElement("figure");
  fig.className = "shot " + item.area;
  const im = new Image(item.ancho, item.alto);
  im.loading = "lazy";
  im.decoding = "async";
  im.src = item.archivo;
  im.dataset.i18nAlt = item.texto;
  const cap = document.createElement("figcaption");
  cap.dataset.i18n = item.texto;
  fig.append(im, cap);
  galeria.appendChild(fig);
});

/* ---------- Formulario: valida y abre WhatsApp ---------- */
const form = document.getElementById("form");
const error = document.getElementById("error");
const MODELOS = ["Tiggo 2 Pro Max", "Tiggo 4", "otro"];

form.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = form.nombre.value.replace(/[\u0000-\u001f\u007f<>]/g, "").trim().slice(0, 60);
  const modelo = MODELOS.includes(form.modelo.value) ? form.modelo.value : MODELOS[0];
  const mensaje = form.mensaje.value.replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "").trim().slice(0, 300);

  if (nombre.length < 2) { error.textContent = t("errNombre"); form.nombre.focus(); return; }
  if (!numeroValido)     { error.textContent = t("errNumero"); return; }
  error.textContent = "";

  const base = modelo === "otro" ? t("msgFormOtro") : t("msgForm").replace("{modelo}", modelo);
  const texto = base.replace("{nombre}", nombre) + (mensaje ? " " + mensaje : "");
  window.open(linkWA(texto), "_blank", "noopener,noreferrer");
});

/* ---------- Idioma ---------- */
document.addEventListener("idioma-cambiado", () => {
  actualizarEnlacesWA();
  error.textContent = "";
  frames.forEach((f, i) => { f.alt = t("angulo") + " " + (i + 1); });
  const badge = viewer.querySelector(".badge3d");
  if (badge) badge.textContent = t("badge3d");
});
window.I18N.aplicar();
