"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { scroll } from "@/lib/scroll";

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const seg = (p: number, a: number, b: number) => {
  const t = clamp((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Bottle() {
  const root = useRef<THREE.Group>(null!);
  const body = useRef<THREE.Mesh>(null!);
  const cap = useRef<THREE.Mesh>(null!);
  const pump = useRef<THREE.Group>(null!);
  const label = useRef<THREE.Mesh>(null!);

  const bodyGeo = useMemo(() => {
    const profile = [
      [0, 0],
      [0.6, 0],
      [0.7, 0.08],
      [0.72, 0.25],
      [0.72, 1.5],
      [0.66, 1.72],
      [0.36, 1.95],
      [0.32, 2.1],
      [0, 2.1],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(profile, 64);
  }, []);

  useFrame((state) => {
    const p = scroll.p;
    const e = seg(p, 0.35, 0.55) * (1 - seg(p, 0.85, 1)); // come apart, then rebuild
    const d = seg(p, 0.55, 0.75) * (1 - seg(p, 0.85, 1)); // close-up on the label
    root.current.rotation.y = p * Math.PI * 3;
    body.current.position.y = -0.35 * e;
    cap.current.position.y = 2.22 + 0.7 * e;
    pump.current.position.y = 2.5 + 1.5 * e;
    label.current.position.x = 1.4 * e;
    state.camera.position.set(0, lerp(1.2, 1.0, d), lerp(7, 3.4, d));
    state.camera.lookAt(0, lerp(1.1, 0.9, d), 0);
  });

  return (
    <group ref={root} position={[0, -1.1, 0]}>
      <mesh ref={body} geometry={bodyGeo}>
        <meshStandardMaterial color="#F7F6F2" roughness={0.55} />
      </mesh>
      <mesh ref={label} position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.735, 0.735, 0.9, 64, 1, true]} />
        <meshStandardMaterial color="#F2B8C6" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={cap} position={[0, 2.22, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.28, 48]} />
        <meshStandardMaterial color="#4A2545" roughness={0.45} />
      </mesh>
      <group ref={pump} position={[0, 2.5, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.5, 24]} />
          <meshStandardMaterial color="#4A2545" roughness={0.45} />
        </mesh>
        <mesh position={[0.15, 0.5, 0]}>
          <boxGeometry args={[0.5, 0.14, 0.2]} />
          <meshStandardMaterial color="#4A2545" roughness={0.45} />
        </mesh>
      </group>
    </group>
  );
}

export default function Scene() {
  return (
    <div aria-hidden className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        camera={{ position: [0, 1.2, 7], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3} position={[0, 4, 5]} scale={[8, 3, 1]} />
          <Lightformer form="rect" intensity={1.5} position={[-5, 1, 2]} scale={[3, 5, 1]} />
        </Environment>
        <ambientLight intensity={0.4} />
        <Bottle />
        <ContactShadows position={[0, -1.1, 0]} opacity={0.35} scale={8} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}
