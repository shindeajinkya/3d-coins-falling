import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
// import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Mesh } from "three";
// import { Perf } from "r3f-perf";
import { Physics, RigidBody } from "@react-three/rapier";

function Box({ z }: { z: number }) {
  const { nodes, materials } = useGLTF("/coin.glb");

  // const { viewport, camera } = useThree();
  // const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    // x: THREE.MathUtils.randFloatSpread(2),
    x: (Math.random() - 0.5) * 20,
    // y: THREE.MathUtils.randFloatSpread(height),
    y: 6 * z * 0.1,
    z: (Math.random() - 0.5) * 20,
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  const coin = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  useFrame(() => {
    if (coin.current) {
      // coin.current.position.set(data.x * width, (data.y -= 0.04), z / 2);
      // coin.current.rotation.set(
      //   (data.rX += 0.02),
      //   (data.rY += 0.001),
      //   (data.rZ += 0.001)
      // );
      // if (data.y < -height / 1.5) {
      //   data.y = height / 1.5;
      // }
    }
  });

  return (
    <RigidBody colliders="hull" friction={0.9} mass={0.5} restitution={0.8}>
      <group
        ref={coin}
        scale={0.1}
        position={[data.x, data.y, data.z]}
        dispose={null}
      >
        <mesh
          geometry={(nodes.pCylinder7_standardSurface1_0 as Mesh).geometry}
          material={materials["gold-plate"]}
          scale={[9.86, 1.458, 9.86]}
          rotation={[Math.PI * 0.5, 0, 0]}
          // material-emissive="lightyellow"
        />
      </group>
    </RigidBody>
  );
}

function App({ count = 150 }) {
  // const [count, setCount] = useState(0);

  return (
    <Canvas
      gl={{ alpha: false }}
      camera={{ near: 0.01, far: 110, fov: 75, position: [0, 0, 25] }}
    >
      <color attach="background" args={["black"]} />
      {/* <ambientLight intensity={0.2} /> */}
      {/* <spotLight position={[10, 10, 10]} /> */}
      {/* <Perf position="top-left" /> */}
      <OrbitControls />
      <Suspense>
        <Physics debug={false} gravity={[0, -9.08, 0]}>
          {Array.from({ length: count }, (_, i) => (
            <Box
              key={i}
              // z={-(i / count) * 80 - 40}
              z={i}
              // z={0}
            />
          ))}

          <RigidBody type="fixed" friction={3}>
            <mesh receiveShadow position-y={-4}>
              <boxGeometry args={[20, 0.5, 20]} />
            </mesh>
          </RigidBody>
        </Physics>

        <Environment preset="sunset" />
        {/* <EffectComposer>
          <DepthOfField
            target={[0, 0, depth / 2]}
            focalLength={0.5}
            bokehScale={11}
            height={700}
          />
        </EffectComposer> */}
      </Suspense>
    </Canvas>
  );
}

export default App;
