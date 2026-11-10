/* Visor 3D ilustrativo (se usa mientras no existan las fotos reales del 360).
   Modelo hecho con formas simples; NO es el carro real. */
import * as THREE from "./vendor/three.module.min.js";

export function iniciar3D(contenedor, slider, placeholder, textoEtiqueta) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch (e) {
    return false;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Modelo 3D ilustrativo de un SUV compacto, girable 360 grados");
  contenedor.appendChild(canvas);
  if (placeholder) placeholder.remove();

  const escena = new THREE.Scene();
  const camara = new THREE.PerspectiveCamera(30, 16 / 9, 0.1, 100);
  camara.position.set(0, 1.55, 8.4);
  camara.lookAt(0, 0.72, 0);

  /* Entorno de reflejos (cielo/estudio dibujado en un canvas) */
  const cv = document.createElement("canvas");
  cv.width = 1024; cv.height = 512;
  const g = cv.getContext("2d");
  const grad = g.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, "#9fb4d6"); grad.addColorStop(0.5, "#e9eef7"); grad.addColorStop(0.52, "#3a3d46"); grad.addColorStop(1, "#14151a");
  g.fillStyle = grad; g.fillRect(0, 0, 1024, 512);
  g.fillStyle = "#ffffff";
  [[120, 60, 220, 70], [560, 40, 260, 60], [880, 90, 120, 90]].forEach(r => g.fillRect(r[0], r[1], r[2], r[3]));
  const texEnt = new THREE.CanvasTexture(cv);
  texEnt.mapping = THREE.EquirectangularReflectionMapping;
  texEnt.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  escena.environment = pmrem.fromEquirectangular(texEnt).texture;

  escena.add(new THREE.HemisphereLight(0xffffff, 0x20222a, 0.7));
  const luz = new THREE.DirectionalLight(0xffffff, 1.7);
  luz.position.set(3, 6, 5); escena.add(luz);
  const luz2 = new THREE.DirectionalLight(0x9db8ff, 0.8);
  luz2.position.set(-5, 3, -4); escena.add(luz2);

  /* ---------- Carro ---------- */
  const carro = new THREE.Group();
  const matCarroceria = new THREE.MeshPhysicalMaterial({ color: 0xc8102e, metalness: 0.45, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.08 });
  const matVidrio = new THREE.MeshPhysicalMaterial({ color: 0x0c1118, metalness: 0.9, roughness: 0.06, clearcoat: 1 });
  const matNegro = new THREE.MeshStandardMaterial({ color: 0x0d0d10, roughness: 0.6, metalness: 0.2 });
  const matPlata = new THREE.MeshStandardMaterial({ color: 0xc9ced6, metalness: 0.9, roughness: 0.25 });
  const matLlanta = new THREE.MeshStandardMaterial({ color: 0x111113, roughness: 0.9 });
  const ANCHO = 1.8;

  function extruir(forma, prof, mat, bisel) {
    const geo = new THREE.ExtrudeGeometry(forma, {
      depth: prof, bevelEnabled: true, bevelThickness: bisel, bevelSize: bisel, bevelSegments: 4, curveSegments: 28
    });
    geo.translate(0, 0, -prof / 2);
    return new THREE.Mesh(geo, mat);
  }

  /* Cuerpo (perfil lateral; el frente mira a +x) */
  const c = new THREE.Shape();
  c.moveTo(-2.05, 0.32);
  c.lineTo(-1.76, 0.32); c.lineTo(-1.76, 0.40);
  c.absarc(-1.3, 0.40, 0.46, Math.PI, 0, true);
  c.lineTo(-0.84, 0.32); c.lineTo(0.84, 0.32); c.lineTo(0.84, 0.40);
  c.absarc(1.3, 0.40, 0.46, Math.PI, 0, true);
  c.lineTo(1.76, 0.32); c.lineTo(2.03, 0.32);
  c.lineTo(2.10, 0.52); c.lineTo(2.08, 0.80);
  c.quadraticCurveTo(1.9, 0.92, 1.45, 1.04);
  c.lineTo(-1.95, 1.04);
  c.quadraticCurveTo(-2.12, 0.95, -2.12, 0.70);
  c.lineTo(-2.10, 0.47); c.lineTo(-2.05, 0.32);
  carro.add(extruir(c, ANCHO - 0.12, matCarroceria, 0.06));

  /* Cabina de vidrio */
  const k = new THREE.Shape();
  k.moveTo(-1.9, 1.02); k.lineTo(-1.76, 1.52);
  k.quadraticCurveTo(-1.74, 1.58, -1.62, 1.58);
  k.lineTo(0.38, 1.59);
  k.quadraticCurveTo(0.5, 1.59, 0.58, 1.54);
  k.lineTo(1.32, 1.02); k.lineTo(-1.9, 1.02);
  carro.add(extruir(k, 1.5, matVidrio, 0.02));

  /* Techo y pilares (color de carrocería) */
  const techo = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.06, 1.56), matCarroceria);
  techo.position.set(-0.64, 1.61, 0); techo.rotation.z = 0.004; carro.add(techo);
  [-1, 1].forEach(s => {
    const pb = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.52, 0.04), matCarroceria);
    pb.position.set(-0.32, 1.3, s * 0.77); carro.add(pb);
    const pc = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.58, 0.04), matCarroceria);
    pc.position.set(-1.83, 1.3, s * 0.77); pc.rotation.z = -0.28; carro.add(pc);
    const pa = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.92, 0.05), matCarroceria);
    pa.position.set(0.95, 1.29, s * 0.77); pa.rotation.z = 0.98; carro.add(pa);
  });

  /* Pasos de rueda (fondo oscuro) */
  [[-1.3], [1.3]].forEach(([x]) => {
    const f = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.5, ANCHO - 0.3), matNegro);
    f.position.set(x, 0.55, 0); carro.add(f);
  });

  /* Ruedas */
  function rueda(x, z) {
    const gr = new THREE.Group();
    const llanta = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.24, 40), matLlanta);
    llanta.rotation.x = Math.PI / 2; gr.add(llanta);
    const aro = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.255, 36), matPlata);
    aro.rotation.x = Math.PI / 2; gr.add(aro);
    for (let i = 0; i < 5; i++) {
      const rayo = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.54, 0.262), matNegro);
      rayo.rotation.z = (i * Math.PI * 2) / 5 + 0.3; gr.add(rayo);
    }
    const centro = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.27, 20), matPlata);
    centro.rotation.x = Math.PI / 2; gr.add(centro);
    gr.position.set(x, 0.4, z); return gr;
  }
  [[-1.3, -0.83], [-1.3, 0.83], [1.3, -0.83], [1.3, 0.83]].forEach(p => carro.add(rueda(p[0], p[1])));

  /* Luces, parrilla, espejos, detalles */
  const matFaro = new THREE.MeshStandardMaterial({ color: 0xf2f6ff, emissive: 0xdfe8ff, emissiveIntensity: 0.9, roughness: 0.2 });
  const matStop = new THREE.MeshStandardMaterial({ color: 0xff2a2a, emissive: 0xff0000, emissiveIntensity: 0.8, roughness: 0.3 });
  const caja = (w, h, d, m, x, y, z) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); carro.add(o); return o; };
  [-1, 1].forEach(s => {
    caja(0.1, 0.1, 0.42, matFaro, 2.07, 0.8, s * 0.62);          // faros
    caja(0.06, 0.03, 0.4, matFaro, 2.1, 0.7, s * 0.62);          // luz diurna
    caja(0.1, 0.16, 0.34, matStop, -2.12, 0.86, s * 0.68);        // calaveras
    caja(0.26, 0.14, 0.1, matCarroceria, 0.95, 1.1, s * 0.99);  // espejos
    caja(0.14, 0.03, 0.03, matPlata, 0.35, 0.93, s * 0.93);       // manijas
    caja(0.14, 0.03, 0.03, matPlata, -0.95, 0.93, s * 0.93);
  });
  caja(0.08, 0.26, 0.9, matNegro, 2.1, 0.62, 0);                  // parrilla
  caja(0.08, 0.12, 1.3, matNegro, 2.07, 0.4, 0);                  // toma de aire inferior
  caja(0.07, 0.04, 0.9, matPlata, 2.12, 0.5, 0);                  // moldura cromada
  caja(0.06, 0.1, 1.5, matNegro, -2.13, 0.46, 0);                 // parachoques trasero
  caja(0.05, 0.12, 0.3, matPlata, -2.15, 0.66, 0);                // placa

  /* Sombra suave bajo el carro */
  const cs = document.createElement("canvas"); cs.width = cs.height = 256;
  const gs = cs.getContext("2d");
  const rg = gs.createRadialGradient(128, 128, 10, 128, 128, 128);
  rg.addColorStop(0, "rgba(0,0,0,.65)"); rg.addColorStop(1, "rgba(0,0,0,0)");
  gs.fillStyle = rg; gs.fillRect(0, 0, 256, 256);
  const sombra = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 3.2), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cs), transparent: true, depthWrite: false }));
  sombra.rotation.x = -Math.PI / 2; sombra.position.y = 0.012; carro.add(sombra);

  escena.add(carro);

  /* ---------- Interacción ---------- */
  const BASE = -0.75, PASO = (Math.PI * 2) / 36;
  let angulo = BASE, vel = 0, arrastrando = false, ultimoX = 0, ultimaAccion = 0, visible = true;

  function ponerSlider() {
    const n = ((Math.round((angulo - BASE) / PASO) % 36) + 36) % 36;
    if (slider) slider.value = n;
  }
  if (slider) { slider.disabled = false; slider.max = 35; slider.value = 0; }

  canvas.addEventListener("pointerdown", e => {
    arrastrando = true; ultimoX = e.clientX; vel = 0; ultimaAccion = performance.now();
    canvas.setPointerCapture(e.pointerId); contenedor.classList.add("drag");
  });
  canvas.addEventListener("pointermove", e => {
    if (!arrastrando) return;
    const dx = e.clientX - ultimoX; ultimoX = e.clientX;
    vel = dx * 0.011; angulo += vel; ultimaAccion = performance.now();
  });
  const soltar = () => { arrastrando = false; contenedor.classList.remove("drag"); };
  canvas.addEventListener("pointerup", soltar);
  canvas.addEventListener("pointercancel", soltar);
  if (slider) slider.addEventListener("input", () => {
    angulo = BASE + Number(slider.value) * PASO; vel = 0; ultimaAccion = performance.now();
  });

  function ajustar() {
    const w = contenedor.clientWidth, h = contenedor.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camara.aspect = w / h;
    camara.position.z = camara.aspect < 1.2 ? 11.5 : 8.4;
    camara.updateProjectionMatrix();
  }
  ajustar();
  new ResizeObserver(ajustar).observe(contenedor);
  new IntersectionObserver(en => { visible = en[0].isIntersecting; }).observe(contenedor);

  const reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function animar() {
    requestAnimationFrame(animar);
    if (!visible) return;
    if (!arrastrando) {
      vel *= 0.94;
      if (Math.abs(vel) < 0.0004) vel = 0;
      angulo += vel;
      if (!reducido && performance.now() - ultimaAccion > 2500) angulo += 0.004;
    }
    carro.rotation.y = angulo;
    ponerSlider();
    renderer.render(escena, camara);
  }
  animar();

  /* Etiqueta para que quede claro que es ilustrativo */
  const etiqueta = document.createElement("div");
  etiqueta.className = "badge3d";
  etiqueta.textContent = textoEtiqueta || "Modelo 3D ilustrativo, no es el carro real.";
  contenedor.appendChild(etiqueta);
  return true;
}
