import React, { ReactNode } from "react";

interface props {
  children?: ReactNode;
  header: string;
}

const TabContentContainer = ({ children, header }: props) => {
  return (
    <div className="p-2 bg-Secondary rounded-md">
      <p className="font-semibold">{header}</p>
      {children}
    </div>
  );
};

export default TabContentContainer;
