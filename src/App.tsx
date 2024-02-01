import { Canvas } from "@react-three/fiber";
// import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
// import { Perf } from "r3f-perf";
import { Leva } from "leva";
import { Experience } from "./Experience";

function App({ count = 10 }) {
  return (
    <>
      <Leva collapsed hidden />
      <Canvas
        gl={{ alpha: false }}
        shadows={true}
        camera={{
          near: 0.01,
          far: 110,
          fov: 75,
          // position: [position.x, position.y, position.z],
        }}
      >
        <Experience count={count} />
      </Canvas>
    </>
  );
}

export default App;
