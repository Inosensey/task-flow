import React, { SVGProps } from "react";

type PhNotePencilThinProps = SVGProps<SVGSVGElement> & {
  color: string;
};

export function PhNotePencilThin(props: PhNotePencilThinProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill={props.color}
        d="m226.83 61.17l-32-32a4 4 0 0 0-5.66 0l-96 96A4 4 0 0 0 92 128v32a4 4 0 0 0 4 4h32a4 4 0 0 0 2.83-1.17l96-96a4 4 0 0 0 0-5.66M126.34 156H100v-26.34l68-68L194.34 88ZM200 82.34L173.66 56L192 37.66L218.34 64ZM220 128v80a12 12 0 0 1-12 12H48a12 12 0 0 1-12-12V48a12 12 0 0 1 12-12h80a4 4 0 0 1 0 8H48a4 4 0 0 0-4 4v160a4 4 0 0 0 4 4h160a4 4 0 0 0 4-4v-80a4 4 0 0 1 8 0"
      ></path>
    </svg>
  );
}
export default PhNotePencilThin;
