import React, { SVGProps } from "react";

type PhGoogleLogoBoldProps = SVGProps<SVGSVGElement> & {
  color: string
}

export function PhGoogleLogoBold(props: PhGoogleLogoBoldProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill={props.color}
        d="M228 128a100 100 0 1 1-22.86-63.64a12 12 0 0 1-18.51 15.28A76 76 0 1 0 203.05 140H128a12 12 0 0 1 0-24h88a12 12 0 0 1 12 12"
      ></path>
    </svg>
  );
}
export default PhGoogleLogoBold;
