import React, { SVGProps } from "react";

type CarbonLoginProps = SVGProps<SVGSVGElement> & {
  color: string
}

export function CarbonLogin(props: CarbonLoginProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill={props.color}
        d="M26 30H14a2 2 0 0 1-2-2v-3h2v3h12V4H14v3h-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2"
      ></path>
      <path
        fill={props.color}
        d="M14.59 20.59L18.17 17H4v-2h14.17l-3.58-3.59L16 10l6 6l-6 6z"
      ></path>
    </svg>
  );
}
export default CarbonLogin;
