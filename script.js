/* ============ CONFIGURACIÓN (lo único que hay que editar) ============
   1) WHATSAPP: número de Denise con código de país, sin + ni espacios.
      Costa Rica = 506 + 8 dígitos. Ejemplo: "50688881234"
   2) Fotos del 360: carpeta 360/ con 1.jpg, 2.jpg ... (CANTIDAD_FOTOS en total).
   3) Fotos de galería: carpeta imagenes/ con los nombres de GALERIA.        */
const WHATSAPP = "506XXXXXXXX";
const CANTIDAD_FOTOS = 36;
const RUTA_360 = "360/";
const GALERIA = [
  { archivo: "imagenes/interior-1.jpg", texto: "Interior" },
  { archivo: "imagenes/tablero.jpg",    texto: "Tablero y pantalla" },
  { archivo: "imagenes/asientos.jpg",   texto: "Asientos" },
  { archivo: "imagenes/exterior.jpg",   texto: "Exterior" }
];
/* ===================================================================== */

const numeroValido = /^\d{8,15}$/.test(WHATSAPP);

/* Enlaces de WhatsApp (todos salen de este único número) */
function linkWA(texto) {
  return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);
}
document.querySelectorAll("[data-wa]").forEach(a => {
  if (numeroValido) a.href = linkWA(a.dataset.msg || "Hola Denise");
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
      im.alt = "Tiggo 2 Pro Max, ángulo " + i;
      im.draggable = false;
      viewer.appendChild(im);
      frames.push(im);
    }
    total = CANTIDAD_FOTOS;
    slider.max = total - 1;
    mostrar(0);
  };
  primera.onerror = () => { slider.disabled = true; };
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

/* ---------- Galería (usa la foto si existe, si no deja el espacio) ---------- */
const galeria = document.getElementById("gallery");
GALERIA.forEach(item => {
  const caja = document.createElement("div");
  caja.className = "shot";
  caja.textContent = "Foto: " + item.texto;
  galeria.appendChild(caja);
  const im = new Image();
  im.onload = () => { caja.textContent = ""; caja.classList.add("ok"); im.alt = item.texto; caja.appendChild(im); };
  im.src = item.archivo;
});

/* ---------- Formulario: valida y abre WhatsApp ---------- */
const form = document.getElementById("form");
const error = document.getElementById("error");
const MODELOS = ["Tiggo 2 Pro Max", "Tiggo 4", "Otro modelo"];

form.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = form.nombre.value.trim().slice(0, 60);
  const modelo = MODELOS.includes(form.modelo.value) ? form.modelo.value : MODELOS[0];
  const mensaje = form.mensaje.value.trim().slice(0, 300);

  if (nombre.length < 2) { error.textContent = "Escribe tu nombre, por favor."; return; }
  if (!numeroValido)     { error.textContent = "El número de WhatsApp aún no está configurado."; return; }
  error.textContent = "";

  const texto = "Hola Denise, soy " + nombre + ". Me interesa el " + modelo + "." + (mensaje ? " " + mensaje : "");
  window.open(linkWA(texto), "_blank", "noopener,noreferrer");
});
