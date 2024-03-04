import React, { SVGProps } from "react";

type SvgSpinners3DotsFadeProps = SVGProps<SVGSVGElement> & {
  color: string
}

export function SvgSpinners3DotsFade(props: SvgSpinners3DotsFadeProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3.5em"
      height="3.5em"
      viewBox="0 0 40 40"
      {...props}
    >
      <circle cx="4" cy="12" r="3" fill={props.color}>
        <animate
          id="svgSpinners3DotsFade0"
          fill="freeze"
          attributeName="opacity"
          begin="0;svgSpinners3DotsFade1.end-0.25s"
          dur="0.75s"
          values="1;.2"
        ></animate>
      </circle>
      <circle cx="12" cy="12" r="3" fill={props.color} opacity=".4">
        <animate
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.15s"
          dur="0.75s"
          values="1;.2"
        ></animate>
      </circle>
      <circle cx="20" cy="12" r="3" fill={props.color} opacity=".3">
        <animate
          id="svgSpinners3DotsFade1"
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.3s"
          dur="0.75s"
          values="1;.2"
        ></animate>
      </circle>
      <circle cx="28" cy="12" r="3" fill={props.color} opacity=".3">
        <animate
          id="svgSpinners3DotsFade1"
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.4s"
          dur="0.75s"
          values="1;.2"
        ></animate>
      </circle>
      <circle cx="36" cy="12" r="3" fill={props.color} opacity=".3">
        <animate
          id="svgSpinners3DotsFade1"
          fill="freeze"
          attributeName="opacity"
          begin="svgSpinners3DotsFade0.begin+0.5s"
          dur="0.75s"
          values="1;.2"
        ></animate>
      </circle>
    </svg>
  );
}
export default SvgSpinners3DotsFade;
