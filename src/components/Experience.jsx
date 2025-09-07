import { motion } from "framer-motion-3d";
import { Avata } from "./Avata";
import { Environment, Sky } from "@react-three/drei";
import { My_room } from "./My_room";
import { My_room1 } from "./My_room1";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { framerMotion } from "../config";

const Experience = ({ section, menuOpen }) => {
  const { viewport } = useThree();

  const cameraPositionX = useMotionValue(0);  // need to initial first
  const cameraLookAtX = useMotionValue(0);

  useEffect(() => {
    animate(cameraPositionX, menuOpen ? -5 : 0, {
      ...framerMotion,
    });
    animate(cameraLookAtX, menuOpen ? 5 : 0, {
      ...framerMotion,
    });
  }, [menuOpen]);

  useFrame((state) => {
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);
  });

  return (
    <>
      <Sky />
      <Environment preset="sunset" />
      <ambientLight intensity={1} />

      <motion.group
        position={[1.5, 2, 3]}
        scale={[0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: section === 0 ? 0 : -1,
        }}
      >
        {/* <ContactShadows
          opacity={0.4}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
          /> */}
        {/* <My_room /> */}
        <My_room1 section={section} />
      </motion.group>

      {/* --------My room and me-------- */}
      <motion.group
        position={[0, -1.5, 0]}
        animate={{
          z: section === 1 ? 0 : -10,
          y: section === 1 ? -viewport.height : -1.5,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />
        <group scale={[2.5, 2.5, 2.5]} position-y={-1.5}>
          <Avata Animation={section === 0 ? "Falling" : "Standing"} />
        </group>
      </motion.group>
    </>
  );
};

export default Experience;
