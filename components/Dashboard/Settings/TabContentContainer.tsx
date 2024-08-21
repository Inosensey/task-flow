import React, { ReactNode } from "react";

interface props {
  children?: ReactNode;
  header: string;
}

const TabContentContainer = ({ children, header }: props) => {
  return (
    <div className="p-2 bg-Secondary rounded-md shadow-inner shadow-Primary w-full">
      <p className="font-semibold underline">{header}</p>
      {children}
    </div>
  );
};

export default TabContentContainer;
