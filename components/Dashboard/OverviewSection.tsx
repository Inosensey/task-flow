import React, { SVGProps } from "react";

interface props {
  children: React.ReactNode;
  Icon: React.ComponentType<any>
  OverviewTitle: string,
}

const OverviewSection = ({ children, Icon, OverviewTitle }: props) => {
  return (
    <div className="w-full flex flex-col gap-2 bg-Secondary p-3 rounded-md shadow-inner shadow-Primary">
      <span className="flex gap-2">
        {OverviewTitle}
        <Icon color="#00ADB5" />
      </span>
      {children}
    </div>
  );
};

export default OverviewSection;
