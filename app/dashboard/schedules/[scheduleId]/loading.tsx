import Loading from "@/components/ReusableComponents/Loading/Loading";
import React from "react";

import SvgSpinnersBlocksShuffle3 from "@/Icones/SvgSpinnersBlocksShuffle3";
import SvgSpinners3DotsFade from "@/Icones/SvgSpinners3DotsFade";
import SvgSpinnersClock from "@/Icones/SvgSpinnersClock";

type props = {
  message: string;
  isLoading: boolean;
};

const loading = () => {
  return (
    <div className="z-50 fixed bg-Primary top-0 w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <SvgSpinnersClock color="#00ADB5" />
        <p className="font-bold">Your Preferred Schedule is Loading Up! 📅</p>
      </div>
    </div>
  );
};

export default loading;
