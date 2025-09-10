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
import { Leva } from "leva";
import Loading from "./components/Loading";
import { Suspense } from "react";

function App() {
  const [section, setSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [section]);

  return (
    <div className=" h-screen w-screen  ">
      <Loading isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
      <MotionConfig
        transition={{
          ...framerMotion,
        }}
      >
        <Canvas shadows camera={{ position: [0, 3, 10], fov: 50 }}>
          <ScrollControls pages={4} damping={0.1} args={["#ececec"]}>
            <ScrollManager
              section={section}
              onSectionChange={setSection}
              menuOpen={menuOpen}
            />
            <Scroll>
              <Suspense>
                {isLoaded && (
                  <Experience section={section} menuOpen={menuOpen} />
                )}
              </Suspense>
              {/* <Experience section={section} menuOpen={menuOpen} /> */}
            </Scroll>
            <Scroll html>
              {isLoaded && <Interface setSection={setSection} />}
            </Scroll>
            {/* <Scroll html>
              <Interface setSection={setSection} />
            </Scroll> */}
          </ScrollControls>
        </Canvas>
        <Menu
          onSectionChange={setSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <Cursor />
      </MotionConfig>
      <Leva hidden />
    </div>
  );
}

export default App;
