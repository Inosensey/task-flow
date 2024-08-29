import React, { SVGProps } from "react";

type TablerBrandGoogleProps = SVGProps<SVGSVGElement> & {
  color: string
}

export function TablerBrandGoogle(props: TablerBrandGoogleProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.945 11a9 9 0 1 1-3.284-5.997l-2.655 2.392A5.5 5.5 0 1 0 17.125 14H13v-3z"
      ></path>
    </svg>
  );
}
export default TablerBrandGoogle;
