import PhCircleWavyQuestionBold from "@/Icones/PhCircleWavyQuestionBold";
import React from "react";

type props = {
  headerName: string;
  Icon: React.ComponentType<any>;
};

const Header = ({ headerName, Icon }: props) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center w-full h-14 px-2 gap-2">
        <p className="select-none font-semibold text-lg text-LightSecondary">
          {headerName}
        </p>
        <Icon color="#00ADB5" />
      </div>
    </div>
  );
};

export default Header;
