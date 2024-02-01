import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { FC, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CameraHelper } from "./CameraHelper";
import useScreenWidth from "./hooks/useScreenWidth";

interface IProps {
  count?: number;
}

let colors = ["#e697ff", "#ff8a41", "#63b9ff", "#74ff59"];

const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.25, 32);

function Box({ z }: { z: number }) {
  // const { nodes, materials } = useGLTF("/coin.glb");

  // const { viewport, camera } = useThree();
  // const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    // x: THREE.MathUtils.randFloatSpread(2),
    x: (Math.random() - 0.5) * 10,
    // y: THREE.MathUtils.randFloatSpread(height),
    y: 6 * z * 0.8 + 0.5,
    z: (Math.random() - 0.5) * 10,
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  const coin = useRef<THREE.Group<THREE.Object3DEventMap>>(null);

  const coinMaterial = new THREE.MeshStandardMaterial({
    color: colors[Math.floor(Math.random() * colors.length)],
    metalness: 0.7,
    roughness: 0.5,
  });

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
    <RigidBody colliders="hull" mass={1} restitution={0.8} canSleep>
      {/* <group
        ref={coin}
        scale={0.1}
        position={[data.x, data.y, data.z]}
        dispose={null}
        castShadow
      >
        <mesh
          geometry={(nodes.pCylinder7_standardSurface1_0 as Mesh).geometry}
          material={materials["gold-plate"]}
          scale={[9.86, 1.458, 9.86]}
          rotation={[data.rX, data.rY, data.rZ]}
          receiveShadow
          castShadow
          // material-emissive="lightyellow"
        />
      </group> */}
      <mesh
        castShadow
        position={[data.x, data.y, data.z]}
        rotation={[data.rX, data.rY, data.rZ]}
        geometry={coinGeometry}
        material={coinMaterial}
      />
    </RigidBody>
  );
}

export const Experience: FC<IProps> = ({ count = 0 }) => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);

  const width = useScreenWidth();

  const isMobile = width && width <= 425;
  const isTablet = width && width <= 768;
  const fontSize = isMobile ? 2 : isTablet ? 4 : 6;

  const { colorGround } = useControls("FloorColor", {
    colorGround: "lightpink",
  });

  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }, []);

  //   useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      <color attach="background" args={["lightpink"]} />
      <ambientLight color={"white"} intensity={2} />
      <directionalLight
        ref={directionalLightRef}
        position={[10, 10, 10]}
        intensity={4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={35}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
      />
      <CameraHelper />
      {/* <Perf /> */}
      {/* <OrbitControls /> */}
      <Text
        color="black"
        position={[0, -0.7, 0]}
        fontSize={fontSize}
        font="./Jaini-Regular.woff"
        rotation-x={-Math.PI * 0.5}
      >
        नमस्कार्
      </Text>
      <Suspense>
        <Physics debug={false} gravity={[0, -9.08, 0]}>
          {Array.from({ length: count }, (_, i) => (
            <Box key={i} z={i} />
          ))}

          <RigidBody type="fixed" friction={4}>
            <mesh receiveShadow position-y={-1}>
              <boxGeometry args={[70, 0.5, 70]} />
              <meshStandardMaterial color={colorGround} />
            </mesh>
          </RigidBody>
        </Physics>

        {/* <Environment preset="sunset" /> */}
        {/* <EffectComposer>
          <DepthOfField
            target={[0, 0, depth / 2]}
            focalLength={0.5}
            bokehScale={11}
            height={700}
          />
        </EffectComposer> */}
      </Suspense>
    </>
  );
};
