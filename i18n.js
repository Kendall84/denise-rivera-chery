/* Textos del sitio en español e inglés.
   Para cambiar un texto, edítalo aquí en los dos idiomas. */
(function () {
  "use strict";

  const TEXTOS = {
    es: {
      pageTitle: "Denise Rivera | Asesora de ventas Chery",
      pageDesc: "Denise Rivera, asesora de ventas Chery en Costa Rica. Conoce el Tiggo 2 Pro Max en 360° y cotiza por WhatsApp.",
      skip: "Saltar al contenido",
      logoSub: "Asesora de ventas Chery",
      navLabel: "Principal",
      navTiggo: "Tiggo 2 Pro Max",
      navGaleria: "Fotos",
      navModelos: "Modelos",
      navContacto: "Contáctame",
      heroTitle: "Tu próximo Chery, con alguien que te acompaña de verdad",
      heroLead: "Soy Denise Rivera, asesora de ventas Chery. Te ayudo a escoger el modelo, a coordinar la prueba de manejo y a resolver el financiamiento, hasta que salgas manejando.",
      heroAlt: "Chery Tiggo 2 Pro Max rojo estacionado en una calle soleada",
      ctaWhatsapp: "Escríbeme por WhatsApp",
      ctaVer: "Ver el Tiggo 2 Pro Max",
      trust1: "Asesoría personalizada",
      trust2: "Prueba de manejo coordinada",
      trust3: "Ayuda con el financiamiento",
      t2Title: "Tiggo 2 Pro Max, por todos lados",
      t2Sub: "Arrastra con el dedo o el mouse para girarlo.",
      viewerAria: "Visor 360 grados del Tiggo 2 Pro Max",
      viewerLoading: "Cargando visor…",
      sliderLabel: "Girar el carro",
      badge3d: "Modelo 3D ilustrativo, no es el carro real. Pronto, el 360° con fotos reales.",
      angulo: "Tiggo 2 Pro Max, ángulo",
      specMotor: "Motor",
      specPantalla: "Pantalla táctil",
      specAirbags: "Bolsas de aire",
      specTrans: "Transmisión",
      specTransVal: "Manual o automática",
      specNote: "Especificaciones de referencia. Pregúntale a Denise por la versión y el precio disponibles.",
      galTitle: "Por dentro y por fuera",
      galSub: "El tablero, la pantalla, los asientos y el maletero, de cerca.",
      gExterior: "Exterior",
      gInterior: "Interior y tablero",
      gPantalla: "Pantalla de infoentretenimiento",
      gAsientos: "Asientos con bolsa de aire lateral",
      gVolante: "Volante multifunción",
      gInstrumentos: "Panel de instrumentos digital",
      gMaletero: "Maletero",
      gEnMovimiento: "En la calle",
      modTitle: "Más modelos Chery",
      modSub: "Muy pronto vas a poder ver cada modelo con fotos y datos completos.",
      tagDisponible: "Ya en la página",
      tagPronto: "Próximamente",
      card1: "SUV compacto para la ciudad: moderno, cómodo y económico.",
      card1Btn: "Verlo en 360°",
      card2: "Más espacio y tecnología para la familia.",
      card3Title: "Todo el catálogo",
      card3: "SUV a gasolina, eléctricos, híbridos y pickup. Pregúntame por el que te interesa.",
      cardAsk: "Preguntarle a Denise",
      ctTitle: "¿Cuál Chery va contigo?",
      ctSub: "Déjame tu nombre y lo que buscas. El mensaje se abre en WhatsApp para que me lo envíes directo.",
      fNombre: "Tu nombre",
      fModelo: "Modelo que te interesa",
      fOtro: "Otro modelo",
      fMensaje: "¿Qué te gustaría saber? (opcional)",
      fEnviar: "Enviar por WhatsApp",
      errNombre: "Escribe tu nombre para que Denise sepa quién le escribe.",
      errNumero: "El WhatsApp de Denise todavía no está configurado. Vuelve a intentarlo pronto.",
      footer1: "© 2026 Denise Rivera · Asesora de ventas Chery en Costa Rica.",
      footer2: "Sitio independiente de Denise Rivera. No es la página oficial de Chery ni de sus distribuidores. Imágenes de referencia.",
      floatAria: "Escribir a Denise por WhatsApp",
      msgHero: "Hola Denise, me interesa un Chery. ¿Me puedes dar información?",
      msgTiggo4: "Hola Denise, me interesa el Tiggo 4. ¿Me puedes dar información?",
      msgCatalogo: "Hola Denise, quiero conocer los modelos Chery disponibles.",
      msgFloat: "Hola Denise",
      msgForm: "Hola Denise, soy {nombre}. Me interesa el {modelo}.",
      msgFormOtro: "Hola Denise, soy {nombre}. Quiero información de otro modelo Chery."
    },
    en: {
      pageTitle: "Denise Rivera | Chery Sales Advisor",
      pageDesc: "Denise Rivera, Chery sales advisor in Costa Rica. See the Tiggo 2 Pro Max in 360° and get a quote on WhatsApp.",
      skip: "Skip to content",
      logoSub: "Chery sales advisor",
      navLabel: "Main",
      navTiggo: "Tiggo 2 Pro Max",
      navGaleria: "Photos",
      navModelos: "Models",
      navContacto: "Contact me",
      heroTitle: "Your next Chery, with someone who's with you all the way",
      heroLead: "I'm Denise Rivera, a Chery sales advisor in Costa Rica. I'll help you choose the right model, set up a test drive and sort out financing, until you drive away.",
      heroAlt: "Red Chery Tiggo 2 Pro Max parked on a sunny street",
      ctaWhatsapp: "Message me on WhatsApp",
      ctaVer: "See the Tiggo 2 Pro Max",
      trust1: "Personal advice",
      trust2: "Test drive arranged for you",
      trust3: "Help with financing",
      t2Title: "Tiggo 2 Pro Max, from every angle",
      t2Sub: "Drag with your finger or mouse to turn it.",
      viewerAria: "360-degree viewer of the Tiggo 2 Pro Max",
      viewerLoading: "Loading viewer…",
      sliderLabel: "Turn the car",
      badge3d: "Illustrative 3D model, not the real car. A 360° view with real photos is coming soon.",
      angulo: "Tiggo 2 Pro Max, angle",
      specMotor: "Engine",
      specPantalla: "Touchscreen",
      specAirbags: "Airbags",
      specTrans: "Transmission",
      specTransVal: "Manual or automatic",
      specNote: "Reference specifications. Ask Denise about available trims and pricing.",
      galTitle: "Inside and out",
      galSub: "A close look at the dashboard, screen, seats and trunk.",
      gExterior: "Exterior",
      gInterior: "Interior and dashboard",
      gPantalla: "Infotainment screen",
      gAsientos: "Seats with side airbag",
      gVolante: "Multifunction steering wheel",
      gInstrumentos: "Digital instrument cluster",
      gMaletero: "Trunk",
      gEnMovimiento: "On the street",
      modTitle: "More Chery models",
      modSub: "Soon you'll be able to see every model with full photos and specs.",
      tagDisponible: "On this page",
      tagPronto: "Coming soon",
      card1: "Compact city SUV: modern, comfortable and fuel-efficient.",
      card1Btn: "See it in 360°",
      card2: "More space and technology for the family.",
      card3Title: "The full lineup",
      card3: "Gas SUVs, electric, hybrid and pickup. Ask me about the one you like.",
      cardAsk: "Ask Denise",
      ctTitle: "Which Chery is right for you?",
      ctSub: "Leave your name and what you're looking for. The message opens in WhatsApp so you can send it straight to me.",
      fNombre: "Your name",
      fModelo: "Model you're interested in",
      fOtro: "Another model",
      fMensaje: "What would you like to know? (optional)",
      fEnviar: "Send on WhatsApp",
      errNombre: "Enter your name so Denise knows who's writing.",
      errNumero: "Denise's WhatsApp number isn't set up yet. Please try again soon.",
      footer1: "© 2026 Denise Rivera · Chery sales advisor in Costa Rica.",
      footer2: "Independent site by Denise Rivera. Not the official site of Chery or its distributors. Reference images.",
      floatAria: "Message Denise on WhatsApp",
      msgHero: "Hi Denise, I'm interested in a Chery. Could you send me some information? (I speak English)",
      msgTiggo4: "Hi Denise, I'm interested in the Tiggo 4. Could you send me some information? (I speak English)",
      msgCatalogo: "Hi Denise, I'd like to know which Chery models are available. (I speak English)",
      msgFloat: "Hi Denise (I speak English)",
      msgForm: "Hi Denise, I'm {nombre}. I'm interested in the {modelo}. (I speak English)",
      msgFormOtro: "Hi Denise, I'm {nombre}. I'd like information about another Chery model. (I speak English)"
    }
  };

  const CLAVE = "idioma";
  let idioma = "es";
  try {
    const guardado = localStorage.getItem(CLAVE);
    if (guardado === "es" || guardado === "en") idioma = guardado;
  } catch (e) { /* sin almacenamiento: se queda en español */ }

  function t(clave) {
    return (TEXTOS[idioma] && TEXTOS[idioma][clave]) || TEXTOS.es[clave] || "";
  }

  function aplicar() {
    document.documentElement.lang = idioma;
    document.title = t("pageTitle");
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("pageDesc"));
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
    document.querySelectorAll("[data-i18n-alt]").forEach(el => { el.alt = t(el.dataset.i18nAlt); });
    document.querySelectorAll(".lang-btn").forEach(b => { b.setAttribute("aria-pressed", String(b.dataset.lang === idioma)); });
    document.dispatchEvent(new CustomEvent("idioma-cambiado", { detail: idioma }));
  }

  function cambiar(nuevo) {
    if (nuevo !== "es" && nuevo !== "en") return;
    idioma = nuevo;
    try { localStorage.setItem(CLAVE, idioma); } catch (e) { /* ignorar */ }
    aplicar();
  }

  document.querySelectorAll(".lang-btn").forEach(b => {
    b.addEventListener("click", () => cambiar(b.dataset.lang));
  });

  window.I18N = { t: t, aplicar: aplicar, idioma: () => idioma };
})();
