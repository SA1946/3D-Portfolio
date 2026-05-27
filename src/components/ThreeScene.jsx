/**
 * ThreeScene.jsx
 *
 * Encapsulates ALL Three.js/Canvas code so that React.lazy in App.jsx
 * can split the entire 3D stack (~10 MB of vendor JS) into a separate
 * chunk. This means the browser only downloads Three.js AFTER the initial
 * HTML paints, dramatically improving First Contentful Paint (FCP).
 */
import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import Experience from "./Experience";
import Interface from "./Interface";
import ScrollManager from "./ScrollManager";
import Menu from "./Menu";
import { MotionConfig } from "framer-motion";
import { framerMotion } from "../config";
import Cursor from "./Cursor";
import Loading from "./Loading";

function ThreeScene() {
  const [section, setSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [section]);

  return (
    <>
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
            </Scroll>
            <Scroll html>
              {isLoaded && <Interface setSection={setSection} />}
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
    </>
  );
}

export default ThreeScene;
