
// Types
import { TableRow } from "@/Types/database.types";
import { SelectedMobileOptionType } from "@/Types/scheduleType";
import { formatStringName } from "@/helpers/GeneralHelpers";

interface props {
    choices?: SelectedMobileOptionType[]
    setToggleOptions: React.Dispatch<React.SetStateAction<boolean>>
    optionType: string,
    optionOnClick: () => void
}

export function MobileCatSelectOptions<T>({choices, setToggleOptions, optionType, optionOnClick}:props) {
  const returnOptionsBaseOnType = () => {
    if(optionType === "Key") {
      const options = choices as TableRow<"LocationKeys">[];
      return (
        <>
        {options?.map((category: TableRow<"LocationKeys">) => (
            <div
            onClick={optionOnClick}
            key={category.key}
            className="w-full h-12 border-b-2 flex items-center border-Primary px-2 cursor-pointer hover:bg-SmoothSecondary"
          >
            <p className="select-none">
              {formatStringName(category.key)}
              {category.description !== null && (
                <span className="text-xs text-[#ccc]">
                  {" "}
                  - {category.description}
                </span>
              )}
            </p>
          </div>
        ))}</>
      )
    }
  }
  console.log(choices);
  return (
    <div onClick={() => setToggleOptions(false)} className="h-screen w-screen flex justify-center absolute top-0 -left-[0.1px] bg-black/[.54] table:items-center ">
      <div className="phone:w-10/12 phone:mt-24 tablet:max-w-[450px]">
        <div className="overflow-auto bg-Primary max-h-[400px] rounded-sm">
          <div className="py-1 px-2 border-b-2 border-b-LightPrimaryDisabled">
            <p>Hello world</p>
          </div>
          <div>
            <div>
                {returnOptionsBaseOnType()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
