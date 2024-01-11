import React, { SVGProps } from "react";

type IonTodayOutlineProps = SVGProps<SVGSVGElement> & {
  color: string;
};

export function MaterialSymbolsLocationCityRounded(
  props: IonTodayOutlineProps
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.8em"
      height="1.8em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.color}
        d="M3 19V9q0-.825.588-1.412T5 7h4V5.825q0-.4.15-.763t.425-.637l1-1Q11.15 2.85 12 2.85t1.425.575l1 1q.275.275.425.638t.15.762V11h4q.825 0 1.413.588T21 13v6q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19m2 0h2v-2H5zm0-4h2v-2H5zm0-4h2V9H5zm6 8h2v-2h-2zm0-4h2v-2h-2zm0-4h2V9h-2zm0-4h2V5h-2zm6 12h2v-2h-2zm0-4h2v-2h-2z"
      ></path>
    </svg>
  );
}
export default MaterialSymbolsLocationCityRounded;
