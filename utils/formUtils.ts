
import FormValidation from "./validation";
import { validation } from "@/Types/generalTypes";
import { useQuery } from "@tanstack/react-query";
import { getUserData } from "@/lib/TanStackQueryFns";

interface ReturnInterface<T> {
  Status: string;
  Message: string;
  Response: T | string;
}

export const useFormSerialize = <T>(event: React.FormEvent<HTMLFormElement>): T => {
  const formData = new FormData(event.currentTarget as HTMLFormElement);
  let formValues: T = {} as T;

  formData.forEach((value, key) => {
    formValues[key as keyof T] = value as any;
  });

  return formValues;
};

export const useFormValidation = <T extends { [key: string]: any }>(
  fieldsToCheck: Array<string>,
  formValues: T & { [key: string]: string },
  setValidation: (data: validation) => void
) => {
  let isValid = true;
  let currentEmail = "";
  fieldsToCheck.some((field) => {
    console.log(field);
    if(field === "currentEmail") {
      currentEmail = formValues.userEmail
    }
    if (formValues[field] === "" || formValues[field] === "0") {
      isValid = false;
      const validationParams: {value: string, stateName: string, currentEmail?: string} = {
        value: formValues[field],
        stateName: field,
        currentEmail: currentEmail
      };
      const result: validation = FormValidation(validationParams);
      setValidation(result);
    }
  });
  return isValid;
};

export const returnError = <T>(message: string, errorInfo: T): ReturnInterface<T> => {
  return {
    Status: "Error",
    Message: message,
    Response: errorInfo,
  };
};
export const returnSuccess = <T>(message: string, data: T): ReturnInterface<T> => {
  return {
    Status: "Success",
    Message: message,
    Response: data,
  };
};

export const returnResult= <T>(status: string, message: string, data: T): ReturnInterface<T> => {
  return {
    Status: status,
    Message: message,
    Response: data,
  };
};