import React, { SVGProps } from "react";

type MaterialSymbolsRoomPreferencesOutlineProps = SVGProps<SVGSVGElement> & {
  color: string
}

export function MaterialSymbolsRoomPreferencesOutline(
  props: MaterialSymbolsRoomPreferencesOutlineProps
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
        d="M3 21v-2h2V3h10v1h4v6h-2V6h-2v6h-2V5H7v14h5v2zm14 1l-.3-1.5q-.3-.125-.562-.275t-.513-.35l-1.45.5l-1-1.725l1.125-1q-.05-.375-.05-.638t.05-.637l-1.125-1l1-1.725l1.45.5q.25-.2.513-.363t.562-.287L17 12h2l.3 1.5q.3.125.563.275t.512.35l1.45-.5l1 1.725l-1.125 1q.05.375.05.638t-.05.637l1.125 1l-1 1.725l-1.45-.475q-.25.2-.513.35t-.562.275L19 22zm1-3q.825 0 1.413-.587T20 17t-.587-1.412T18 15t-1.412.588T16 17t.588 1.413T18 19m-7-6q-.425 0-.712-.288T10 12t.288-.712T11 11t.713.288T12 12t-.288.713T11 13m-4 6V5z"
      ></path>
    </svg>
  );
}
export default MaterialSymbolsRoomPreferencesOutline;
