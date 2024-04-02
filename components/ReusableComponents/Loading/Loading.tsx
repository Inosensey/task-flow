import React from "react";
import HashLoader from "react-spinners/HashLoader";

interface props {
    message: string
    isLoading: boolean
}

const Loading = ({message, isLoading}:props) => {
  return (
    <div className={`${isLoading ? "fixed" : "hidden"} top-0 left-0 z-[100] bg-black/[0.5] w-screen h-screen flex justify-center items-center`}>
      <div className="bg-white flex flex-col items-center justify-center gap-2 rounded-lg phone:w-[450px] phone:h-36">
        <HashLoader
          color="#00ADB5"
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <p className={`font-bold text-Primary`}>
            {message}
        </p>
      </div>
    </div>
  );
};

export default Loading;
