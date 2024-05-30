interface validationTemplate {
    [key: string]: {
      valid: null | boolean;
      validationMessage: string;
    };
  }

export interface useFormStateType {
    success: boolean | null,
    error: boolean | null,
    message: string | validationTemplate | undefined,
    data: any[] | []
}