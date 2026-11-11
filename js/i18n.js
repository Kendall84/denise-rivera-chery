/* Textos de la interfaz en español e inglés.
   Los datos de los carros están en data/modelos.json (también en los dos idiomas). */
(function () {
  "use strict";

  const TEXTOS = {
    es: {
      pageTitle: "Denise Rivera | Asesora de ventas Chery en Costa Rica",
      pageDesc: "Conoce los 10 modelos Chery, iCAR e iCAUR con fotos y fichas por versión. Cotiza por WhatsApp con Denise Rivera, asesora de ventas.",
      skip: "Saltar al contenido",
      logoSub: "Asesora de ventas Chery",
      navLabel: "Principal",
      navModelos: "Modelos",
      navTecnologia: "Tecnología",
      navDenise: "Sobre Denise",
      navComprar: "Cómo comprar",
      navContacto: "Contáctame",
      langLabel: "Idioma / Language",

      heroTitle: "Encuentra tu Chery con asesoría de verdad",
      heroLead: "SUV a gasolina, eléctricos, un híbrido de rango extendido y una pickup 4x4. Te acompaño desde la cotización hasta que sales con tu Chery.",
      heroAlt: "Chery Tiggo 8 Pro negro en una avenida de la ciudad",
      ctaWhatsapp: "Escríbeme por WhatsApp",
      ctaModelos: "Ver modelos",
      trust1: "Asesora de ventas Chery",
      trust2: "Más de 1000 autos vendidos en 10 años",
      trust3: "Cotización sin compromiso",

      catTitle: "Modelos",
      catSub: "10 modelos con fotos oficiales y datos de la ficha técnica de cada versión.",
      filtroLabel: "Filtrar por tipo",
      fTodos: "Todos",
      fGasolina: "SUV a gasolina",
      fElectrico: "Eléctricos",
      fHibrido: "Híbrido",
      fPickup: "Pickup",
      verDetalle: "Ver detalle",
      cotizar: "Cotizar por WhatsApp",
      versiones: "versiones",
      version1: "versión única",
      sinResultados: "No hay modelos en esta categoría.",

      techTitle: "Tecnología y seguridad",
      techSub: "Lo más fuerte de la línea, según las fichas técnicas.",
      tech1T: "5 estrellas de seguridad",
      tech1D: "Tiggo 4 y Tiggo 7 Pro con 5 estrellas A-NCAP. Tiggo 8 Pro, iCAUR V27 y HIMLA también traen 5 estrellas.",
      tech2T: "Asistencias de manejo (ADAS)",
      tech2D: "Frenado automático, crucero adaptativo y punto ciego. De serie en Chery Q, iCAUR V27 e iCAR 03 Expedition; en la versión alta del Tiggo 7 Pro, Tiggo 8 Pro e iCAR 03.",
      tech3T: "Carga rápida",
      tech3D: "Chery Q del 30 al 80 % en 21 minutos. iCAR 03 en 30 minutos.",
      tech4T: "Hasta 1000 km",
      tech4D: "El iCAUR V27 combina motor eléctrico y generador para 1000 km de autonomía (NEDC).",
      tech5T: "Techo panorámico",
      tech5D: "En Tiggo 7 Pro PREMIUM, Tiggo 8 Pro LUX, iCAUR V27 4WD e iCAR 03 Expedition.",
      tech6T: "Garantía de motor",
      tech6D: "10 años o 1.000.000 km en Tiggo 2 Pro Max, Tiggo 4, Tiggo 7 Pro y Tiggo 8 Pro.",

      visorTitle: "Míralo desde varios ángulos",
      visorSub: "Fotos oficiales del modelo. Toca una miniatura para cambiar la vista.",
      visor360Sub: "Arrastra con el dedo o el mouse para girarlo 360°.",
      anguloLabel: "Ángulos disponibles",
      girar: "Girar el carro",

      denTitle: "Sobre Denise",
      denLead: "Soy Denise Rivera, asesora de ventas Chery. En 10 años he vendido más de 1000 autos, y mi trabajo es que compres el carro que de verdad te sirve, con la información clara y sin vueltas.",
      denFrase: "Te acompaño desde la cotización hasta que sales con tu Chery.",
      redesTitle: "Sígueme en redes",
      testiTitle: "Lo que dicen mis clientes",
      cincoEstrellas: "5 de 5 estrellas",
      denItem1T: "Cotización sin compromiso",
      denItem1D: "Te paso el precio actualizado del modelo y la versión que te interesa, sin compromiso.",
      denItem2T: "Prueba de manejo",
      denItem2D: "Coordino la prueba para que manejes el carro antes de decidir.",
      denItem3T: "Financiamiento",
      denItem3D: "Nos ajustamos a tu presupuesto y te acompaño con el trámite y los papeles.",
      denItem4T: "Entrega",
      denItem4D: "Estoy contigo el día que recoges tu Chery.",
      denZona: "Zona de atención",
      denHorario: "Horario",
      denExperiencia: "Experiencia",

      comprarTitle: "Cómo comprar tu Chery",
      paso1T: "Elige tu modelo",
      paso1D: "Revisa el catálogo o escríbeme y te recomiendo según tu uso.",
      paso2T: "Prueba de manejo",
      paso2D: "Coordinamos día y hora para que lo manejes.",
      paso3T: "Financiamiento o forma de pago",
      paso3D: "Vemos juntos las opciones disponibles para ti.",
      paso4T: "Entrega",
      paso4D: "Recibes tu carro listo para manejar.",

      faqTitle: "Preguntas frecuentes",
      faq1P: "¿Dónde veo el precio?",
      faq1R: "Los precios y promociones cambian, así que no los publico aquí. Escríbeme por WhatsApp y te paso el precio actualizado y las opciones de financiamiento.",
      faq2P: "¿Qué garantía tienen?",
      faq2R: "Según las fichas: Tiggo 2 Pro Max, Tiggo 4, Tiggo 7 Pro y Tiggo 8 Pro tienen 10 años o 1.000.000 km en motor y 5 años o 150.000 km en el vehículo. La HIMLA tiene 5 años o 150.000 km. Para los demás modelos, pregúntame.",
      faq3P: "¿Puedo hacer una prueba de manejo?",
      faq3R: "Sí. Escríbeme con el modelo que te interesa y coordinamos la fecha.",
      faq4P: "¿Cuál es la diferencia entre CLTC y NEDC?",
      faq4R: "Son métodos de prueba de autonomía. Las cifras de las fichas usan uno u otro; el rendimiento real depende del manejo, el clima y la carga.",
      faq5P: "¿Este es el sitio oficial de Chery?",
      faq5R: "No. Es el sitio independiente de Denise Rivera, asesora de ventas. La información viene de las fichas técnicas de Grupo Coricar.",

      ctTitle: "¿Cuál Chery va contigo?",
      ctSub: "Déjame tu nombre y lo que buscas. El mensaje se abre en WhatsApp para que me lo envíes directo.",
      fNombre: "Tu nombre",
      fModelo: "Modelo que te interesa",
      fOtro: "Todavía no sé / otro",
      fMensaje: "¿Qué te gustaría saber? (opcional)",
      fEnviar: "Enviar por WhatsApp",
      errNombre: "Escribe tu nombre para que Denise sepa quién le escribe.",
      errNumero: "El WhatsApp de Denise todavía no está configurado. Vuelve a intentarlo pronto.",

      footer1: "© 2026 Denise Rivera · Asesora de ventas Chery en Costa Rica.",
      footer2: "Imágenes y especificaciones: Grupo Coricar / Chery. Sitio independiente de Denise Rivera, asesora de ventas. No es la página oficial de Chery ni de Coricar.",
      floatAria: "Escribir a Denise por WhatsApp",
      barCotizar: "Cotizar",
      barWhatsapp: "WhatsApp",

      volver: "Todos los modelos",
      precio: "Consulta precio y financiamiento con Denise",
      elegirVersion: "Elige la versión",
      secResumen: "Resumen",
      secMotor: "Motor y desempeño",
      secSeguridad: "Seguridad y ADAS",
      secInterior: "Interior y tecnología",
      secExterior: "Exterior",
      secDimensiones: "Dimensiones",
      secGaleria: "Galería",
      secColores: "Colores disponibles",
      secAngulos: "Vista por ángulos",
      secRelacionados: "También te puede interesar",
      soloEn: "Solo en",
      datosVersion: "Datos de la versión",
      garantiaMotor: "Garantía de motor",
      garantiaVehiculo: "Garantía de vehículo",
      cotizarModelo: "Cotizar este modelo",
      verFoto: "Ver foto",
      cerrar: "Cerrar",
      anterior: "Foto anterior",
      siguiente: "Foto siguiente",
      noEncontrado: "No encontramos ese modelo.",
      fuente: "Fuente",

      k_motor: "Motor", k_transmision: "Transmisión", k_potencia: "Potencia", k_torque: "Torque",
      k_traccion: "Tracción", k_autonomia: "Autonomía", k_bateria: "Batería", k_carga: "Carga rápida",
      k_aceleracion: "Aceleración", k_aros: "Aros", k_pantalla: "Pantalla", k_parlantes: "Parlantes",
      k_airbags: "Airbags", k_pasajeros: "Pasajeros", k_maletero: "Maletero", k_seguridad: "Seguridad",
      k_carga_util: "Capacidad de carga", k_remolque: "Remolque",
      d_largo: "Largo", d_ancho: "Ancho", d_alto: "Alto", d_entre_ejes: "Distancia entre ejes",
      d_maletero: "Maletero", d_peso: "Peso en vacío", d_cajon: "Cajón (largo × ancho × alto)",

      msgGeneral: "Hola Denise, me interesa un Chery. ¿Me puedes dar información?",
      msgFloat: "Hola Denise",
      msgModelo: "Hola Denise, me interesa el {modelo}. ¿Me puedes dar información?",
      msgVersion: "Hola Denise, me interesa el {modelo} {version}. ¿Me puedes dar información?",
      msgForm: "Hola Denise, soy {nombre}. Me interesa el {modelo}.",
      msgFormOtro: "Hola Denise, soy {nombre}. Quiero que me ayudes a escoger un Chery."
    },
    en: {
      pageTitle: "Denise Rivera | Chery Sales Advisor in Costa Rica",
      pageDesc: "Explore 10 Chery, iCAR and iCAUR models with photos and specs for every trim. Get a quote on WhatsApp from Denise Rivera, sales advisor.",
      skip: "Skip to content",
      logoSub: "Chery sales advisor",
      navLabel: "Main",
      navModelos: "Models",
      navTecnologia: "Technology",
      navDenise: "About Denise",
      navComprar: "How to buy",
      navContacto: "Contact me",
      langLabel: "Idioma / Language",

      heroTitle: "Find your Chery with real, personal advice",
      heroLead: "Gas SUVs, electric models, an extended-range hybrid and a 4x4 pickup. I'll be with you from the first quote until you drive off in your Chery.",
      heroAlt: "Black Chery Tiggo 8 Pro on a city avenue",
      ctaWhatsapp: "Message me on WhatsApp",
      ctaModelos: "See models",
      trust1: "Chery sales advisor",
      trust2: "Over 1,000 cars sold in 10 years",
      trust3: "No-obligation quote",

      catTitle: "Models",
      catSub: "10 models with official photos and spec-sheet data for every trim.",
      filtroLabel: "Filter by type",
      fTodos: "All",
      fGasolina: "Gas SUVs",
      fElectrico: "Electric",
      fHibrido: "Hybrid",
      fPickup: "Pickup",
      verDetalle: "See details",
      cotizar: "Quote on WhatsApp",
      versiones: "trims",
      version1: "single trim",
      sinResultados: "No models in this category.",

      techTitle: "Technology and safety",
      techSub: "The lineup's highlights, per the spec sheets.",
      tech1T: "5-star safety",
      tech1D: "Tiggo 4 and Tiggo 7 Pro have 5-star A-NCAP ratings. Tiggo 8 Pro, iCAUR V27 and HIMLA also carry 5 stars.",
      tech2T: "Driver assistance (ADAS)",
      tech2D: "Automatic braking, adaptive cruise and blind spot. Standard on Chery Q, iCAUR V27 and iCAR 03 Expedition; on the top trim of Tiggo 7 Pro, Tiggo 8 Pro and iCAR 03.",
      tech3T: "Fast charging",
      tech3D: "Chery Q charges 30–80 % in 21 minutes. iCAR 03 in 30 minutes.",
      tech4T: "Up to 1000 km",
      tech4D: "The iCAUR V27 pairs electric drive with a generator for 1000 km of range (NEDC).",
      tech5T: "Panoramic roof",
      tech5D: "On Tiggo 7 Pro PREMIUM, Tiggo 8 Pro LUX, iCAUR V27 4WD and iCAR 03 Expedition.",
      tech6T: "Engine warranty",
      tech6D: "10 years or 1,000,000 km on Tiggo 2 Pro Max, Tiggo 4, Tiggo 7 Pro and Tiggo 8 Pro.",

      visorTitle: "See it from every angle",
      visorSub: "Official model photos. Tap a thumbnail to change the view.",
      visor360Sub: "Drag with your finger or mouse to turn it 360°.",
      anguloLabel: "Available angles",
      girar: "Turn the car",

      denTitle: "About Denise",
      denLead: "I'm Denise Rivera, a Chery sales advisor. I've sold over 1,000 cars in 10 years, and my job is to help you buy the car that really fits you, with clear information and no runaround.",
      denFrase: "I'll be with you from the first quote until you drive off in your Chery.",
      redesTitle: "Follow me",
      testiTitle: "What my clients say",
      cincoEstrellas: "5 out of 5 stars",
      denItem1T: "No-obligation quote",
      denItem1D: "I'll send you the current price for the model and trim you like, with no obligation.",
      denItem2T: "Test drive",
      denItem2D: "I set up a test drive so you can drive it before deciding.",
      denItem3T: "Financing",
      denItem3D: "We work within your budget, and I help you with the paperwork.",
      denItem4T: "Delivery",
      denItem4D: "I'm with you the day you pick up your Chery.",
      denZona: "Service area",
      denHorario: "Hours",
      denExperiencia: "Experience",

      comprarTitle: "How to buy your Chery",
      paso1T: "Choose your model",
      paso1D: "Browse the lineup or message me and I'll recommend one for your needs.",
      paso2T: "Test drive",
      paso2D: "We set a day and time for you to drive it.",
      paso3T: "Financing or payment",
      paso3D: "We go over the options available to you.",
      paso4T: "Delivery",
      paso4D: "You get your car ready to drive.",

      faqTitle: "Frequently asked questions",
      faq1P: "Where can I see the price?",
      faq1R: "Prices and promotions change, so I don't post them here. Message me on WhatsApp and I'll send you the current price and financing options.",
      faq2P: "What warranty do they have?",
      faq2R: "Per the spec sheets: Tiggo 2 Pro Max, Tiggo 4, Tiggo 7 Pro and Tiggo 8 Pro have a 10-year or 1,000,000 km engine warranty and a 5-year or 150,000 km vehicle warranty. HIMLA has 5 years or 150,000 km. For other models, ask me.",
      faq3P: "Can I take a test drive?",
      faq3R: "Yes. Message me with the model you like and we'll set a date.",
      faq4P: "What's the difference between CLTC and NEDC?",
      faq4R: "They're range test methods. The spec sheets use one or the other; real range depends on driving, weather and load.",
      faq5P: "Is this Chery's official website?",
      faq5R: "No. It's the independent site of Denise Rivera, sales advisor. The information comes from Grupo Coricar spec sheets.",

      ctTitle: "Which Chery is right for you?",
      ctSub: "Leave your name and what you're looking for. The message opens in WhatsApp so you can send it straight to me.",
      fNombre: "Your name",
      fModelo: "Model you're interested in",
      fOtro: "Not sure yet / other",
      fMensaje: "What would you like to know? (optional)",
      fEnviar: "Send on WhatsApp",
      errNombre: "Enter your name so Denise knows who's writing.",
      errNumero: "Denise's WhatsApp number isn't set up yet. Please try again soon.",

      footer1: "© 2026 Denise Rivera · Chery sales advisor in Costa Rica.",
      footer2: "Images and specifications: Grupo Coricar / Chery. Independent site by Denise Rivera, sales advisor. Not the official site of Chery or Coricar.",
      floatAria: "Message Denise on WhatsApp",
      barCotizar: "Get a quote",
      barWhatsapp: "WhatsApp",

      volver: "All models",
      precio: "Ask Denise about price and financing",
      elegirVersion: "Choose a trim",
      secResumen: "Overview",
      secMotor: "Engine and performance",
      secSeguridad: "Safety and ADAS",
      secInterior: "Interior and technology",
      secExterior: "Exterior",
      secDimensiones: "Dimensions",
      secGaleria: "Gallery",
      secColores: "Available colors",
      secAngulos: "Angle view",
      secRelacionados: "You might also like",
      soloEn: "Only on",
      datosVersion: "Trim details",
      garantiaMotor: "Engine warranty",
      garantiaVehiculo: "Vehicle warranty",
      cotizarModelo: "Get a quote for this model",
      verFoto: "View photo",
      cerrar: "Close",
      anterior: "Previous photo",
      siguiente: "Next photo",
      noEncontrado: "We couldn't find that model.",
      fuente: "Source",

      k_motor: "Engine", k_transmision: "Transmission", k_potencia: "Power", k_torque: "Torque",
      k_traccion: "Drive", k_autonomia: "Range", k_bateria: "Battery", k_carga: "Fast charging",
      k_aceleracion: "Acceleration", k_aros: "Wheels", k_pantalla: "Screen", k_parlantes: "Speakers",
      k_airbags: "Airbags", k_pasajeros: "Passengers", k_maletero: "Trunk", k_seguridad: "Safety",
      k_carga_util: "Payload", k_remolque: "Towing",
      d_largo: "Length", d_ancho: "Width", d_alto: "Height", d_entre_ejes: "Wheelbase",
      d_maletero: "Trunk", d_peso: "Curb weight", d_cajon: "Bed (length × width × height)",

      msgGeneral: "Hi Denise, I'm interested in a Chery. Could you send me some information? (I speak English)",
      msgFloat: "Hi Denise (I speak English)",
      msgModelo: "Hi Denise, I'm interested in the {modelo}. Could you send me some information? (I speak English)",
      msgVersion: "Hi Denise, I'm interested in the {modelo} {version}. Could you send me some information? (I speak English)",
      msgForm: "Hi Denise, I'm {nombre}. I'm interested in the {modelo}. (I speak English)",
      msgFormOtro: "Hi Denise, I'm {nombre}. I'd like help choosing a Chery. (I speak English)"
    }
  };

  const CLAVE = "idioma";
  let idioma = "es";
  try {
    const guardado = localStorage.getItem(CLAVE);
    if (guardado === "es" || guardado === "en") idioma = guardado;
  } catch (e) { /* sin almacenamiento: español */ }

  function t(clave, vars) {
    let s = (TEXTOS[idioma] && TEXTOS[idioma][clave]) || TEXTOS.es[clave] || "";
    if (vars) Object.keys(vars).forEach(k => { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }
  /* Texto bilingüe de los datos: {es, en} o texto simple */
  function tx(v) {
    if (v && typeof v === "object") return v[idioma] || v.es || "";
    return v == null ? "" : String(v);
  }

  function aplicar() {
    document.documentElement.lang = idioma;
    if (document.body.dataset.pagina === "inicio") {
      document.title = t("pageTitle");
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", t("pageDesc"));
    }
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

  document.querySelectorAll(".lang-btn").forEach(b => b.addEventListener("click", () => cambiar(b.dataset.lang)));

  window.I18N = { t: t, tx: tx, aplicar: aplicar, idioma: () => idioma };
  aplicar();
})();
