//Types
import { TableRow } from "@/Types/database.types";
interface MobileSelectOptionsProps<T> {
  choices?: Array<any>;
  setState: React.Dispatch<React.SetStateAction<T>>;
  setToggleMobileOptions: React.Dispatch<React.SetStateAction<boolean>>;
  optionType: string;
}

export const getMobileSelectOption = <T,>({
  optionType,
  setState,
  setToggleMobileOptions,
  choices,
}: MobileSelectOptionsProps<T>) => {
  let options;
  switch (optionType) {
    case "PriorityLevel":
      options = choices as TableRow<"PriorityLevel">[];
      return (
        <>
          {options?.map((priorityLevelInfo: TableRow<"PriorityLevel">) => (
            <div
              onClick={() => {
                setState((prev: T) => ({
                  ...prev,
                  priorityLevel: priorityLevelInfo.level,
                }));
                setToggleMobileOptions(false);
              }}
              key={priorityLevelInfo.id}
              className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
            >
              <div className="flex flex-col">
                <p className="phone:text-sm select-none">
                  {priorityLevelInfo.description}
                </p>
              </div>
            </div>
          ))}
        </>
      );
    case "Frequencies":
      options = choices as TableRow<"Frequencies">[];
      return (
        <>
          {options?.map((frequencyInfo: TableRow<"Frequencies">) => (
            <div
              onClick={() => {
                setState((prev: T) => ({
                  ...prev,
                  frequency: frequencyInfo.id,
                }));
                setToggleMobileOptions(false);
              }}
              key={frequencyInfo.id}
              className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
            >
              <div className="flex flex-col">
                <p className="phone:text-sm select-none">
                  {frequencyInfo.frequency}
                </p>
              </div>
            </div>
          ))}
        </>
      );

    default:
      break;
  }
};
