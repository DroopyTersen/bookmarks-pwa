import shave from "shave";
import React, { useRef, useEffect, ReactElement, ReactNode } from "react";

export default function Shave({ children, maxHeight, element = "div", enabled = true }) {
  // keep track of the DOM element to shave
  let elemRef = useRef();
  // Allow passing in which dom element to use
  let Element = element as any;

  // The effect will run anytime maxHeight or enabled changes
  useEffect(() => {
    const tryShave = () => {
      if (elemRef.current && enabled) {
        shave(elemRef.current, maxHeight);
      }
    };

    tryShave();

    // Reshave when the window size changes
    window.addEventListener("resize", tryShave);

    // When the effect dependencies change, the effect runs again.
    // But first, the previous effect will be cleaned up by invoking
    // the cleanup function that the effect returns.
    return () => window.removeEventListener("resize", tryShave);
  }, [maxHeight, enabled]);

  // By using enabled as our 'key', we force react to create a
  // completely new DOM node if enabled changes. Effectively blowing away a previously
  // shaved version of the component if we want to "unshave" it by setting enabled to false.
  return (
    <Element key={enabled} ref={elemRef}>
      {children}
    </Element>
  );
}
