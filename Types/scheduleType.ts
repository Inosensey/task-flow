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
export interface Feature {
  geometry: {
    coordinates: [string, string];
    type: string;
  };
  properties: {
    address_line1: string;
    address_line2: string;
    categories: string[];
    city: string;
    country: string;
    country_code: string;
    distance: number;
    formatted: string;
    lat: string;
    lon: string;
    name: string;
    place_id: string;
    postcode: string;
    region: string;
    state: string;
    street: string;
  };
}
export interface PlaceList {
  features: Feature[] | undefined;
}
export type SelectedMobileOptionType = 
    | TableRow<"LocationKeys">
    | TableRow<"LocationCategories">
    | Feature
    | undefined;

export type LocationInfoInput = {
  categoryKeyId: number;
  categoryKey: number;
  namePlace: string;
  lat: string;
  long: string;
  selectedChoice: {
    key: string | null;
    id: number;
  };
  selectedTypeOfPlace: string | null;
  selectedPlace: string;
};
