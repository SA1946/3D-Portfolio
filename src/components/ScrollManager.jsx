import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const ScrollManager = ({ section, onSectionChange }) => {
  const data = useScroll();
  const scrollRef = useRef(0);
  const isAnimation = useRef(false);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => (isAnimation.current = true),
      onComplete: () => (isAnimation.current = false),
    });
  }, [section]);

  useFrame(() => {
    if (isAnimation.current) {
      scrollRef.current = data.scroll.current;
      return;
    }
    const currentInSection = Math.floor(data.scroll.current * data.pages);
    if (data.scroll.current > scrollRef.current && currentInSection === 0) {
      onSectionChange(1);
    }
    if (
      data.scroll.current < scrollRef.current &&
      data.scroll.current < 1 / (data.pages - 1)
    ) {
      onSectionChange(0);
    }
    scrollRef.current = data.scroll.current;
  });

  return null;
};

export default ScrollManager;


