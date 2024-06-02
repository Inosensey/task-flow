export interface ReturnInterface<T> {
  Status: string;
  Message: string;
  Response: T;
}

export type validation = {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
};
