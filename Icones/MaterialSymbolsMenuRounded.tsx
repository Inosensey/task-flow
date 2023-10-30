import React, { SVGProps } from "react";

type MaterialSymbolsMenuRoundedProps = SVGProps<SVGSVGElement> & {
  color: string;
};

export function MaterialSymbolsMenuRounded(
  props: MaterialSymbolsMenuRoundedProps
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2.5em"
      height="2.5em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.color}
        d="M4 18q-.425 0-.713-.288T3 17q0-.425.288-.713T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18H4Zm0-5q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13H4Zm0-5q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8H4Z"
      ></path>
    </svg>
  );
}
export default MaterialSymbolsMenuRounded;
