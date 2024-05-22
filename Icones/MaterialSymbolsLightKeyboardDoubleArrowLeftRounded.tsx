import React, { SVGProps } from "react";

type MaterialSymbolsLightKeyboardDoubleArrowLeftRoundedProps = SVGProps<SVGSVGElement> & {
  color: string
}

export function MaterialSymbolsLightKeyboardDoubleArrowLeftRounded(
  props: MaterialSymbolsLightKeyboardDoubleArrowLeftRoundedProps
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.color}
        d="m7.363 12l4.24 4.246q.141.14.154.342t-.153.366q-.16.16-.354.16t-.354-.16l-4.388-4.389q-.131-.13-.184-.267T6.271 12t.053-.298t.184-.267l4.388-4.389q.14-.14.341-.153t.367.153q.16.16.16.354t-.16.354zm6.1 0l4.24 4.246q.141.14.154.342t-.153.366q-.16.16-.354.16t-.354-.16l-4.388-4.389q-.131-.13-.184-.267q-.053-.136-.053-.298t.053-.298t.184-.267l4.388-4.389q.14-.14.342-.153t.366.153q.16.16.16.354t-.16.354z"
      ></path>
    </svg>
  );
}
export default MaterialSymbolsLightKeyboardDoubleArrowLeftRounded;
