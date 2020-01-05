import shave from "shave";
import React from "react";

export default function Shave({ children, el = "div", maxHeight = 100, enabled = true }) {
  let Element = el as any;
  let elemRef = React.useRef(null);
  React.useEffect(() => {
    if (enabled) {
      shave(elemRef.current, maxHeight);
    }
  }, [children, maxHeight, enabled]);

  return (
    <Element key={enabled} ref={elemRef} data-enabled={enabled}>
      {children}
    </Element>
  );
}
