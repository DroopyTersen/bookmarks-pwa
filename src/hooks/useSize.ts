import { useEffect, useState } from "react";

export enum Size {
  small = "small",
  medium = "medium",
  large = "large",
}

const useSize = (min = 500, max = 1200) => {
  let [size, setSize] = useState<Size>(() => calcSize(min, max));

  // const [state, setState] = useState<{ width: number; height: number }>({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });
  useEffect(() => {
    const handler = () => {
      setSize(calcSize(min, max));
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [min, max]);
  return size;
};

let calcSize = (min, max) => {
  if (window.innerWidth) {
    if (window.innerWidth < min) return Size.small;
    if (window.innerWidth > max) return Size.large;
  }
  return Size.medium;
};
export default useSize;
