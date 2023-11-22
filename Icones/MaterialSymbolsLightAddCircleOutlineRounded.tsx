import React, { SVGProps } from "react";

type MaterialSymbolsLightAddCircleOutlineRoundedProps = SVGProps<SVGSVGElement> & {
  color: string;
};

export function MaterialSymbolsLightAddCircleOutlineRounded(
  props: MaterialSymbolsLightAddCircleOutlineRoundedProps
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill={props.color}
        d="M11.5 12.5V16q0 .213.144.356q.144.144.357.144t.356-.144q.143-.143.143-.356v-3.5H16q.213 0 .356-.144q.144-.144.144-.357t-.144-.356Q16.213 11.5 16 11.5h-3.5V8q0-.213-.144-.356Q12.212 7.5 12 7.5t-.356.144Q11.5 7.788 11.5 8v3.5H8q-.213 0-.356.144q-.144.144-.144.357t.144.356q.144.143.356.143h3.5Zm.503 8.5q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21ZM12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
      ></path>
    </svg>
  );
}
export default MaterialSymbolsLightAddCircleOutlineRounded;
