import React, { SVGProps } from "react";

type IonTodayOutlineProps = SVGProps<SVGSVGElement> & {
  color: string;
};

export function IonTodayOutline(props: IonTodayOutlineProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 512 512"
      {...props}
    >
      <rect
        width="416"
        height="384"
        x="48"
        y="80"
        fill="none"
        stroke={props.color}
        strokeLinejoin="round"
        strokeWidth="32"
        rx="48"
      ></rect>
      <path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M128 48v32m256-32v32"
      ></path>
      <rect
        width="96"
        height="96"
        x="112"
        y="224"
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        rx="13"
      ></rect>
      <path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M464 160H48"
      ></path>
    </svg>
  );
}
export default IonTodayOutline;
