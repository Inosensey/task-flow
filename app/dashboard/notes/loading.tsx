import SvgSpinnersClock from "@/Icones/SvgSpinnersClock";

const loading = () => {
  return (
    <div className="z-50 fixed bg-Primary top-0 w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <SvgSpinnersClock color="#00ADB5" />
        <p className="font-bold">Your Notes are Loading Up! 📅</p>
      </div>
    </div>
  );
};

export default loading;
