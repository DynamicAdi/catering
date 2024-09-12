import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import Home from "../pages/Home";
import Selection from "../ui/select/index";
import CameraAnimation from "./AnimatedCam";
import { Simple } from "./Simple";

function Render() {

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas>
        <ScrollControls pages={2} damping={1} style={{scrollbarWidth: 'none'}}>
          <CameraAnimation />
          <Simple />
          <Scroll html>
            <div style={{ width: "100vw", height: "100vh" }}>
              <Home />
            </div>

            <div style={{ width: "100vw", position: "relative" }}>
              <Selection />
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default Render;

