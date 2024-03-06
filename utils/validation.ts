type params = {
  value: string;
  stateName: string;
  confirmPassword?: string;
};
type validationInfo = {
  validationName: string;
  valid: boolean;
  validationMessage: string;
};
interface validationResult {
  validationName: string;
  valid: null | boolean;
  validationMessage: string;
}
interface validationState {
  [key: string]: {
    valid: null | boolean;
    validationMessage: string;
  };
}

const FormValidation = (data: params): validationInfo => {
  switch (data.stateName) {
    case "firstName":
    case "lastName":
    case "title":
      return validateName(data);
    case "age":
    case "zip":
    case "contactNumber":
      return validateNumber(data);
    case "date":
    case "timeStart":
    case "timeEnd":
      return validateTimeOrDate(data);
    case "gender":
    case "country":
    case "state":
      return validateString(data);
    case "username":
      return validateUsername(data);
    case "email":
      return validateEmail(data);
    case "password":
      return validatePassword(data);
    case "confirmPassword":
      return confirmPassword(data);
    default:
      return {
        validationName: "",
        valid: false,
        validationMessage: "State name is undefined",
      };
  }
};

let validationInfo: validationInfo = {
  validationName: "",
  valid: false,
  validationMessage: "",
};
const validateNumber = (data: params): validationInfo => {
  const numbersRegex = /^[0-9]+$/;
  if (data.value.length === 0) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "This field is required",
    });
  }
  if (numbersRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: true,
      validationMessage: "",
    });
  }
  return (validationInfo = {
    validationName: data.stateName,
    valid: false,
    validationMessage: "Invalid format (Contains a character)",
  });
};

const validateString = (data: params): validationInfo => {
  const numbersRegex = /[0-9]/;
  if (data.value.length === 0) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "This field is required",
    });
  }
  if (!numbersRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: true,
      validationMessage: "",
    });
  }
  return (validationInfo = {
    validationName: data.stateName,
    valid: false,
    validationMessage: "Invalid format (contains a number)",
  });
};

const validateName = (data: params): validationInfo => {
  const nameRegex =
    /^(?!.*\d)(?:[A-Za-z\s]+(?:[.,](?![\s]))?)*(?:\s(?:Sr\.|Jr\.))?$/;
  if (data.value.length === 0) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "This field is required",
    });
  }
  if (nameRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: true,
      validationMessage: "",
    });
  }
  return (validationInfo = {
    validationName: data.stateName,
    valid: false,
    validationMessage:
      "Invalid Input. (contains numbers / title before space / Special Characters)",
  });
};

const validateUsername = (data: params): validationInfo => {
  const minLength = 4;

  if (data.value.length > minLength) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: true,
      validationMessage: "",
    });
  }

  return (validationInfo = {
    validationName: data.stateName,
    valid: false,
    validationMessage: "Username is too short. (Minimum of 4 characters)",
  });
};

const validateEmail = (data: params): validationInfo => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: true,
      validationMessage: "",
    });
  }

  return (validationInfo = {
    validationName: data.stateName,
    valid: false,
    validationMessage: "Email is invalid",
  });
};

const validatePassword = (data: params): validationInfo => {
  const minLength = 8;
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  if (data.value.length < minLength) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "Password is too weak. (Minimum of 8 characters)",
    });
  }
  if (!uppercaseRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "Password must contain one uppercase letter.",
    });
  }
  if (!specialCharRegex.test(data.value)) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "Password must contain one special character.",
    });
  }

  return (validationInfo = {
    validationName: data.stateName,
    valid: true,
    validationMessage: "",
  });
};

const validateTimeOrDate = (data: params): validationInfo => {
  if (data.value.length === 0) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "This field is required",
    });
  }

  return (validationInfo = {
    validationName: data.stateName,
    valid: true,
    validationMessage: "",
  });
};

const confirmPassword = (data: params): validationInfo => {
  if (data.value !== data.confirmPassword) {
    return (validationInfo = {
      validationName: data.stateName,
      valid: false,
      validationMessage: "Password don't match",
    });
  }
  return (validationInfo = {
    validationName: data.stateName,
    valid: true,
    validationMessage: "",
  });
};

export const setValidationResult = <T>(
  validation: validationResult,
  setValidation: React.Dispatch<React.SetStateAction<validationState>>
) => {
  setValidation((prev) => ({
    ...prev,
    [validation.validationName]: {
      valid: validation.valid,
      validationMessage: validation.validationMessage,
    },
  }));
};

export default FormValidation;
