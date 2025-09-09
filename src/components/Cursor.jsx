import { useEffect, useRef, useState } from "react";

let mouseX = -10;
let mouseY = -10;
let outlineX = 0;
let outlineY = 0;
const Cursor = () => {
  const cursorOutline = useRef();
  const [hoverBtn, setMoveBtn] = useState(false);

  const animate = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;

    outlineX += distX * 0.08;
    outlineY += distY * 0.08;

    cursorOutline.current.style.left = `${outlineX}px`;
    cursorOutline.current.style.top = `${outlineY}px`;
    requestAnimationFrame(animate);
    // is a Web API method that tells the browser you want to perform an animation
    // and requests that the browser call a specified function to update the animation before the next repaint.
  };

  useEffect(() => {
    const mouseEventsListener = document.addEventListener("mousemove", (ev) => {
      mouseX = ev.pageX; //The pageX read-only property of the MouseEvent interface returns the X (horizontal)
      mouseY = ev.pageY;
    });

    const animateEvent = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", mouseEventsListener);
      cancelAnimationFrame(animateEvent);
    };
  }, []);

  useEffect(() => {
    const mouseEventsListener = document.addEventListener("mouseover", (e) => {
      if (
        e.target.tagName.toLowerCase() === "button" ||
        e.target.parentElement.tagName.toLowerCase() === "button" ||
        e.target.tagName.toLowerCase() === "input" ||
        e.target.tagName.toLowerCase() === "textarea"
      ) {
        setMoveBtn(true);
      } else {
        setMoveBtn(false);
      }
    });
    return () => document.removeEventListener("mouseover", mouseEventsListener);
  }, []);

  return (
    <>
      <div
        ref={cursorOutline}
        className={`z-50 pointer-events-none fixed transition-transform -translate-x-1/2 -translate-y-1/2 rounded-full  ${
          hoverBtn
            ? " bg-transparent border-2 border-indigo-700 w-5 h-5 "
            : " h-3 w-3 bg-indigo-700 "
        } `}
      ></div>
    </>
  );
};

export default Cursor;
