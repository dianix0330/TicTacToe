import { useState, useEffect } from "react";

const ORIENTATION_MIN_BREAKPOINT = 1.2;

export default function useSize() {
  const [screenSize, setSize] = useState({});

  //Get the current size of Component
  function handleWindowResize() {
    const { innerWidth, innerHeight } = window;

    let size = "xs";
    if (innerWidth >= 768 && innerWidth < 992) {
      size = "sm";
    } else if (innerWidth >= 992 && innerWidth < 1200) {
      size = "md";
    } else if (innerWidth >= 1200) {
      size = "lg";
    }
    
    let orientation = "none";
    if (innerWidth > innerHeight * ORIENTATION_MIN_BREAKPOINT) {
      orientation = "landscape";
    } else if (innerHeight > innerWidth * ORIENTATION_MIN_BREAKPOINT) {
      orientation = "portrait";
    }
    setSize({ width: innerWidth, height: innerHeight, size, orientation });
  }

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize); //Add Resize Event to the component
    return () => {
      window.removeEventListener("resize", handleWindowResize); // When the component is dismounted, remove the event of handleWindowResize.
    };
  }, []);

  return screenSize;
};
