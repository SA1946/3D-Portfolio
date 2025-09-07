import { useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";

import Experience from "./components/Experience";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface";
import ScrollManager from "./components/ScrollManager";
import Menu from "./components/Menu";
import { MotionConfig } from "framer-motion";
import { framerMotion } from "./config";
import Cursor from "./components/Cursor";

function App() {
  const [section, setSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [section]);
  return (
    <div className=" h-screen w-screen bg-gray-800 ">
      <MotionConfig
        transition={{
          ...framerMotion,
        }}
      >
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}>
          <ScrollControls pages={4} damping={0.1} args={["#ececec"]}>
            <ScrollManager section={section} onSectionChange={setSection} />
            <Scroll>
              <Experience section={section} menuOpen={menuOpen} />
            </Scroll>
            <Scroll html>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu
          onSectionChange={setSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <Cursor />
      </MotionConfig>
    </div>
  );
}

export default App;
