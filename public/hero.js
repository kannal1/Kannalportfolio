/* =====================================================================
   Hero field — a system that responds to you.
   An instanced grid on a tilted plane, displaced by a flowing field +
   cursor influence. Tiles near the pointer rise and catch vermilion light.
   ===================================================================== */
import * as THREE from './vendor/three.module.min.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(pointer:coarse)').matches;
const canvas = document.getElementById('field');

let renderer;
try { renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true}); }
catch(e){ renderer = null; }

if (renderer && renderer.getContext()){
  window.__heroReady = true;
  const ACCENT = new THREE.Color(0xFF2E3A);
  const BASE   = new THREE.Color(0x16161A);
  const MID    = new THREE.Color(0x2A2A30);

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, coarse ? 1.5 : 2));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0B0B0D, 0.085);

  const camera = new THREE.PerspectiveCamera(42, innerWidth/innerHeight, .1, 100);
  camera.position.set(0, 7.2, 13.5);
  camera.lookAt(0, -0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const key = new THREE.DirectionalLight(0xfff0f0, 1.1);
  key.position.set(-6, 12, 8); scene.add(key);
  const rim = new THREE.PointLight(0xFF2E3A, 18, 26, 2);
  rim.position.set(0, 1.5, 4); scene.add(rim);

  // grid
  const GX = coarse ? 30 : 46;
  const GZ = coarse ? 30 : 46;
  const GAP = 0.42;
  const SIZE = 0.30;
  const COUNT = GX * GZ;

  const geo = new THREE.BoxGeometry(SIZE, SIZE, SIZE);
  const mat = new THREE.MeshStandardMaterial({roughness:.55, metalness:.15});
  const mesh = new THREE.InstancedMesh(geo, mat, COUNT);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.castShadow = false;
  scene.add(mesh);

  // per-instance base position + color buffer
  const cols = new Float32Array(COUNT * 3);
  const colAttr = new THREE.InstancedBufferAttribute(cols, 3);
  mesh.instanceColor = colAttr;          // colored per-instance via setColorAt

  const bx = [], bz = [];
  let idx = 0;
  for (let i = 0; i < GX; i++){
    for (let j = 0; j < GZ; j++){
      bx[idx] = (i - (GX - 1) / 2) * GAP;
      bz[idx] = (j - (GZ - 1) / 2) * GAP;
      idx++;
    }
  }

  const dummy = new THREE.Object3D();
  const tmpCol = new THREE.Color();

  // cursor in normalized space → world target on the plane
  let mx = 0, my = 0, smx = 0, smy = 0;
  const pointer = new THREE.Vector3(99, 0, 99);
  if (!coarse) {
    addEventListener('pointermove', e => {
      mx = (e.clientX / innerWidth) * 2 - 1;
      my = (e.clientY / innerHeight) * 2 - 1;
    });
  }

  // click ripple
  let ripT = -10, ripX = 0, ripZ = 0;
  if (!coarse) addEventListener('pointerdown', e => {
    if (e.target.closest('a,button')) return;
    ripT = 0;
    ripX = smx * 9;
    ripZ = -smy * 6 + 2;
  });

  const t0 = performance.now();
  const lerp = (a,b,t)=>a+(b-a)*t;

  // scroll fade-out of the hero field
  let heroFade = 1;
  addEventListener('scroll', () => {
    const h = innerHeight;
    heroFade = Math.max(0, 1 - scrollY / (h * 0.9));
  }, {passive:true});

  let visible = true;
  const obs = new IntersectionObserver(function(es){ visible = es[0].isIntersecting; }, {threshold:0});
  obs.observe(canvas);

  function frame(){
    if (!visible) { return; }   // skip work when hero is scrolled away
    const t = reduce ? 0.6 : (performance.now()-t0)/1000;
    smx = lerp(smx, mx, 0.06);
    smy = lerp(smy, my, 0.06);

    // pointer world target (loose projection onto the tilted plane)
    pointer.x = smx * 9;
    pointer.z = -smy * 6 + 2;

    if (ripT >= 0) ripT += 0.016;

    for (let k = 0; k < COUNT; k++){
      const x = bx[k], z = bz[k];
      const d = Math.sqrt(x*x + z*z);

      // flowing field (layered sines stand in for noise)
      let y = Math.sin(x*0.55 + t*0.9) * 0.5
            + Math.cos(z*0.5 - t*0.7) * 0.5
            + Math.sin((x+z)*0.32 + t*0.5) * 0.4;
      y *= 0.62;

      // cursor lift — gaussian falloff toward the pointer
      const pd = Math.hypot(x - pointer.x, z - pointer.z);
      const lift = Math.exp(-pd*pd / 5.5) * 2.4;
      y += lift;

      // click ripple ring expanding outward
      let rip = 0;
      if (ripT >= 0 && ripT < 1.6){
        const rd = Math.hypot(x - ripX, z - ripZ);
        const ring = ripT * 9;
        rip = Math.exp(-Math.pow(rd - ring, 2) / 1.2) * (1 - ripT/1.6) * 1.8;
        y += rip;
      }

      dummy.position.set(x, y, z);
      const s = 1 + Math.min(lift + rip, 3) * 0.32;
      dummy.scale.set(1, s, 1);
      dummy.rotation.y = y * 0.18;
      dummy.updateMatrix();
      mesh.setMatrixAt(k, dummy.matrix);

      // color: base → vermilion by height/lift
      const heat = Math.min(1, (lift + rip + Math.max(0, y)*0.25) / 2.4) * heroFade;
      if (heat < 0.5) tmpCol.copy(BASE).lerp(MID, heat * 2);
      else tmpCol.copy(MID).lerp(ACCENT, (heat - 0.5) * 2);
      mesh.setColorAt(k, tmpCol);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // gentle camera parallax + scroll lift
    camera.position.x = lerp(camera.position.x, smx * 1.3, 0.05);
    camera.position.y = lerp(camera.position.y, 7.2 + (1 - heroFade) * 5 - smy * 0.6, 0.05);
    camera.lookAt(0, -0.5 + (1 - heroFade) * 2, 0);
    rim.position.x = pointer.x * 0.6;
    rim.position.z = pointer.z * 0.6 + 2;
    rim.intensity = 18 * heroFade + 3;

    mesh.material.opacity = 1;
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(frame);

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
}
