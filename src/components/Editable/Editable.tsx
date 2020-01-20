import React, { useRef, useCallback, ReactElement, ReactNode } from "react";
import styled from "styled-components";

const CLASS_NAME = "editable";

export interface EditableProps {
  className?: string;
  onChange: (value: string) => void;
  as?: ReactNode | "string";
  editable?: boolean;
  // value: string;
  [key: string]: any;
}
const Editable: React.FC<EditableProps> = ({
  className = "",
  children,
  onChange = (val) => {},
  editable = true,
  as: asProp,
  ...rest
}) => {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  let ref = useRef(null);

  let handleChange = useCallback(() => {
    if (ref.current) {
      let updatedValue = ref.current.innerText;
      console.log("New Value", updatedValue);
      onChange(updatedValue);
      // let oldValue = isHtml ? props.html : props.text;
      // let updatedValue = isHtml ? ref.current.innerHTML : ref.current.innerText;
      // if (updatedValue !== oldValue) props.onChange(updatedValue);
    }
  }, [children]) as any;

  let Elem = (asProp || "div") as any;

  let editableProps = editable
    ? {
        contentEditable: true,
        onBlur: handleChange,
      }
    : {};

  return (
    <Elem {...rest} className={cssClass} ref={ref} {...editableProps}>
      {children}
    </Elem>
  );
};

export default Editable;

const StyledEditable = styled.div`
  position: relative;
  display: inline-block;
`;

// import React, { useState, useRef, useCallback } from "react";

// export default function Editable(props: EditableProps) {
//   let ref = useRef(null);
//   let isHtml = props.html;

//   let onChange = useCallback(() => {
//     if (ref.current) {
//       let oldValue = isHtml ? props.html : props.text;
//       let updatedValue = isHtml ? ref.current.innerHTML : ref.current.innerText;
//       if (updatedValue !== oldValue) props.onChange(updatedValue);
//     }
//   }, [props.text, props.html, ref]) as any;

//   let cssClass = [props.className, "editable"].join(" ");
//   return (
//     <div
//       className={cssClass}
//       ref={ref}
//       contentEditable
//       onBlur={onChange}
//       dangerouslySetInnerHTML={{ __html: props.text || props.html }}
//     />
//   );
// }
