interface DebounceProps {
  callBack: (...args: any[]) => void;
  delay: number;
}

const useDebounce = ({ callBack, delay }: DebounceProps) => {
  let timeOutId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      callBack(...args);
    }, delay);
  };
};

export default useDebounce;
