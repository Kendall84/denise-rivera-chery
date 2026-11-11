/* ============ CONFIGURACIÓN DE DENISE (lo único que hay que editar) ============
   whatsapp:    número con código de país, sin + ni espacios. Costa Rica = 506 + 8 dígitos.
   foto:        ruta a la foto, por ejemplo "img/denise/denise.webp". Vacío = se muestran sus iniciales.
   zona, horario, experiencia: texto en español e inglés. Vacío = no se muestra.
   redes:       enlaces completos (https://...). Vacío = no se muestra ese botón.
   testimonios: SOLO reseñas reales de clientes, con su permiso. Lista vacía = la sección no aparece.
                Ejemplo: { nombre: "María G.", modelo: "Tiggo 4", texto: { es: "…", en: "…" } }   */
const DENISE = {
  whatsapp: "50661569164",
  foto: "",
  zona: { es: "", en: "" },
  horario: { es: "9:00 a. m. a 6:00 p. m.", en: "9:00 a.m. to 6:00 p.m." },
  experiencia: { es: "10 años · más de 1000 autos vendidos", en: "10 years · over 1,000 cars sold" },
  redes: { facebook: "", instagram: "", tiktok: "" },
  testimonios: [
    { nombre: "Estefanía Rojas", texto: { es: "Excelente atención desde el primer momento. Me ayudaron a encontrar el carro que buscaba y todo el proceso fue muy claro y rápido. Estoy muy agradecida por el servicio.", en: "Excellent service from the very first moment. They helped me find the car I was looking for, and the whole process was clear and quick. I'm very grateful for the service." } },
    { nombre: "Carlos Camacho", texto: { es: "Muy buena experiencia de compra. Recibí un trato amable, me explicaron todos los detalles del vehículo y me dieron mucha confianza. ¡Estoy feliz con mi carro nuevo!", en: "A great buying experience. I was treated kindly, they explained every detail of the vehicle and gave me a lot of confidence. I'm happy with my new car!" } },
    { nombre: "Nelson Otárola", texto: { es: "Quiero agradecer por la excelente atención y el acompañamiento durante todo el proceso. Encontré exactamente lo que necesitaba. Sin duda, recomiendo el servicio.", en: "I want to say thanks for the excellent service and support throughout the whole process. I found exactly what I needed. I definitely recommend the service." } }
  ]
};
/* =============================================================================== */

const App = (function () {
  "use strict";
  const t = (k, v) => window.I18N.t(k, v);
  const tx = v => window.I18N.tx(v);
  const numeroValido = /^\d{8,15}$/.test(DENISE.whatsapp);
  let modelosCache = null;

  function linkWA(texto) {
    return "https://wa.me/" + DENISE.whatsapp + "?text=" + encodeURIComponent(texto);
  }

  /* Todos los enlaces [data-wa] salen del mismo número. data-wa-msg = clave del mensaje,
     data-wa-modelo / data-wa-version = datos para el mensaje. */
  function textoWA(el) {
    const clave = el.dataset.waMsg || "msgFloat";
    return t(clave, { modelo: el.dataset.waModelo || "", version: el.dataset.waVersion || "" });
  }
  function actualizarWA(raiz) {
    (raiz || document).querySelectorAll("[data-wa]").forEach(a => {
      a.href = numeroValido ? linkWA(textoWA(a)) : "#contacto";
      if (!a.dataset.waListo) {
        a.dataset.waListo = "1";
        a.addEventListener("click", e => {
          if (numeroValido) return;
          e.preventDefault();
          avisarSinNumero();
        });
      }
    });
  }
  function avisarSinNumero() {
    let aviso = document.getElementById("aviso");
    if (!aviso) return;
    aviso.textContent = t("errNumero");
    aviso.hidden = false;
    clearTimeout(avisarSinNumero._t);
    avisarSinNumero._t = setTimeout(() => { aviso.hidden = true; }, 5000);
  }

  function cargarModelos() {
    if (modelosCache) return Promise.resolve(modelosCache);
    return fetch("data/modelos.json", { credentials: "same-origin" })
      .then(r => { if (!r.ok) throw new Error("datos"); return r.json(); })
      .then(d => (modelosCache = d));
  }

  /* <picture> con WebP en varios anchos y JPG de respaldo */
  function picture(slug, img, opciones) {
    const o = opciones || {};
    const base = "img/modelos/" + slug + "/" + img.id + "-";
    const pic = document.createElement("picture");
    const src = document.createElement("source");
    src.type = "image/webp";
    src.srcset = img.anchos.map(w => base + w + ".webp " + w + "w").join(", ");
    src.sizes = o.sizes || "100vw";
    const im = document.createElement("img");
    im.src = base + img.jpg + ".jpg";
    im.width = img.w; im.height = img.h;
    im.alt = o.alt != null ? o.alt : tx(img.alt);
    im.decoding = "async";
    if (o.eager) im.fetchPriority = "high"; else im.loading = "lazy";
    pic.append(src, im);
    return pic;
  }

  function el(tag, clase, texto) {
    const e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto != null) e.textContent = texto;
    return e;
  }

  /* Formulario de contacto: valida, limpia y abre WhatsApp */
  function iniciarFormulario(modelos) {
    const form = document.getElementById("form");
    if (!form) return;
    const error = document.getElementById("error");
    const sel = form.modelo;
    const llenar = () => {
      const actual = sel.value;
      sel.textContent = "";
      modelos.forEach(m => { const o = el("option", null, m.nombre); o.value = m.slug; sel.appendChild(o); });
      const otro = el("option", null, t("fOtro")); otro.value = "otro"; sel.appendChild(otro);
      if (actual) sel.value = actual;
    };
    llenar();
    document.addEventListener("idioma-cambiado", () => { llenar(); error.textContent = ""; });
    form.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = form.nombre.value.replace(/[\u0000-\u001f\u007f<>]/g, "").trim().slice(0, 60);
      const mensaje = form.mensaje.value.replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "").trim().slice(0, 300);
      const m = modelos.find(x => x.slug === sel.value);
      if (nombre.length < 2) { error.textContent = t("errNombre"); form.nombre.focus(); return; }
      if (!numeroValido) { error.textContent = t("errNumero"); return; }
      error.textContent = "";
      const base = m ? t("msgForm", { nombre: nombre, modelo: m.nombre }) : t("msgFormOtro", { nombre: nombre });
      window.open(linkWA(base + (mensaje ? " " + mensaje : "")), "_blank", "noopener,noreferrer");
    });
  }

  /* Sección "Sobre Denise": foto o iniciales, y datos solo si están llenos */
  function iniciarDenise() {
    const foto = document.getElementById("denise-foto");
    if (foto) {
      foto.textContent = "";
      if (DENISE.foto) {
        const im = el("img"); im.src = DENISE.foto; im.alt = "Denise Rivera"; im.width = 480; im.height = 600; im.loading = "lazy";
        foto.appendChild(im);
      } else {
        foto.appendChild(el("span", "monograma", "DR"));
      }
    }
    const lista = document.getElementById("denise-datos");
    if (!lista) return;
    const pintar = () => {
      lista.textContent = "";
      [["denZona", DENISE.zona], ["denHorario", DENISE.horario], ["denExperiencia", DENISE.experiencia]].forEach(([k, v]) => {
        const val = tx(v);
        if (!val) return;
        const d = el("div"); d.append(el("dt", null, t(k)), el("dd", null, val)); lista.appendChild(d);
      });
      lista.hidden = !lista.children.length;
    };
    pintar();
    document.addEventListener("idioma-cambiado", pintar);
    iniciarRedes();
    iniciarTestimonios();
  }

  /* Redes: solo enlaces https completos */
  function iniciarRedes() {
    const NOMBRES = { facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok" };
    const redes = Object.keys(NOMBRES).filter(k => /^https:\/\/[^\s"<>]+$/.test((DENISE.redes || {})[k] || ""));
    document.querySelectorAll("[data-redes]").forEach(c => {
      c.textContent = "";
      redes.forEach(k => {
        const a = el("a", "btn btn-sm btn-ghost", NOMBRES[k]);
        a.href = DENISE.redes[k]; a.target = "_blank"; a.rel = "noopener noreferrer";
        c.appendChild(a);
      });
      const bloque = c.closest("[data-redes-bloque]") || c;
      bloque.hidden = !redes.length;
    });
  }

  /* Testimonios: la sección se oculta mientras no haya reseñas reales */
  function iniciarTestimonios() {
    const sec = document.getElementById("opiniones");
    const lista = document.getElementById("testimonios");
    if (!sec || !lista) return;
    const datos = (DENISE.testimonios || []).filter(x => x && x.nombre && x.texto);
    sec.hidden = !datos.length;
    const pintar = () => {
      lista.textContent = "";
      datos.forEach(x => {
        const f = el("figure", "testimonio");
        const estrellas = el("span", "estrellas", "★★★★★");
        estrellas.setAttribute("role", "img"); estrellas.setAttribute("aria-label", t("cincoEstrellas"));
        const q = el("blockquote", null, tx(x.texto));
        const c = el("figcaption", null, x.nombre + (x.modelo ? " · " + x.modelo : ""));
        f.append(estrellas, q, c); lista.appendChild(f);
      });
    };
    pintar();
    document.addEventListener("idioma-cambiado", pintar);
  }

  function iniciar() {
    actualizarWA();
    document.addEventListener("idioma-cambiado", () => actualizarWA());
    iniciarDenise();
  }

  return { t, tx, linkWA, actualizarWA, cargarModelos, picture, el, iniciar, iniciarFormulario, numeroValido };
})();
