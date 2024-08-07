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
  formAction: string;
  setFormAction: (action: string) => void;
}

type validationParams = {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
};

export const useFormStore = create<StoreType>((set) => ({
  formAction: "add",
  setFormAction: (action: string) => {
    set(() => ({ formAction: action }));
  }
  ,
  validations: undefined
  // {
  //   title: {
  //     valid: null,
  //     validationMessage: "",
  //   },
  //   data: {
  //     valid: null,
  //     validationMessage: "",
  //   },
  //   timeStart: {
  //     valid: null,
  //     validationMessage: "",
  //   },
  //   timeEnd: {
  //     valid: null,
  //     validationMessage: "",
  //   },
  //   city: {
  //     valid: null,
  //     validationMessage: "",
  //   },
  // }
  ,
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
      validations: undefined,
    })),
}));
