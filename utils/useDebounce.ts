interface DebounceProps {
  callBack: (place: string) => void | Promise<void>;
  delay: number;
}

const useDebounce = (
  callBack: (place: string) => void | Promise<void>,
  delay: number
) => {
  const debounceCallback = (value: string) => {
    const timeoutId = setTimeout(async () => {
      await callBack(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  };

  return debounceCallback;
};

export default useDebounce;
