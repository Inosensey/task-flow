"use server";

// Components
import Header from "@/components/Dashboard/Header";
import TodoLists from "@/components/Dashboard/TodoList/TodoLists";

// Icones
import IonTodayOutline from "@/Icones/IonTodayOutline";

// Libs
import { getTodoLists } from "@/lib/todolistMethods";

// types
import { TableRow } from "@/Types/database.types";
import { ReturnInterface } from "@/Types/generalTypes";
import { todoListDetails } from "@/Types/todoListTypes";

const Page = async () => {
  const todoLists: ReturnInterface<todoListDetails[]> | ReturnInterface<any> =
    await getTodoLists();
  console.log(todoLists);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full bg-Primary">
        <Header headerName="Todo-List" Icon={IonTodayOutline} />
        <TodoLists TodoLists={todoLists} />
      </div>
    </div>
  );
};

export default Page;
