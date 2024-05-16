
// Types
import { TableRow } from "@/Types/database.types";
interface props<T> {
    choices?: T[]
}

export function MobileCatSelectOptions<T>({choices}:props<T>) {

  return (
    <div className="h-screen w-screen flex justify-center absolute top-0 -left-[0.1px] bg-black/[.54] table:items-center ">
      <div className="phone:w-10/12 phone:mt-24 tablet:max-w-[450px]">
        <div className="overflow-auto bg-Primary max-h-[400px] rounded-sm">
          <div className="py-1 px-2 border-b-2 border-b-LightPrimaryDisabled">
            <p>Hello world</p>
          </div>
          <div>
            <div>
                <p>Name</p>
                <p>Description</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
