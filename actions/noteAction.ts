"use server";

// Utils
import { createClient } from "@/utils/supabaseSSR";
import { getSupabaseUser } from "@/utils/supabaseUtils";
import { returnError, returnSuccess } from "@/utils/formUtils";

// Types
import { Table, TableInsert, TableUpdate } from "@/Types/database.types";
import { useFormStateType } from "@/Types/formStates";
import { ReturnInterface } from "@/Types/generalTypes";
import { revalidateTag } from "next/cache";

export const mutateNote = async (
  prevState: useFormStateType,
  formData: FormData
) => {
  try {
    let result;
    const formAction = formData.get("action");
    const noteData: TableInsert<"Notes"> = {
      id: parseInt(formData.get("id") as string),
      noteType: parseInt(formData.get("noteType") as string),
      scheduleId: formData.get("scheduleId") !== "0"
        ? parseInt(formData.get("scheduleId") as string)
        : null,
      todoId: formData.get("todoId") !== "0"
        ? parseInt(formData.get("todoId") as string)
        : null,
      note: formData.get("note") as string,
    };
    if (formAction === "Add") {
      result = await insertNote(noteData);
    } else {
      result = await updateNote(noteData);
    }
    revalidateTag("notes");
    return {
      success: true,
      error: false,
      data: [],
      message: "",
    };
  } catch (error) {
    return {
      success: true,
      error: false,
      data: [],
      message: `There is an error inserting the Todo: ${error}`,
    };
  }
};

const insertNote = async (noteInfo: TableInsert<"Notes">) => {
  try {
    const supabase = createClient();
    const userData = await getSupabaseUser();
    const userId = userData.data.user!.id;
    let result = await supabase
      .from("Notes")
      .insert<TableInsert<"Notes">>({
        noteType: noteInfo.noteType,
        scheduleId: noteInfo.scheduleId,
        todoId: noteInfo.todoId,
        note: noteInfo.note,
        userId: userId,
      })
      .select();
    if (result.error)
      return returnError("There is an error inserting the Note", result.error);
    return returnSuccess("TNote Successfully Added", result.data);
  } catch (error) {
    return returnError("There is an error inserting the Note", error);
  }
};

const updateNote = async (noteInfo: TableUpdate<"Notes">) => {
  try {
    const supabase = createClient();
    let result = await supabase
      .from("Notes")
      .update<TableUpdate<"Notes">>({
        noteType: noteInfo.noteType,
        scheduleId: noteInfo.scheduleId,
        todoId: noteInfo.todoId,
        note: noteInfo.note,
      })
      .eq("id", noteInfo.id)
      .select();
    if (result.error)
      return returnError("There is an error Updating the Note", result.error);
    return returnSuccess("Note Successfully Updated", result.data);
  } catch (error) {
    return returnError("There is an error Updating the Note", error);
  }
};
