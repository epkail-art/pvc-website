"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/*
  PVC Polymer Chain — 3D visualization with double-bond animation
  
  Two modes toggled by a button:
  1. STATIC:  Full polymer chain, slow cinematic rotation, mouse parallax
  2. REACTION: Shows a single vinyl chloride monomer (CH2=CHCl) with:
               - Visible C=C double bond (two cylinders)
               - Radical attacks, π bond breaks (second cylinder fades/retracts)
               - New C–C bond forms to growing chain end
               - Loop repeats showing the propagation step
*/

// ── Geometry helpers ─────────────────────────────────────────────────────────

function cylinderBetween(
  a: THREE.Vector3,
  b: THREE.Vector3,
  r: number,
  mat: THREE.Material
): THREE.Mesh {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const geo = new THREE.CylinderGeometry(r, r, len, 12, 1);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.copy(a).lerp(b, 0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return mesh;
}

function sphere(r: number, mat: THREE.Material): THREE.Mesh {
  return new THREE.Mesh(new THREE.SphereGeometry(r, 32, 32), mat);
}

// ── Materials ────────────────────────────────────────────────────────────────
function makeMaterials() {
  return {
    C: new THREE.MeshStandardMaterial({ color: 0xdde4ee, roughness: 0.28, metalness: 0.08 }),
    Cl: new THREE.MeshStandardMaterial({
      color: 0x0f9d8a, roughness: 0.18, metalness: 0.12,
      emissive: 0x065f55, emissiveIntensity: 0.35,
    }),
    H: new THREE.MeshStandardMaterial({ color: 0x9fb4c0, roughness: 0.65 }),
    bond: new THREE.MeshStandardMaterial({ color: 0x6e849a, roughness: 0.48 }),
    bondH: new THREE.MeshStandardMaterial({ color: 0x8fa0ad, roughness: 0.65 }),
    // π bond (second bond in double bond) — distinct colour
    piBond: new THREE.MeshStandardMaterial({
      color: 0xfbbf24, roughness: 0.3, metalness: 0.05,
      emissive: 0x92400e, emissiveIntensity: 0.25,
      transparent: true, opacity: 1.0,
    }),
    // Radical dot — red glow
    radical: new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b, emissiveIntensity: 0.9,
      transparent: true, opacity: 0,
    }),
  };
}

// ── Build static polymer chain ───────────────────────────────────────────────
function buildChain(mats: ReturnType<typeof makeMaterials>): THREE.Group {
  const group = new THREE.Group();
  const N = 8;
  const SPACING = 1.54;
  const ZIG = 0.62, ZAG = 0.25;

  const cPos: THREE.Vector3[] = Array.from({ length: N }, (_, i) =>
    new THREE.Vector3(
      (i - (N - 1) / 2) * SPACING,
      i % 2 === 0 ? ZIG : -ZIG,
      i % 4 < 2 ? ZAG : -ZAG,
    )
  );

  const BOND_R = 0.085;
  const CL_LEN = (1.77 / 1.54) * SPACING;
  const H_LEN  = (1.09 / 1.54) * SPACING;

  for (let i = 0; i < N; i++) {
    const pos = cPos[i];
    const isCHCl = i % 2 === 1;

    const prev = i > 0 ? cPos[i - 1] : null;
    const next = i < N - 1 ? cPos[i + 1] : null;
    const tangent = new THREE.Vector3();
    if (prev && next)  tangent.subVectors(next, prev).normalize();
    else if (next)     tangent.subVectors(next, pos).normalize();
    else               tangent.subVectors(pos, prev!).normalize();

    const right = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
    const up    = new THREE.Vector3().crossVectors(right, tangent).normalize();
    const flip  = i % 2 === 0 ? 1 : -1;

    const sub1 = new THREE.Vector3()
      .addScaledVector(up,      flip * 0.82)
      .addScaledVector(right,          0.20)
      .addScaledVector(tangent,       -0.12)
      .normalize();
    const sub2 = new THREE.Vector3()
      .addScaledVector(up,    -flip * 0.70)
      .addScaledVector(right,         -0.20)
      .addScaledVector(tangent,        0.10)
      .normalize();
    const sub3 = new THREE.Vector3()
      .addScaledVector(up,    -flip * 0.60)
      .addScaledVector(right,          0.45)
      .addScaledVector(tangent,       -0.18)
      .normalize();

    if (isCHCl) {
      const clPos = pos.clone().addScaledVector(sub1, CL_LEN);
      const cl = sphere(0.58, mats.Cl); cl.position.copy(clPos); group.add(cl);
      group.add(cylinderBetween(pos, clPos, BOND_R * 1.15, mats.bond));
      const hPos = pos.clone().addScaledVector(sub2, H_LEN);
      const h = sphere(0.26, mats.H); h.position.copy(hPos); group.add(h);
      group.add(cylinderBetween(pos, hPos, BOND_R * 0.72, mats.bondH));
    } else {
      const h1Pos = pos.clone().addScaledVector(sub1, H_LEN);
      const h1 = sphere(0.26, mats.H); h1.position.copy(h1Pos); group.add(h1);
      group.add(cylinderBetween(pos, h1Pos, BOND_R * 0.72, mats.bondH));
      const h2Pos = pos.clone().addScaledVector(sub3, H_LEN);
      const h2 = sphere(0.26, mats.H); h2.position.copy(h2Pos); group.add(h2);
      group.add(cylinderBetween(pos, h2Pos, BOND_R * 0.72, mats.bondH));
    }

    const c = sphere(0.42, mats.C); c.position.copy(pos); group.add(c);
    if (i > 0) group.add(cylinderBetween(cPos[i - 1], pos, BOND_R, mats.bond));
  }
  return group;
}

// ── Build VCM monomer (CH2=CHCl) for reaction scene ─────────────────────────
interface ReactionObjects {
  monomer: THREE.Group;
  piBond: THREE.Mesh;       // the π bond cylinder — will fade
  radical: THREE.Mesh;      // radical dot on chain end
  chainStub: THREE.Group;   // partial chain end
  newBond: THREE.Mesh;      // the forming C–C bond
}

function buildReactionScene(mats: ReturnType<typeof makeMaterials>): ReactionObjects {
  const monomer = new THREE.Group();
  const BOND_R = 0.085;
  const H_LEN = 0.74; // 1.09 Å scaled

  // VCM: C1(CH2=) at -0.77, C2(=CHCl) at +0.77 (double bond between them)
  const c1Pos = new THREE.Vector3(-0.77, 0, 0);
  const c2Pos = new THREE.Vector3( 0.77, 0, 0);

  // σ bond (always present)
  monomer.add(cylinderBetween(c1Pos, c2Pos, BOND_R, mats.bond));

  // π bond — offset slightly, amber colour — this is what breaks
  const piOffset = new THREE.Vector3(0, 0.22, 0);
  const piMat = mats.piBond.clone(); // own instance so we can animate opacity
  const piBondMesh = cylinderBetween(
    c1Pos.clone().add(piOffset),
    c2Pos.clone().add(piOffset),
    BOND_R * 0.75, piMat
  );
  monomer.add(piBondMesh);

  // C1: 2×H (CH2=)
  const h1 = sphere(0.26, mats.H); h1.position.set(-0.77, 0, -H_LEN); monomer.add(h1);
  monomer.add(cylinderBetween(c1Pos, h1.position, BOND_R * 0.7, mats.bondH));
  const h2 = sphere(0.26, mats.H); h2.position.set(-0.77 - H_LEN * 0.8, 0.4, 0.0); monomer.add(h2);
  monomer.add(cylinderBetween(c1Pos, h2.position, BOND_R * 0.7, mats.bondH));

  // C2: 1×Cl above, 1×H below (CHCl=)
  const cl = sphere(0.58, mats.Cl); cl.position.set(0.77, 1.15, 0.25); monomer.add(cl);
  monomer.add(cylinderBetween(c2Pos, cl.position, BOND_R * 1.15, mats.bond));
  const h3 = sphere(0.26, mats.H); h3.position.set(0.77, -H_LEN, -0.3); monomer.add(h3);
  monomer.add(cylinderBetween(c2Pos, h3.position, BOND_R * 0.7, mats.bondH));

  // Carbon spheres (on top)
  const cA = sphere(0.42, mats.C); cA.position.copy(c1Pos); monomer.add(cA);
  const cB = sphere(0.42, mats.C); cB.position.copy(c2Pos); monomer.add(cB);

  // Chain stub — represents the growing chain end coming from left
  const chainStub = new THREE.Group();
  // 3 carbons trailing off to the left
  const stubPositions = [
    new THREE.Vector3(-4.5, -0.6, 0),
    new THREE.Vector3(-3.5,  0.6, 0),
    new THREE.Vector3(-2.5, -0.3, 0),
  ];
  stubPositions.forEach((p, i) => {
    const c = sphere(0.42, mats.C); c.position.copy(p); chainStub.add(c);
    if (i > 0) chainStub.add(cylinderBetween(stubPositions[i-1], p, BOND_R, mats.bond));
    // H substituents
    const hUp = sphere(0.26, mats.H);
    hUp.position.set(p.x, p.y + 0.75, p.z + 0.3);
    chainStub.add(hUp);
    chainStub.add(cylinderBetween(p, hUp.position, BOND_R * 0.7, mats.bondH));
    if (i % 2 === 1) {
      const clS = sphere(0.52, mats.Cl);
      clS.position.set(p.x, p.y - 0.9, p.z - 0.2);
      chainStub.add(clS);
      chainStub.add(cylinderBetween(p, clS.position, BOND_R, mats.bond));
    }
  });

  // Radical dot on chain end (last stub carbon)
  const radDot = sphere(0.20, mats.radical.clone());
  radDot.position.set(-1.5, 0.0, 0.4);
  chainStub.add(radDot);

  // The new C–C bond being formed (starts at length 0, grows to full)
  // from chain end (-1.5, 0, 0) to monomer C1 (-0.77, 0, 0)
  const newBondMat = new THREE.MeshStandardMaterial({
    color: 0x34d399, emissive: 0x065f46, emissiveIntensity: 0.5,
    transparent: true, opacity: 0,
  });
  const newBondMesh = cylinderBetween(
    new THREE.Vector3(-1.5, 0, 0.4),
    new THREE.Vector3(-0.77, 0, 0),
    BOND_R * 1.2,
    newBondMat
  );

  return { monomer, piBond: piBondMesh, radical: radDot, chainStub, newBond: newBondMesh };
}

// ── Lighting ─────────────────────────────────────────────────────────────────
function addLights(scene: THREE.Scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.50));
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(8, 12, 8);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x5eead4, 1.0);
  fill.position.set(-8, 3, 5);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x93c5fd, 0.55);
  rim.position.set(0, -5, -10);
  scene.add(rim);
  const clLight = new THREE.PointLight(0x0d9488, 1.2, 10);
  clLight.position.set(0, 3, 0);
  scene.add(clLight);
  return clLight;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Polymer3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"chain" | "reaction">("chain");
  const modeRef = useRef<"chain" | "reaction">("chain");
  const cleanupRef = useRef<(() => void) | null>(null);

  // Toggle mode
  const toggleMode = () => {
    const next = modeRef.current === "chain" ? "reaction" : "chain";
    modeRef.current = next;
    setMode(next);
  };

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Cleanup previous scene if any
    if (cleanupRef.current) cleanupRef.current();

    const W = el.clientWidth || 800;
    const H = el.clientHeight || 480;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);

    const mats = makeMaterials();
    const clLight = addLights(scene);

    let animId: number;
    let mx = 0, my = 0, tx = 0, ty = 0;

    const onMouse = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      my = -((e.clientY - r.top)  / r.height - 0.5) * 2;
    };
    el.addEventListener("mousemove", onMouse);

    // ── MODE: chain ──────────────────────────────────────────────────────────
    if (modeRef.current === "chain") {
      camera.position.set(0, 2.2, 15);
      camera.lookAt(0, 0, 0);

      const group = buildChain(mats);
      scene.add(group);

      const clock = new THREE.Clock();
      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        tx += (mx - tx) * 0.035;
        ty += (my - ty) * 0.035;
        group.rotation.y = t * 0.20 + tx * 0.45;
        group.rotation.x = Math.sin(t * 0.30) * 0.07 + ty * 0.22;
        group.rotation.z = Math.sin(t * 0.23) * 0.025;
        clLight.position.x = Math.sin(t * 0.20) * 3;
        clLight.position.z = Math.cos(t * 0.20) * 3;
        renderer.render(scene, camera);
      }
      animate();

    // ── MODE: reaction ───────────────────────────────────────────────────────
    } else {
      camera.position.set(0, 1.5, 10);
      camera.lookAt(-0.5, 0, 0);

      const { monomer, piBond, radical, chainStub, newBond } = buildReactionScene(mats);
      const reactionGroup = new THREE.Group();
      reactionGroup.add(monomer, chainStub, newBond);
      scene.add(reactionGroup);

      // Animation phases (each phase is a fraction of total cycle)
      // Total cycle: 4s
      // 0.0–0.3  : monomer drifts in from right, π bond visible (amber glow)
      // 0.3–0.5  : radical (red dot) appears and pulses, approaches C1
      // 0.5–0.7  : π bond fades out (breaks), new C–C bond forms (green glow)
      // 0.7–1.0  : chain advances left, new unit absorbed, reset
      const CYCLE = 5.0; // seconds per propagation cycle
      const clock = new THREE.Clock();

      // Get pi bond material
      const piBondMat = (piBond.material as THREE.MeshStandardMaterial);
      const newBondMat = (newBond.material as THREE.MeshStandardMaterial);
      const radMat     = (radical.material as THREE.MeshStandardMaterial);

      // Initial monomer position (start far right, drift left)
      monomer.position.set(4, 0, 0);

      const animate = () => {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const phase = (t % CYCLE) / CYCLE; // 0 → 1 over one cycle

        // ── Phase 0–0.35: monomer drifts in, π bond glowing ──
        if (phase < 0.35) {
          const p = phase / 0.35;
          // monomer slides from x=4 to x=0.5
          monomer.position.x = 4 - p * 3.5;
          // gentle bob
          monomer.position.y = Math.sin(t * 1.5) * 0.08;
          // π bond fully visible
          piBondMat.opacity = 1.0;
          piBondMat.emissiveIntensity = 0.25 + Math.sin(t * 3) * 0.15;
          // radical invisible
          radMat.opacity = 0;
          // new bond invisible
          newBondMat.opacity = 0;
        }
        // ── Phase 0.35–0.55: radical pulses, approaches C1 ──
        else if (phase < 0.55) {
          const p = (phase - 0.35) / 0.20;
          monomer.position.x = 0.5 - p * 0.3; // slight drift
          monomer.position.y = Math.sin(t * 2) * 0.04;
          // radical appears and pulses
          radMat.opacity = Math.min(1, p * 3) * (0.6 + Math.sin(t * 8) * 0.4);
          // π bond starts flickering (about to break)
          piBondMat.opacity = 1.0 - p * 0.5;
          piBondMat.emissiveIntensity = 0.8 + Math.sin(t * 12) * 0.5;
          newBondMat.opacity = 0;
        }
        // ── Phase 0.55–0.75: π bond breaks, new C–C bond forms ──
        else if (phase < 0.75) {
          const p = (phase - 0.55) / 0.20;
          // π bond fades to zero
          piBondMat.opacity = Math.max(0, (1 - p) * 0.5);
          piBondMat.emissiveIntensity = 0;
          // new bond forms (green, fades in)
          newBondMat.opacity = p;
          newBondMat.emissiveIntensity = 0.5 * p;
          // radical fades
          radMat.opacity = Math.max(0, 1 - p * 2);
        }
        // ── Phase 0.75–1.0: chain absorbs monomer, fade out, reset ──
        else {
          const p = (phase - 0.75) / 0.25;
          // slide whole scene left
          monomer.position.x = 0.2 - p * 5;
          // everything fades
          piBondMat.opacity = 0;
          newBondMat.opacity = Math.max(0, 1 - p * 2);
          radMat.opacity = 0;
          // reset for next cycle (handled by phase wrapping to 0)
          if (phase > 0.98) {
            monomer.position.set(4, 0, 0);
          }
        }

        // Slow group tilt + mouse parallax
        tx += (mx - tx) * 0.03;
        ty += (my - ty) * 0.03;
        reactionGroup.rotation.y = tx * 0.4 + Math.sin(t * 0.15) * 0.06;
        reactionGroup.rotation.x = ty * 0.2 + Math.sin(t * 0.20) * 0.04;

        clLight.position.x = Math.sin(t * 0.4) * 2;
        renderer.render(scene, camera);
      }
      animate();
    }

    // ── Resize ──────────────────────────────────────────────────────────────
    const onResize = () => {
      const nW = el.clientWidth, nH = el.clientHeight;
      camera.aspect = nW / nH; camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };
    window.addEventListener("resize", onResize);

    const cleanup = () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("mousemove", onMouse);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
    cleanupRef.current = cleanup;
    return cleanup;
  }, [mode]); // re-run when mode changes

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div
        ref={mountRef}
        className="w-full h-[500px] cursor-grab active:cursor-grabbing select-none"
        style={{ background: "radial-gradient(ellipse at 35% 40%, #071e1a 0%, #060d1a 60%, #030812 100%)" }}
      />

      {/* Top label */}
      <div className="absolute top-4 left-5 font-mono text-[0.6rem] text-teal-400/60 uppercase tracking-[0.15em]">
        {mode === "chain"
          ? "–[CH₂–CHCl]ₙ– · Hover to rotate"
          : "Propagation step · C=C π bond breaking"
        }
      </div>

      {/* Mode toggle button */}
      <button
        onClick={toggleMode}
        className="absolute top-4 right-5 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-600/60 bg-slate-800/80 backdrop-blur-sm text-slate-300 text-[0.68rem] font-mono hover:border-teal-500/60 hover:text-teal-300 transition-all"
      >
        {mode === "chain" ? (
          <>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Watch Reaction →
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            ← View Full Chain
          </>
        )}
      </button>

      {/* Legend */}
      <div className="absolute bottom-4 left-5 flex gap-5">
        {[
          { dot: "bg-teal-500 shadow-[0_0_8px_rgba(13,148,136,0.8)]", label: "Cl" },
          { dot: "bg-slate-300",  label: "C" },
          { dot: "bg-slate-500",  label: "H" },
          ...(mode === "reaction" ? [
            { dot: "bg-amber-400 animate-pulse", label: "π bond" },
            { dot: "bg-emerald-400",             label: "new σ bond" },
          ] : []),
        ].map(x => (
          <div key={x.label} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${x.dot}`} />
            <span className="font-mono text-[0.58rem] text-slate-400">{x.label}</span>
          </div>
        ))}
      </div>

      {/* Bond data callout — chain mode only */}
      {mode === "chain" && (
        <div className="absolute bottom-4 right-5 font-mono text-[0.58rem] text-slate-500 text-right leading-relaxed">
          <div className="text-slate-400">sp³ hybridisation</div>
          <div>∠C–C–C = 109.5°</div>
          <div>C–Cl = 1.77 Å</div>
          <div>C–H = 1.09 Å</div>
        </div>
      )}

      {/* Reaction phase labels */}
      {mode === "reaction" && (
        <div className="absolute bottom-4 right-5 text-right">
          <div className="font-mono text-[0.58rem] text-amber-400/70">
            C=C π bond (amber) → breaks
          </div>
          <div className="font-mono text-[0.58rem] text-emerald-400/70">
            new C–C σ bond (green) → forms
          </div>
          <div className="font-mono text-[0.58rem] text-red-400/60 mt-0.5">
            radical (red) → attacks π bond
          </div>
        </div>
      )}
    </div>
  );
}
