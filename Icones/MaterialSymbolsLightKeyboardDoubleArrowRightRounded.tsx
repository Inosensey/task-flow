import React, { SVGProps } from "react";

type MaterialSymbolsLightKeyboardDoubleArrowRightRoundedProps = SVGProps<SVGSVGElement> & {
  color: string
}

export function MaterialSymbolsLightKeyboardDoubleArrowRightRounded(
  props: MaterialSymbolsLightKeyboardDoubleArrowRightRoundedProps
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
        d="m10.537 12l-4.24-4.246q-.141-.14-.154-.341t.153-.367q.16-.16.354-.16t.354.16l4.388 4.389q.131.13.184.267q.053.136.053.298t-.053.298t-.184.267l-4.388 4.389q-.14.14-.341.153t-.367-.153q-.16-.16-.16-.354t.16-.354zm6.1 0l-4.24-4.246q-.141-.14-.154-.341t.153-.367q.16-.16.354-.16t.354.16l4.388 4.389q.131.13.184.267t.053.298t-.053.298t-.184.267l-4.388 4.389q-.14.14-.341.153t-.367-.153q-.16-.16-.16-.354t.16-.354z"
      ></path>
    </svg>
  );
}
export default MaterialSymbolsLightKeyboardDoubleArrowRightRounded;
