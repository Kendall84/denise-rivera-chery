/* Portada: catálogo con filtros, visor del modelo destacado y formulario */
(function () {
  "use strict";
  const { t, tx, el, picture } = App;
  const CATS = { gasolina: "fGasolina", electrico: "fElectrico", hibrido: "fHibrido", pickup: "fPickup" };
  let modelos = [], filtro = "todos";

  function datosTarjeta(m) {
    const v = m.versiones[0].datos;
    const out = [];
    const ultima = m.versiones[m.versiones.length - 1].datos;
    if (v.autonomia) {
      const a = tx(v.autonomia).split(" · ")[0], b = tx(ultima.autonomia || "").split(" · ")[0];
      out.push(b && a.split(" ")[0] !== b.split(" ")[0] ? a.split(" ")[0] + "–" + b : a);
    }
    else if (v.motor) out.push(m.versiones.length > 1 && tx(ultima.motor) !== tx(v.motor) ? tx(v.motor) + " / " + tx(ultima.motor) : tx(v.motor));
    if (v.transmision) out.push(tx(v.transmision) + (m.versiones.length > 1 && tx(ultima.transmision) !== tx(v.transmision) ? " / " + tx(ultima.transmision) : ""));
    else if (v.traccion) out.push(m.versiones.map(x => tx(x.datos.traccion)).filter((a, i, arr) => arr.indexOf(a) === i).join(" / "));
    if (m.pasajeros) out.push(m.pasajeros + " " + t("k_pasajeros").toLowerCase());
    return out.slice(0, 3);
  }

  function tarjeta(m) {
    const a = el("article", "card");
    const link = el("a", "card-media");
    link.href = "modelo.html?m=" + encodeURIComponent(m.slug);
    link.setAttribute("aria-label", t("verDetalle") + ": " + m.nombre);
    link.tabIndex = -1;
    link.appendChild(picture(m.slug, m.imagenes[0], { sizes: "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px" }));
    const body = el("div", "card-body");
    const tag = el("span", "tag tag-" + m.categoria, t(CATS[m.categoria]));
    const h = el("h3", "card-title");
    const hl = el("a", null, m.nombre); hl.href = link.href; h.appendChild(hl);
    const tipo = el("p", "card-tipo", tx(m.tipo) + " · " + (m.versiones.length > 1 ? m.versiones.length + " " + t("versiones") : t("version1")));
    const ul = el("ul", "card-datos");
    datosTarjeta(m).forEach(d => ul.appendChild(el("li", null, d)));
    const acciones = el("div", "card-acciones");
    const ver = el("a", "btn btn-sm btn-ghost", t("verDetalle")); ver.href = link.href;
    const wa = el("a", "btn btn-sm btn-wa", t("cotizar"));
    wa.dataset.wa = ""; wa.dataset.waMsg = "msgModelo"; wa.dataset.waModelo = m.nombre;
    wa.target = "_blank"; wa.rel = "noopener noreferrer";
    acciones.append(ver, wa);
    body.append(tag, h, tipo, ul, acciones);
    a.append(link, body);
    return a;
  }

  function pintar() {
    const cont = document.getElementById("catalogo");
    cont.textContent = "";
    const lista = modelos.filter(m => filtro === "todos" || m.categoria === filtro);
    if (!lista.length) cont.appendChild(el("p", "vacio", t("sinResultados")));
    lista.forEach(m => cont.appendChild(tarjeta(m)));
    App.actualizarWA(cont);
  }

  function iniciarFiltros() {
    document.querySelectorAll("[data-filtro]").forEach(b => {
      b.addEventListener("click", () => {
        filtro = b.dataset.filtro;
        document.querySelectorAll("[data-filtro]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
        pintar();
      });
    });
  }

  App.iniciar();
  iniciarFiltros();
  App.cargarModelos().then(d => {
    modelos = d.modelos;
    pintar();
    App.iniciarFormulario(modelos);
    const dest = modelos.find(m => m.slug === "tiggo-2-pro-max");
    if (dest && window.Visor) Visor.montar(document.getElementById("visor"), dest);
    document.addEventListener("idioma-cambiado", pintar);
  }).catch(() => {
    document.getElementById("catalogo").appendChild(el("p", "vacio", "No se pudo cargar el catálogo. Refresca la página."));
  });
})();
