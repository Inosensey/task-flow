//Types
import { TableRow } from "@/Types/database.types";
interface MobileSelectOptionsProps<T, M, N> {
  setState: React.Dispatch<React.SetStateAction<T>>;
  setSelected: React.Dispatch<React.SetStateAction<M>>;
  setToggleOptions: React.Dispatch<React.SetStateAction<N>>;
  choices?: Array<any>;
  optionType: string;
}

export const getMobileSelectOption = <T, M, N>({
  optionType,
  setState,
  setSelected,
  setToggleOptions,
  choices,
}: MobileSelectOptionsProps<T, M, N>) => {
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
                setSelected((prev: M) => ({
                  ...prev,
                  selectedPriorityLevel: priorityLevelInfo.description,
                }));
                setToggleOptions((prev: N) => ({...prev, toggleMobileOptions: !prev}));
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
                setSelected((prev: M) => ({
                  ...prev,
                  selectedFrequency: frequencyInfo.frequency,
                }));
                setToggleOptions((prev: N) => ({...prev, toggleMobileOptions: !prev}));
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
    case "noteType":
      options = choices as TableRow<"NoteType">[];
      return (
        <>
          {options.map((noteTypeInfo: TableRow<"NoteType">) => (
            <div
              key={noteTypeInfo.id}
              onClick={() => {
                setState((prev: T) => ({
                  ...prev,
                  noteType: noteTypeInfo.id,
                  scheduleId: null,
                  todoId: null,
                }));
                setSelected((prev: M) => ({
                  ...prev,
                  selectedNoteType: noteTypeInfo.type,
                }));
                setToggleOptions((prev: N) => ({...prev, toggleMobileOptions: false}));
              }}
              className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
            >
              <div className="flex flex-col">
                <p className="phone:text-sm select-none">{noteTypeInfo.type}</p>
              </div>
            </div>
          ))}
        </>
      );
    case "setSchedulesNote":
      options = choices as TableRow<"Schedules">[];
      return (
        <>
          {options.map((scheduleInfo: TableRow<"Schedules">) => (
            <div
              key={scheduleInfo.id}
              onClick={() => {
                setState((prev: T) => ({
                  ...prev,
                  scheduleId: scheduleInfo.id,
                }));
                setSelected((prev: M) => ({
                  ...prev,
                  selectedSchedule: scheduleInfo.title,
                }));
                setToggleOptions((prev: N) => ({...prev, toggleMobileOptions: false}));
              }}
              className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
            >
              <div className="flex flex-col">
                <p className="phone:text-sm select-none">
                  {scheduleInfo.title}
                </p>
              </div>
            </div>
          ))}
        </>
      );
    case "setTodosNote":
      options = choices as TableRow<"TodoList">[];
      return (
        <>
          {options.map((todoInfo: TableRow<"TodoList">) => (
            <div
              key={todoInfo.id}
              onClick={() => {
                setState((prev: T) => ({
                  ...prev,
                  todoId: todoInfo.id,
                }));
                setSelected((prev: M) => ({
                  ...prev,
                  selectedTodo: todoInfo.title,
                }));
                setToggleOptions((prev: N) => ({...prev, toggleMobileOptions: false}));
              }}
              className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
            >
              <div className="flex flex-col">
                <p className="phone:text-sm select-none">{todoInfo.title}</p>
              </div>
            </div>
          ))}
        </>
      );
    default:
      break;
  }
};
