import { TableInsert, TableRow } from "@/Types/database.types";

export type noteType = TableInsert<"Notes"> & {
  Schedules: TableRow<"Schedules">;
} & {
  TodoList: TableRow<"TodoList">;
} & { NoteType: TableRow<"NoteType"> };
