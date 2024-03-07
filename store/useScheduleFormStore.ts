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
  resetValidation: () => void;
}

type validationParams = {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
};

export const useScheduleFormStore = create<StoreType>((set) => ({
  validations: {
    title: {
      valid: null,
      validationMessage: "",
    },
    data: {
      valid: null,
      validationMessage: "",
    },
    timeStart: {
      valid: null,
      validationMessage: "",
    },
    timeEnd: {
      valid: null,
      validationMessage: "",
    },
    city: {
      valid: null,
      validationMessage: "",
    },
  },
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
  resetValidation: () =>
    set(() => ({
      validations: {
        title: {
          valid: null,
          validationMessage: "",
        },
        data: {
          valid: null,
          validationMessage: "",
        },
        timeStart: {
          valid: null,
          validationMessage: "",
        },
        timeEnd: {
          valid: null,
          validationMessage: "",
        },
        city: {
          valid: null,
          validationMessage: "",
        },
      },
    })),
}));
