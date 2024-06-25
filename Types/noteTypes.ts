import { TableInsert, TableRow } from "@/Types/database.types";

export type noteType = TableRow<"Notes"> & {
  Schedules: TableRow<"Schedules"> | null;
} & {
  TodoList: TableRow<"TodoList"> | null;
} & { NoteType: TableRow<"NoteType"> };
