import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
        p[i * 3] = (Math.random() - 0.5) * 10;
        p[i * 3 + 1] = (Math.random() - 0.5) * 10;
        p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#0052cc"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

function FloatingShape() {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        meshRef.current.position.y = Math.sin(t / 2) * 0.2;
        meshRef.current.rotation.x = t / 4;
        meshRef.current.rotation.y = t / 3;
    });

    return (
        <mesh ref={meshRef} position={[2, 0, -2]}>
            <torusKnotGeometry args={[0.5, 0.15, 128, 16]} />
            <meshStandardMaterial color="#0052cc" wireframe opacity={0.1} transparent />
        </mesh>
    );
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleField />
        <FloatingShape />
      </Canvas>
    </div>
  );
}
