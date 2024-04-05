import React from "react";

interface props {
  children: React.ReactNode;
}

const OverviewChildren = ({ children }: props) => {
  return (
    <div className="flex flex-col gap-1">
      {children}
    </div>
  );
};

export default OverviewChildren;
