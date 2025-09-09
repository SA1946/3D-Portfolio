import { motion } from "framer-motion-3d";
import { Avata } from "./Avata";
import { Environment, Sky, useScroll } from "@react-three/drei";

import { My_room1 } from "./My_room1";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, scale, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { framerMotion } from "../config";
import { Euler, Quaternion, Vector3 } from "three";
import { MyProjects } from "./MyProjects";
import Background from "./Background";

const Experience = ({ menuOpen }) => {
  const { viewport } = useThree();
  const data = useScroll();
  const [section, setSection] = useState(0);
  const characterGroupRef = useRef();
  const characterContainerRef = useRef();
  // console.log(viewport.width, viewport.height);

  const isMobilePhone = window.innerWidth < 768;
  const responsivePhone = viewport.width / 12;
  const myRoomScaleRatio = Math.max(0.4, Math.min(0.9 * responsivePhone, 0.9));

  const cameraPositionX = useMotionValue(1); // need to initial first
  const cameraLookAtX = useMotionValue(1);

  const [characterAnimate, setCharacterAnimate] = useState("Typing");

  useEffect(() => {
    animate(cameraPositionX, menuOpen ? -5 : 0, {
      ...framerMotion,
    });
    animate(cameraLookAtX, menuOpen ? 5 : 0, {
      ...framerMotion,
    });
  }, [menuOpen]);

  useEffect(() => {
    setCharacterAnimate("Falling");
    setTimeout(() => {
      setCharacterAnimate(section === 0 ? "Typing" : "Standing");
    }, 600);
  }, [section]);

  useFrame((state) => {
    let currentInSection = Math.floor(data.scroll.current * data.pages);
    if (currentInSection > 3) currentInSection = 3;
    if (currentInSection !== section) {
      setSection(currentInSection);
    }
    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    // ----if we want to know where position and rotation is-------
    // const position = new Vector3();
    if (characterContainerRef.current) {
      if (section === 0)
        characterContainerRef.current.getWorldPosition(
          characterGroupRef.current.position
        );
    }

    // const quaternion = new Quaternion();
    // characterContainerRef.current.getWorldQuaternion(quaternion);
    // const euler = new Euler();
    // euler.setFromQuaternion(quaternion, "XYZ");
    // console.log([euler.x, euler.y, euzler.z]);
    // -------------------------------------------------------------
  });

  return (
    <>
      <Sky />
      <Environment preset="sunset" />
      <ambientLight intensity={1} />
      <Background />

      <motion.group
        // position={[0.4181266247845823, 0.738, 2.554522727852475]}

        ref={characterGroupRef}
        rotation={[-3.141592653589793, -0.7853981633974484, -3.141592653589793]}
        scale={[myRoomScaleRatio, myRoomScaleRatio, myRoomScaleRatio]}
        animate={
          section === 0
            ? {
                x: isMobilePhone ? myRoomScaleRatio + -0.9 : 0.2,
                y: isMobilePhone ? myRoomScaleRatio + -1.6 : 0.83,
                z: isMobilePhone ? myRoomScaleRatio + 2.5 : 2.65,
                scaleX: myRoomScaleRatio,
                scaleY: myRoomScaleRatio,
                scaleZ: myRoomScaleRatio,
              }
            : section === 1
              ? {
                  y: -viewport.height + 0.6,
                  x: 0.3,
                  z: 6,
                  rotateX: 0,
                  rotateY: isMobilePhone ? -Math.PI / 2 : 0,
                  rotateZ: 0,
                  scaleX: isMobilePhone ? 1.2 : 1,
                  scaleY: isMobilePhone ? 1.2 : 1,
                  scaleZ: isMobilePhone ? 1.2 : 1,
                }
              : section === 2
                ? {
                    x: isMobilePhone ? -1.6 : -2,
                    y: -viewport.height * 2,
                    z: 0,
                    rotateX: 0,
                    rotateY: Math.PI / 2,
                    rotateZ: 0,
                    scaleX: 1,
                    scaleY: 1,
                    scaleZ: 1,
                  }
                : section === 3
                  ? {
                      y: -viewport.height * 3 + 1.2,
                      x: 0.2,
                      z: 8.5,
                      rotateX: 0,
                      rotateY: -Math.PI / 4,
                      rotateZ: 0,
                      scaleX: 1,
                      scaleY: 1,
                      scaleZ: 1,
                    }
                  : {}
        }
        transition={{
          duration: 0.6,
        }}
      >
        <Avata animation={characterAnimate} rotation-x={-Math.PI / 2} />
      </motion.group>

      <motion.group
        position={[
          isMobilePhone ? 0 : 1.5 * myRoomScaleRatio,
          isMobilePhone ? -viewport.height / 6 : 2,
          3,
        ]}
        scale={[myRoomScaleRatio, myRoomScaleRatio, myRoomScaleRatio]}
        rotation-y={-Math.PI / 4}
        animate={{
          y: isMobilePhone ? -viewport.height / 6 : 0,
        }}
        transition={{
          duration: 0.8,
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

      <directionalLight position={[-5, 3, 5]} intensity={0.4} />

      <MyProjects />
    </>
  );
};

export default Experience;
