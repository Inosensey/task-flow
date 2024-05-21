import { create } from "zustand";
import { getCurrentDate } from "@/utils/useDate";

type StoreType = {
  dateSelected: string;
  setDate: (selectedDate: string) => void;
};

export const useDateStore = create<StoreType>((set) => ({
  dateSelected: getCurrentDate(),
  setDate: (selectedDate: string) =>
    set(() => ({ dateSelected: selectedDate })),
}));
