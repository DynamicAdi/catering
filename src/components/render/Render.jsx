import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import Home from "../pages/Home";
import Selection from "../ui/select/index";
import CameraAnimation from "./AnimatedCam";
import { Simple } from "./Simple";

function Render({backend}) {

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas>
          <Simple />
      </Canvas>
    </div>
  );
}

export default Render;

