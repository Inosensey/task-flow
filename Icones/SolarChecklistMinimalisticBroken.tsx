import React, { SVGProps } from "react";

export function SolarChecklistMinimalisticBroken(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="#00ADB5" strokeLinecap="round" strokeWidth="1.5">
        <path
          strokeLinejoin="round"
          d="M6 15.8L7.143 17L10 14M6 8.8L7.143 10L10 7"
        ></path>
        <path d="M13 9h5m-5 7h5m4-4c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464c.974.974 1.3 2.343 1.41 4.536"></path>
      </g>
    </svg>
  );
}
export default SolarChecklistMinimalisticBroken;
