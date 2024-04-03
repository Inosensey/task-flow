import React from "react";

interface props {
  children: React.ReactNode;
}

const OverviewChildren = ({ children }: props) => {
  return (
    <div className="flex flex-col gap-1">
      {children}
      <button className="text-sm text-LightPrimary w-max underline cursor-pointer">
        View
      </button>
    </div>
  );
};

export default OverviewChildren;
