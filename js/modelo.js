/* Página de detalle: modelo.html?m=<slug>&v=<versión> */
(function () {
  "use strict";
  const { t, tx, el, picture } = App;
  const CATS = { gasolina: "fGasolina", electrico: "fElectrico", hibrido: "fHibrido", pickup: "fPickup" };
  const SECCIONES = [["motor", "secMotor"], ["seguridad", "secSeguridad"], ["interior", "secInterior"], ["exterior", "secExterior"]];
  const DIMS = ["largo", "ancho", "alto", "entre_ejes", "maletero", "peso", "cajon"];
  const params = new URLSearchParams(location.search);
  const slug = (params.get("m") || "").replace(/[^a-z0-9-]/g, "");
  let datos, m, version, galeriaIdx = 0;

  const $ = id => document.getElementById(id);

  function setMeta() {
    const titulo = m.nombre + " | Denise Rivera, asesora Chery";
    const desc = tx(m.resumen);
    document.title = titulo;
    const set = (sel, attr, val) => { const e = document.querySelector(sel); if (e) e.setAttribute(attr, val); };
    set('meta[name="description"]', "content", desc);
    set('meta[property="og:title"]', "content", titulo);
    set('meta[property="og:description"]', "content", desc);
    set('meta[name="twitter:title"]', "content", titulo);
    set('meta[name="twitter:description"]', "content", desc);
    const img0 = m.imagenes[0];
    const urlImg = new URL("img/modelos/" + m.slug + "/" + img0.id + "-" + img0.jpg + ".jpg", location.href).href;
    set('meta[property="og:image"]', "content", urlImg);
    set('meta[name="twitter:image"]', "content", urlImg);
    set('link[rel="canonical"]', "href", new URL("modelo.html?m=" + m.slug, location.href).href);
    let ld = document.getElementById("ld-modelo");
    if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.id = "ld-modelo"; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "Vehicle", name: m.nombre, brand: { "@type": "Brand", name: m.nombre.startsWith("iCAUR") ? "iCAUR" : (m.nombre.startsWith("iCAR") ? "iCAR" : "Chery") },
      description: desc, image: urlImg, vehicleSeatingCapacity: m.pasajeros || undefined
    });
  }

  function pintarHero() {
    const h = $("modelo-hero-media");
    h.textContent = "";
    h.appendChild(picture(m.slug, m.imagenes[0], { eager: true, sizes: "100vw" }));
    $("modelo-tag").textContent = t(CATS[m.categoria]);
    $("modelo-tag").className = "tag tag-" + m.categoria;
    $("modelo-nombre").textContent = m.nombre;
    $("modelo-tipo").textContent = tx(m.tipo);
    $("modelo-resumen").textContent = tx(m.resumen);
  }

  function pintarVersiones() {
    const c = $("versiones");
    c.textContent = "";
    c.hidden = m.versiones.length < 2;
    m.versiones.forEach(v => {
      const b = el("button", "seg-btn", v.id);
      b.type = "button";
      b.setAttribute("aria-pressed", String(v.id === version.id));
      b.addEventListener("click", () => {
        version = v;
        const u = new URL(location.href); u.searchParams.set("v", v.id); history.replaceState(null, "", u);
        pintarVersionDependiente();
      });
      c.appendChild(b);
    });
  }

  function pintarCifras() {
    const c = $("cifras");
    c.textContent = "";
    m.cifras.forEach(x => {
      const d = el("div", "cifra");
      d.append(el("dd", null, tx(x.v)), el("dt", null, t("k_" + x.k)));
      c.appendChild(d);
    });
  }

  function pintarDatosVersion() {
    const c = $("datos-version");
    c.textContent = "";
    Object.keys(version.datos).forEach(k => {
      const d = el("div");
      d.append(el("dt", null, t("k_" + k)), el("dd", null, tx(version.datos[k])));
      c.appendChild(d);
    });
    $("datos-version-titulo").textContent = t("datosVersion") + (m.versiones.length > 1 ? " " + version.id : "");
  }

  function pintarEquipo() {
    SECCIONES.forEach(([k]) => {
      const ul = $("eq-" + k);
      ul.textContent = "";
      (m.equipo[k] || []).forEach(it => {
        const li = el("li");
        li.appendChild(el("span", null, tx(it.t)));
        if (it.v) {
          const incluye = it.v.includes(version.id);
          if (!incluye) li.className = "no-incluye";
          li.appendChild(el("span", "badge" + (incluye ? " badge-on" : ""), t("soloEn") + " " + it.v.join(", ")));
        }
        ul.appendChild(li);
      });
    });
  }

  function pintarGarantiaYColores() {
    const g = $("garantia");
    g.textContent = "";
    if (m.garantia) {
      if (m.garantia.motor) { const d = el("div"); d.append(el("dt", null, t("garantiaMotor")), el("dd", null, tx(m.garantia.motor))); g.appendChild(d); }
      if (m.garantia.vehiculo) { const d = el("div"); d.append(el("dt", null, t("garantiaVehiculo")), el("dd", null, tx(m.garantia.vehiculo))); g.appendChild(d); }
    }
    g.hidden = !g.children.length;
    const c = $("colores");
    c.textContent = "";
    m.colores.forEach(col => {
      const li = el("li", "color");
      const sw = el("span", "swatch"); sw.style.backgroundColor = col.hex; sw.setAttribute("aria-hidden", "true");
      li.append(sw, el("span", null, tx(col.n)));
      c.appendChild(li);
    });
    $("bloque-colores").hidden = !m.colores.length;
  }

  function pintarDimensiones() {
    const c = $("dimensiones-lista");
    c.textContent = "";
    DIMS.forEach(k => {
      const v = m.dimensiones[k];
      if (v == null) return;
      const d = el("div");
      d.append(el("dt", null, t("d_" + k)), el("dd", null, typeof v === "number" ? v.toLocaleString(window.I18N.idioma() === "en" ? "en-US" : "es-CR") + " mm" : tx(v)));
      c.appendChild(d);
    });
  }

  /* Galería con lightbox (teclado y gestos) */
  function pintarGaleria() {
    const g = $("galeria-grid");
    g.textContent = "";
    m.imagenes.forEach((img, i) => {
      const b = el("button", "gal-item");
      b.type = "button";
      b.setAttribute("aria-label", t("verFoto") + ": " + tx(img.alt));
      b.appendChild(picture(m.slug, img, { sizes: "(max-width: 700px) 50vw, 360px", alt: "" }));
      b.addEventListener("click", () => abrirLightbox(i));
      g.appendChild(b);
    });
  }
  function mostrarLightbox(i) {
    galeriaIdx = (i + m.imagenes.length) % m.imagenes.length;
    const img = m.imagenes[galeriaIdx];
    const cont = $("lb-media");
    cont.textContent = "";
    cont.appendChild(picture(m.slug, img, { sizes: "100vw", eager: true }));
    $("lb-caption").textContent = tx(img.alt) + " · " + t("fuente") + ": " + img.fuente + " · " + (galeriaIdx + 1) + "/" + m.imagenes.length;
  }
  function abrirLightbox(i) {
    const d = $("lightbox");
    mostrarLightbox(i);
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
  }
  function iniciarLightbox() {
    const d = $("lightbox");
    $("lb-cerrar").addEventListener("click", () => d.close());
    $("lb-prev").addEventListener("click", () => mostrarLightbox(galeriaIdx - 1));
    $("lb-next").addEventListener("click", () => mostrarLightbox(galeriaIdx + 1));
    d.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") mostrarLightbox(galeriaIdx - 1);
      if (e.key === "ArrowRight") mostrarLightbox(galeriaIdx + 1);
    });
    d.addEventListener("click", e => { if (e.target === d) d.close(); });
    let x0 = null;
    d.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    d.addEventListener("touchend", e => {
      if (x0 == null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) mostrarLightbox(galeriaIdx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  function pintarRelacionados() {
    const c = $("relacionados");
    c.textContent = "";
    const otros = datos.modelos.filter(x => x.slug !== m.slug);
    const lista = otros.filter(x => x.categoria === m.categoria).concat(otros.filter(x => x.categoria !== m.categoria)).slice(0, 3);
    lista.forEach(x => {
      const a = el("a", "rel-card");
      a.href = "modelo.html?m=" + x.slug;
      a.appendChild(picture(x.slug, x.imagenes[0], { sizes: "(max-width: 700px) 100vw, 360px", alt: "" }));
      const b = el("div", "rel-body");
      b.append(el("span", "tag tag-" + x.categoria, t(CATS[x.categoria])), el("strong", null, x.nombre), el("span", "rel-tipo", tx(x.tipo)));
      a.appendChild(b);
      c.appendChild(a);
    });
  }

  function actualizarCTAs() {
    document.querySelectorAll("[data-wa-modelo-actual]").forEach(a => {
      a.dataset.waModelo = m.nombre;
      if (m.versiones.length > 1) { a.dataset.waMsg = "msgVersion"; a.dataset.waVersion = version.id; }
      else a.dataset.waMsg = "msgModelo";
    });
    App.actualizarWA();
  }

  function pintarVersionDependiente() {
    pintarVersiones();
    pintarDatosVersion();
    pintarEquipo();
    actualizarCTAs();
  }

  function pintarTodo() {
    setMeta();
    pintarHero();
    pintarCifras();
    pintarGarantiaYColores();
    pintarDimensiones();
    pintarGaleria();
    pintarRelacionados();
    $("pie-modelo").textContent = tx(datos.pie);
    pintarVersionDependiente();
  }

  App.iniciar();
  App.cargarModelos().then(d => {
    datos = d;
    m = d.modelos.find(x => x.slug === slug);
    if (!m) {
      $("contenido-modelo").hidden = true;
      $("no-encontrado").hidden = false;
      return;
    }
    const pedida = params.get("v");
    version = m.versiones.find(v => v.id === pedida) || m.versiones[0];
    iniciarLightbox();
    pintarTodo();
    if (window.Visor) Visor.montar($("visor"), m);
    document.addEventListener("idioma-cambiado", pintarTodo);
  }).catch(() => {
    $("contenido-modelo").hidden = true;
    $("no-encontrado").hidden = false;
  });
})();
