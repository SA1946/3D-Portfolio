import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "synsa_store",
    url: "https://synsa-store.vercel.app/",
    image: "projects/synsa_store.webp",
    description:
      "A modern tech store SPA built with React, React Router DOM, and Tailwind CSS. Features responsive",
  },
  {
    title: "portfolio_v1.0",
    url: "https://portfolio-v10-woad.vercel.app/",
    image: "projects/retro_portfolio.webp",
    description:
      "I created a fun and unique portfolio website that looks like an old-school computer terminal.",
  },
  {
    title: "Accessories-Store",
    url: "https://sa1946.github.io/Accessories-Store-with-Bootstrap/",
    image: "projects/accessories_store.webp",
    description:
      "This repository contains a Bootstrap and Basic JavaScript project that replicates an accessories store website.",
  },
  {
    title: "test-english",
    url: "https://sa1946.github.io/test-english/",
    image: "projects/clone-test_english.webp",
    description:
      "This repository contains a clone of the Test English website, created using Bootstrap and basic JavaScript.",
  },
  {
    title: "Object_Detection",
    url: "https://github.com/SA1946/Object_Detection",
    image: "projects/obj_detection.webp",
    description:
      "This project is object detection using YOLOv8. The system can detect and classify multiple objects from camera, images and videos.",
  },
];

const Project = ({ project, highlight }) => {
  const { title, url, image, description } = project;
  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlight ? 0.7 : 0.4);
  }, [highlight]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group>
      <mesh
        ref={background}
        position-z={-0.001}
        onClick={() => window.open(url, "_blank")}
      >
        <planeGeometry args={[2.3, 2.3]} />
        <meshBasicMaterial color="black" transparent opacity={0.7} />
      </mesh>
      <Image
        scale={[2.2, 1.2, 1]}
        url={image}
        toneMapped={false}
        position-y={0.4}
        renderOrder={1}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.25, 0]}
        // letterSpacing={0.02}
        lineHeight={1}
        renderOrder={2}
      >
        {" "}
        {title.toUpperCase()}{" "}
      </Text>
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.11}
        position={[-1, -0.5, 0]}
        renderOrder={2}
      >
        {" "}
        {description}{" "}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const MyProjects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => [
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, 0]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : 1,
            z: currentProject === index ? -0.1 : -1,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlight={index === currentProject} />
        </motion.group>,
      ])}
    </group>
  );
};
