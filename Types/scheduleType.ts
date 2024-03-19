import { TableRow } from "./database.types";

export type GeneralInfo = {
  date: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
};
export interface ScheduleInfo extends GeneralInfo {
  city: string;
  cityId: string;
  categoryKeyId: string;
  categoryKey: string;
  namePlace: string;
  lat: string;
  long: string;
  [key: string]: string;
}
export type ScheduleDetails = [
  TableRow<"Schedules"> & {
    ScheduleLocation: {
      id: number;
      namePlace: string;
      city: string;
      cityId: string;
      LocationCategories: {
        id: number;
        category: string;
      };
      LocationKeys: {
        id: number;
        key: string;
      };
      long: string;
      lat: string;
    }[];
  }
];
