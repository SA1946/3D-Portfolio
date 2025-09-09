import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { BackSide, Color } from "three";

const Background = () => {
  const material = useRef();
  const color = useRef({
    color: "#b9bcff",
  });

  const data = useScroll();
  const timeLine = useRef();

  useFrame(() => {
    timeLine.current.progress(data.scroll.current);
    material.current.color = new Color(color.current.color);
  });
  useEffect(() => {
    timeLine.current = gsap.timeline();
    timeLine.current.to(color.current, {
      color: "#212121",
    });
    timeLine.current.to(color.current, {
      color: "#7a7ca5",
    });
    timeLine.current.to(color.current, {
      color: "#9b96dd",
    });
  }, []);

  return (
    <group>
      <Sphere scale={[30, 30, 30]}>
        <meshBasicMaterial ref={material} side={BackSide} toneMapped={false} />
      </Sphere>
    </group>
  );
};

export default Background;
