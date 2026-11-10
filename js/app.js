/* ============ CONFIGURACIÓN DE DENISE (lo único que hay que editar) ============
   whatsapp:    número con código de país, sin + ni espacios. Costa Rica = 506 + 8 dígitos.
   foto:        ruta a la foto, por ejemplo "img/denise/denise.webp". Vacío = se muestran sus iniciales.
   zona, horario, experiencia: texto en español e inglés. Vacío = no se muestra.          */
const DENISE = {
  whatsapp: "506XXXXXXXX",
  foto: "",
  zona: { es: "", en: "" },
  horario: { es: "", en: "" },
  experiencia: { es: "", en: "" }
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
  }

  function iniciar() {
    actualizarWA();
    document.addEventListener("idioma-cambiado", () => actualizarWA());
    iniciarDenise();
  }

  return { t, tx, linkWA, actualizarWA, cargarModelos, picture, el, iniciar, iniciarFormulario, numeroValido };
})();
