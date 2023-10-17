import React, { SVGProps } from "react";

type IconamoonModeDarkProps = SVGProps<SVGSVGElement> & {
  color: string
}

export function IconamoonModeDark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.color}
        d="m20.995 11.711l1-.031a1 1 0 0 0-1.284-.927l.285.958Zm-8.707-8.706l.96.284a1 1 0 0 0-.928-1.284l-.031 1Zm8.423 7.748A6.002 6.002 0 0 1 19 11v2a8 8 0 0 0 2.28-.33l-.57-1.917ZM19 11a6 6 0 0 1-6-6h-2a8 8 0 0 0 8 8v-2Zm-6-6c0-.596.087-1.17.247-1.71l-1.917-.57A8 8 0 0 0 11 5h2Zm-1-1c.086 0 .172.001.257.004l.063-1.999A10.19 10.19 0 0 0 12 2v2Zm-8 8a8 8 0 0 1 8-8V2C6.477 2 2 6.477 2 12h2Zm8 8a8 8 0 0 1-8-8H2c0 5.523 4.477 10 10 10v-2Zm8-8a8 8 0 0 1-8 8v2c5.523 0 10-4.477 10-10h-2Zm-.004-.257c.003.085.004.171.004.257h2c0-.107-.002-.214-.005-.32l-1.999.063Z"
      ></path>
    </svg>
  );
}
export default IconamoonModeDark;
