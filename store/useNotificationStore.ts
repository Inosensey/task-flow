import { create } from "zustand";

type StoreType = {
  showSlideNotification: boolean;
  message: string;
  setMessage: (message:string) => void;
  setShowSlideNotification: () => void;
};

export const useNotificationStore = create<StoreType>((set) => ({
  showSlideNotification: false,
  message: "Message here",
  setShowSlideNotification: () =>
    set((state) => ({ showSlideNotification: state.showSlideNotification === false ? true : false })),
  setMessage: (message) => set(() => ({ message: message })),
}));
