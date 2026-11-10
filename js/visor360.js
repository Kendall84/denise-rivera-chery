/* Visor del modelo.
   Si existen 36 fotos en img/modelos/<slug>/360/1.jpg … 36.jpg, se muestra un giro 360° real.
   Si no, se muestra una vista por ángulos con las fotos oficiales (nunca un 360° falso). */
window.Visor = (function () {
  "use strict";
  const FOTOS_360 = 36;

  function vistaAngulos(cont, m) {
    const { t, tx, el, picture } = App;
    const imgs = m.angulos.map(id => m.imagenes.find(i => i.id === id)).filter(Boolean);
    let actual = 0;
    const escena = el("div", "visor-escena");
    const tira = el("div", "visor-tira");
    tira.setAttribute("role", "group");
    const ayuda = el("p", "visor-ayuda");
    function mostrar(n) {
      actual = (n + imgs.length) % imgs.length;
      escena.textContent = "";
      escena.appendChild(picture(m.slug, imgs[actual], { sizes: "(max-width: 1100px) 100vw, 1100px" }));
      tira.querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-pressed", String(i === actual)));
    }
    function pintarTira() {
      if (cont.dataset.modo === "360") return;
      tira.textContent = "";
      tira.setAttribute("aria-label", t("anguloLabel"));
      imgs.forEach((img, i) => {
        const b = el("button", "visor-mini");
        b.type = "button";
        b.setAttribute("aria-label", tx(img.alt));
        b.appendChild(picture(m.slug, img, { sizes: "160px", alt: "" }));
        b.addEventListener("click", () => mostrar(i));
        b.addEventListener("keydown", e => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            mostrar(actual + (e.key === "ArrowRight" ? 1 : -1));
            tira.children[actual].focus();
          }
        });
        tira.appendChild(b);
      });
      ayuda.textContent = t("visorSub");
      mostrar(actual);
    }
    cont.textContent = "";
    cont.append(escena, imgs.length > 1 ? tira : el("span"), ayuda);
    pintarTira();
    document.addEventListener("idioma-cambiado", pintarTira);
  }

  function vista360(cont, m) {
    const { t, el } = App;
    const ruta = "img/modelos/" + m.slug + "/360/";
    const escena = el("div", "visor-escena visor-360");
    const slider = el("input", "visor-slider");
    slider.type = "range"; slider.min = 0; slider.max = FOTOS_360 - 1; slider.value = 0;
    const ayuda = el("p", "visor-ayuda");
    const frames = [];
    for (let i = 1; i <= FOTOS_360; i++) {
      const im = new Image(); im.src = ruta + i + ".jpg"; im.alt = m.nombre + " 360° (" + i + "/" + FOTOS_360 + ")"; im.draggable = false;
      escena.appendChild(im); frames.push(im);
    }
    let actual = 0, arrastrando = false, x0 = 0, f0 = 0;
    const mostrar = n => { actual = ((n % FOTOS_360) + FOTOS_360) % FOTOS_360; frames.forEach((f, i) => f.classList.toggle("on", i === actual)); slider.value = actual; };
    const px = () => escena.clientWidth / FOTOS_360 * 1.5;
    escena.addEventListener("pointerdown", e => { arrastrando = true; x0 = e.clientX; f0 = actual; escena.setPointerCapture(e.pointerId); });
    escena.addEventListener("pointermove", e => { if (arrastrando) mostrar(f0 - Math.round((e.clientX - x0) / px())); });
    escena.addEventListener("pointerup", () => { arrastrando = false; });
    slider.addEventListener("input", () => mostrar(Number(slider.value)));
    const textos = () => { slider.setAttribute("aria-label", t("girar")); ayuda.textContent = t("visor360Sub"); };
    textos();
    document.addEventListener("idioma-cambiado", textos);
    cont.dataset.modo = "360";
    cont.textContent = "";
    cont.append(escena, slider, ayuda);
    mostrar(0);
  }

  function montar(cont, m) {
    if (!cont || !m) return;
    vistaAngulos(cont, m);
    const prueba = new Image();
    prueba.onload = () => vista360(cont, m);
    prueba.src = "img/modelos/" + m.slug + "/360/1.jpg";
  }

  return { montar };
})();
