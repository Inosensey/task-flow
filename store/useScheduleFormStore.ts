import { create } from "zustand";

interface validationTemplate {
  [key: string]: {
    valid: null | boolean;
    validationMessage: string;
  };
}

interface StoreType {
  validations: validationTemplate | undefined;
  setValidation: (data: validationParams) => void;
}

type validationParams = {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
};

export const useScheduleFormStore = create<StoreType>((set) => ({
  validations: undefined,
  setValidation: (data: validationParams) =>
    set((prev) => ({
      validations: {
        ...prev.validations,
        [data.validationName]: {
          valid: data.valid,
          validationMessage: data.validationMessage,
        },
      },
    })),
}));
