import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function SpinningBox(props) {
  return (
    <mesh {...props} rotation={[0.4, 0.6, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
    </mesh>
  );
}

export default function R3FCheck() {
  return (
    <div style={{ height: 300, borderRadius: 12, overflow: "hidden" }}>
      <Canvas camera={{ position: [2.5, 2, 2.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 4, 2]} intensity={0.9} />
        <SpinningBox />
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
}
