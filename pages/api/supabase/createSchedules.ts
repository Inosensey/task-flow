import { NextApiRequest, NextApiResponse } from "next";

// Supabase
import { useSupabase } from "../../../utils/useSupabaseClient";
import { Table } from "@/Types/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const todoListInfo:TodoList = req.body.todoListInfo;
  const scheduleInfo = req.body;
  try {
    let { data, error } = await useSupabase.from("Schedules").insert({
      title: scheduleInfo.title,
      description: scheduleInfo.description,
      date: scheduleInfo.date,
      timeStart: scheduleInfo.timeStart,
      timeEnd: scheduleInfo.timeEnd,
      themeColor: "#000",
    }).select();
    if (error) {
      console.log(error);
    }
    // console.log(scheduleInfo)
    return res
      .status(200)
      .send(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
