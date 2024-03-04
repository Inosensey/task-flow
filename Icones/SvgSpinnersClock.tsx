import React, { SVGProps } from "react";

type SvgSpinnersClockProps = SVGProps<SVGSVGElement> & {
  color: string
}

export function SvgSpinnersClock(props: SvgSpinnersClockProps) {
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
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
      ></path>
      <rect width="2" height="7" x="11" y="6" fill="currentColor" rx="1">
        <animateTransform
          attributeName="transform"
          dur="9s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </rect>
      <rect width="2" height="9" x="11" y="11" fill="currentColor" rx="1">
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </rect>
    </svg>
  );
}
export default SvgSpinnersClock;
