import React, { SVGProps } from "react";

type SvgSpinners8DotsRotateProps = SVGProps<SVGSVGElement> & {
  color: string;
};

export function SvgSpinners8DotsRotate(props: SvgSpinners8DotsRotateProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g>
        <circle cx="3" cy="12" r="2" fill={props.color}></circle>
        <circle cx="21" cy="12" r="2" fill={props.color}></circle>
        <circle cx="12" cy="21" r="2" fill={props.color}></circle>
        <circle cx="12" cy="3" r="2" fill={props.color}></circle>
        <circle cx="5.64" cy="5.64" r="2" fill={props.color}></circle>
        <circle cx="18.36" cy="18.36" r="2" fill={props.color}></circle>
        <circle cx="5.64" cy="18.36" r="2" fill={props.color}></circle>
        <circle cx="18.36" cy="5.64" r="2" fill={props.color}></circle>
        <animateTransform
          attributeName="transform"
          dur="1.5s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </g>
    </svg>
  );
}
export default SvgSpinners8DotsRotate;
