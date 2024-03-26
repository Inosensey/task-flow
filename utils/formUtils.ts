
interface ReturnInterface<T> {
  Status: string;
  Message: string;
  Response: T;
}

export const useFormSerialize = <T>(event: React.FormEvent<HTMLFormElement>): T => {
  const formData = new FormData(event.currentTarget as HTMLFormElement);
  const formValues: T = {} as T;

  formData.forEach((value, key) => {
    formValues[key as keyof T] = value as any;
  });

  return formValues;
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