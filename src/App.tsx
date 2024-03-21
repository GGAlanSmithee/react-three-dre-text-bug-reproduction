import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Scene } from "./components/Scene";

const App = () => {
  return (
    <main className="w-screen h-screen relative flex justify-center items-center">
      <Canvas
        className="cursor-crosshair"
        style={{ background: "#222" }}
        shadows
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>

        <directionalLight
          color="#FFE"
          position={[0, 5, 0]}
          intensity={1}
          castShadow
          shadow-mapSize-width={8192}
          shadow-mapSize-height={8192}
          shadow-camera-near={0.1}
          shadow-camera-far={10}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />

        <Environment preset="sunset" />

        <OrbitControls enableRotate={false} />
      </Canvas>
    </main>
  );
};

export default App;
