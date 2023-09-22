type params = {
  value: string;
  stateName: string;
};
type validationInfo = {
  validationName: string;
  valid: boolean;
  validationMessage: string;
};

const FormValidation = (data: params): validationInfo => {
  let validationResult = {
    validationName: "",
    valid: true,
    validationMessage: "",
  };
  if (data.stateName === "firstName" || data.stateName === "lastName") {
    return (validationResult = validateName(data));
  }
  if (
    data.stateName === "age" ||
    data.stateName === "zip" ||
    data.stateName === "contactNumber"
  ) {
    return (validationResult = validateNumber(data));
  }
  if (
    data.stateName === "gender" ||
    data.stateName === "country" ||
    data.stateName === "state"
  ) {
    return (validationResult = validateString(data));
  }
  if (data.stateName === "username") {
    return (validationResult = validateUsername(data));
  }
  if (data.stateName === "email") {
    return (validationResult = validateEmail(data));
  }
  if (data.stateName === "password") {
    return (validationResult = validatePassword(data));
  }

  return (validationResult = {
    validationName: "",
    valid: false,
    validationMessage: "state name is undefined",
  });
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
    validationMessage: "Invalid Name. (contains numbers / title before space)",
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
      validationName: data.value,
      valid: true,
      validationMessage: "",
    });
  }

  return (validationInfo = {
    validationName: data.value,
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

export default FormValidation;
