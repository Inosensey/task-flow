export const useFormSerialize = <T>(event: React.FormEvent<HTMLFormElement>): T => {
  const formData = new FormData(event.currentTarget as HTMLFormElement);
  const formValues: T = {} as T;

  formData.forEach((value, key) => {
    formValues[key as keyof T] = value as any;
  });

  return formValues;
};
