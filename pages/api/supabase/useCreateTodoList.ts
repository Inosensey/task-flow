import { NextApiRequest, NextApiResponse } from "next";

// Supabase
import { useSupabase } from "../../../utils/useSupabaseClient";
import { Table } from "@/Types/supabase";

type TodoList = Table<"TodoList", "Insert">;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const todoListInfo:TodoList = req.body.todoListInfo;
  const todoListInfo = req.body;
  try {
    let { data, error } = await useSupabase.from("TodoList").insert({
      title: todoListInfo.title,
      description: todoListInfo.description,
      priorityLevel: todoListInfo.priorityLevel,
    });
    if (error) {
      console.log(error);
    }
    return res
      .status(200)
      .send({ Message: "Todo List Added", TodoListResult: data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
