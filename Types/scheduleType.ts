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
