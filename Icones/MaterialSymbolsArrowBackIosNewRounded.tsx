import React, { SVGProps } from "react";

type MaterialSymbolsArrowBackIosNewRoundedProps = SVGProps<SVGSVGElement> & {
  color: string;
};

export function MaterialSymbolsArrowBackIosNewRounded(
  props: MaterialSymbolsArrowBackIosNewRoundedProps
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.color}
        d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875q-.375.375-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75q0-.375.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388q.375.375.375.875t-.375.875L9.55 12Z"
      ></path>
    </svg>
  );
}
export default MaterialSymbolsArrowBackIosNewRounded;
