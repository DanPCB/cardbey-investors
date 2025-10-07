import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MeshBackground3D({
  className = "",
  density = 100,
  globalOpacity = 0.5,
  fadeOnScroll = false,
  fadeStartVH = 65,   // fade begins after this % of viewport scrolled
  fadeEndVH = 0,     // finish fade this % *before* target section top
  minOpacity = 0,     // floor opacity while fading
  style: styleProp,   // <-- note the alias!
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let W = mount.clientWidth || window.innerWidth;
    let H = mount.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0d1117, 120, 520);

    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const el = renderer.domElement;
    el.style.opacity = String(globalOpacity);
    el.style.display = "block";
    el.style.width = "100%";
    el.style.height = "100%";
    el.dataset.engine = "three.js r158"; // debug aid
    mount.appendChild(el);

    // Glow sprite (CanvasTexture)
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = spriteCanvas.height = 128;
    const g = spriteCanvas.getContext("2d");
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0.0, "rgba(255,255,255,1)");
    grd.addColorStop(0.35, "rgba(255,255,255,0.9)");
    grd.addColorStop(1.0, "rgba(255,255,255,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 128, 128);
    const spriteTex = new THREE.CanvasTexture(spriteCanvas);
    spriteTex.minFilter = THREE.LinearFilter;
    spriteTex.magFilter = THREE.LinearFilter;

    // Points
    const scale = Math.sqrt((W * H) / (1440 * 900));
    const COUNT = Math.max(80, Math.round(density * scale));
    const RANGE = 260;

    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * RANGE;
      positions[i * 3 + 1] = (Math.random() - 0.5) * RANGE * 0.7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * RANGE * 0.6;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    const pointGeo = new THREE.BufferGeometry();
    pointGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointMat = new THREE.PointsMaterial({
      size: 5.0,
      map: spriteTex,
      transparent: true,
      opacity: 0.2,
      color: 0xaecbff,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointGeo, pointMat);
    points.renderOrder = 1;
    scene.add(points);

    // Lines
    const MAX_SEGMENTS = COUNT * 6;
    const linePositions = new Float32Array(MAX_SEGMENTS * 3);
    const lineOpacities = new Float32Array(MAX_SEGMENTS);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    lineGeo.setAttribute(
      "aOpacity",
      new THREE.BufferAttribute(lineOpacities, 1).setUsage(THREE.DynamicDrawUsage)
    );

    const lineMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uColor: { value: new THREE.Color(0x9abfff) } },
      vertexShader: `
        attribute float aOpacity;
        varying float vOpacity;
        void main(){
          vOpacity = aOpacity;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vOpacity;
        void main(){
          gl_FragColor = vec4(uColor, vOpacity);
        }
      `,
    });

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    lines.renderOrder = 0;
    scene.add(lines);

    // Input & resize
    let mouseX = 0,
      mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / W) * 2 - 1;
      mouseY = -(e.clientY / H) * 2 + 1;
    };
    const onResize = () => {
      W = mount?.clientWidth || window.innerWidth;
      H = mount?.clientHeight || window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
      // keep fade in sync after resize
      if (fadeOnScroll) applyFade();
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", onResize);

    // Scroll fade
    const target = document.querySelector("#market-overview");
    function clamp(v, a, b) {
      return Math.min(b, Math.max(a, v));
    }
    function applyFade() {
      if (!fadeOnScroll) return;
      const vh = window.innerHeight;
      const start = (fadeStartVH / 100) * vh;
      const targetTop = target
        ? target.getBoundingClientRect().top + window.scrollY
        : vh * 2; // fallback
      const end = targetTop - (fadeEndVH / 100) * vh; // cushion before target
      const y = window.scrollY;
      const t = clamp((y - start) / (end - start), 0, 1); // 0→1
      const fade = 1 - t; // 1→0
      const targetOpacity = globalOpacity * (minOpacity + fade * (1 - minOpacity));
      el.style.opacity = String(targetOpacity);
    }
    if (fadeOnScroll) {
      applyFade();
      window.addEventListener("scroll", applyFade, { passive: true });
    }

    // Animation loop
    const MAX_DIST = 46,
      MAX_DIST_SQ = MAX_DIST * MAX_DIST;
    const MIN_OPACITY = 0.08,
      MAX_OPACITY = 0.3;

    let raf;
    let frame = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      frame++;
      scene.rotation.y += ((mouseX * 0.15 - scene.rotation.y) * 0.02);
      scene.rotation.x += ((mouseY * 0.1 - scene.rotation.x) * 0.02);

      const pos = pointGeo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3 + 0] += velocities[i * 3 + 0] * 0.6;
        pos[i * 3 + 1] += velocities[i * 3 + 1] * 0.6;
        pos[i * 3 + 2] += velocities[i * 3 + 2] * 0.6;
        for (let a = 0; a < 3; a++) {
          const limit = a === 1 ? RANGE * 0.35 : a === 2 ? RANGE * 0.3 : RANGE * 0.5;
          const k = i * 3 + a;
          if (pos[k] > limit || pos[k] < -limit) velocities[k] *= -1;
        }
      }
      pointGeo.attributes.position.needsUpdate = true;

      if (frame % 2 === 0) {
    let segmentPtr = 0;
    for (let i = 0; i < COUNT; i++) {
      const ix = pos[i*3], iy = pos[i*3+1], iz = pos[i*3+2];
      for (let j = i + 1; j < COUNT; j++) {
        const jx = pos[j*3], jy = pos[j*3+1], jz = pos[j*3+2];
        const dx = ix - jx, dy = iy - jy, dz = iz - jz;
        const d2 = dx*dx + dy*dy + dz*dz;
        if (d2 < MAX_DIST_SQ) {
          const f = 1.0 - (d2 / MAX_DIST_SQ);
          const alpha = MIN_OPACITY + f * (MAX_OPACITY - MIN_OPACITY);
          const p = segmentPtr * 6;
          linePositions[p+0] = ix; linePositions[p+1] = iy; linePositions[p+2] = iz;
          linePositions[p+3] = jx; linePositions[p+4] = jy; linePositions[p+5] = jz;
          lineOpacities[segmentPtr] = alpha;
          segmentPtr++;
          if (segmentPtr >= MAX_SEGMENTS) break;
        }
      }
      if (segmentPtr >= MAX_SEGMENTS) break;
      
    }
    lineGeo.setDrawRange(0, segmentPtr * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.aOpacity.needsUpdate = true;
  }

  renderer.render(scene, camera);
};
    raf = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      if (fadeOnScroll) window.removeEventListener("scroll", applyFade);
      if (mount.contains(el)) mount.removeChild(el);
      renderer.dispose();
      pointGeo.dispose();
      pointMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      spriteTex.dispose();
    };
  }, [density, globalOpacity, fadeOnScroll, fadeStartVH, fadeEndVH, minOpacity]);

  return <div ref={mountRef} className={className} style={styleProp || {}} />;
}
