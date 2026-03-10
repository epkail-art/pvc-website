"use client";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// One atom sphere
function Atom({
  position,
  color,
  radius = 0.35,
  emissive,
}: {
  position: [number, number, number];
  color: string;
  radius?: number;
  emissive?: string;
}) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? color}
        emissiveIntensity={0.15}
        roughness={0.35}
        metalness={0.1}
      />
    </mesh>
  );
}

// Bond cylinder between two points
function Bond({
  from,
  to,
  color = "#94a3b8",
  radius = 0.09,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
  radius?: number;
}) {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const len = a.distanceTo(b);
  const dir = new THREE.Vector3().subVectors(b, a).normalize();
  const q = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir
  );
  return (
    <mesh position={[mid.x, mid.y, mid.z]} quaternion={q}>
      <cylinderGeometry args={[radius, radius, len, 12]} />
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

// The full rotating PVC chain
function PVCMolecule() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state: unknown, delta: number) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.0004) * 0.12;
    }
  });

  // 8 backbone carbons in zigzag
  const n = 8;
  const carbons: [number, number, number][] = Array.from({ length: n }, (_, i) => [
    (i - (n - 1) / 2) * 1.3,
    i % 2 === 0 ? 0.4 : -0.4,
    0,
  ]);

  return (
    <group ref={groupRef}>
      {/* Backbone bonds */}
      {carbons.map((c, i) => {
        if (i === 0) return null;
        return <Bond key={`bb-${i}`} from={carbons[i - 1]} to={c} color="#94a3b8" radius={0.08} />;
      })}

      {/* Atoms + substituents */}
      {carbons.map((c, i) => {
        const isCHCl = i % 2 === 1;
        // Cl pendant: alternate above/below for atactic feel
        const clDir = i % 4 < 2 ? 1 : -1;
        const clPos: [number, number, number] = [c[0], c[1] + clDir * 1.0, c[2] + 0.4];
        // H on opposite side
        const hPos: [number, number, number] = [c[0], c[1] - clDir * 0.75, c[2] - 0.35];
        // Second H on CH2 carbons
        const h2Pos: [number, number, number] = [c[0], c[1] + 0.7, c[2] - 0.4];

        return (
          <group key={`unit-${i}`}>
            {/* Carbon */}
            <Atom position={c} color="#475569" radius={0.32} emissive="#334155" />

            {/* Cl or H pendant */}
            {isCHCl ? (
              <>
                <Bond from={c} to={clPos} color="#5eead4" radius={0.07} />
                <Atom position={clPos} color="#0d9488" radius={0.42} emissive="#0f766e" />
              </>
            ) : (
              <>
                <Bond from={c} to={h2Pos} color="#e2e8f0" radius={0.05} />
                <Atom position={h2Pos} color="#e2e8f0" radius={0.2} emissive="#cbd5e1" />
              </>
            )}

            {/* H on all carbons */}
            <Bond from={c} to={hPos} color="#e2e8f0" radius={0.05} />
            <Atom position={hPos} color="#e2e8f0" radius={0.2} emissive="#cbd5e1" />
          </group>
        );
      })}
    </group>
  );
}

export default function Polymer3D() {
  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
      {/* Label */}
      <div className="absolute top-3 left-4 z-10 font-mono text-[0.65rem] text-teal-400/70 uppercase tracking-widest">
        3D Polymer Chain · Drag to rotate · Scroll to zoom
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-4 z-10 flex gap-4">
        {[
          { color: "bg-teal-500", label: "Cl" },
          { color: "bg-slate-500", label: "C" },
          { color: "bg-slate-200", label: "H" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-full ${l.color}`} />
            <span className="font-mono text-[0.6rem] text-slate-400">{l.label}</span>
          </div>
        ))}
      </div>

      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm font-mono">
          Loading 3D viewer…
        </div>
      }>
        <Canvas
          camera={{ position: [0, 2, 10], fov: 50 }}
          shadows
          gl={{ antialias: true, alpha: false }}
          style={{ background: "transparent" }}
        >
          <color attach="background" args={["#020617"]} />
          <fog attach="fog" args={["#020617", 18, 30]} />

          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow />
          <pointLight position={[-4, 2, 3]} color="#0d9488" intensity={2} />
          <pointLight position={[4, -2, -3]} color="#6366f1" intensity={0.8} />

          <PVCMolecule />
          <OrbitControls
            enablePan={false}
            minDistance={6}
            maxDistance={18}
            autoRotate={false}
          />
        </Canvas>
      </Suspense>
    </div>
  );
}
