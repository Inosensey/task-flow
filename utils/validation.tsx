type params = {
  value: string;
  stateName: string;
};
type validationInfo = {
  valid: boolean;
  validationMessage: string;
};

const FormValidation = (data: params): validationInfo => {
  let validationResult = {
    valid: true,
    validationMessage: "",
  };

  if (data.stateName === "firstName" || data.stateName === "lastName") {
    return validationResult = validateName(data.value);
  }
  if (data.stateName === "age" || data.stateName === "zip") {
    return validationResult = validateNumber(data.value);
  }
  if (data.stateName === "gender") {
    return validationResult = validateString(data.value);
  }
  if (data.stateName === "username") {
    return validationResult = validateUsername(data.value);
  }
  if (data.stateName === "email") {
    return validationResult = validateEmail(data.value);
  }
  if (data.stateName === "password") {
    return validationResult = validatePassword(data.value);
  }

  return (validationResult = {
    valid: false,
    validationMessage: "state name is undefined",
  });
};

const validateNumber = (value: string): validationInfo => {
  const numbersRegex = /^[0-9]+$/;
  let validationInfo: validationInfo = {
    valid: false,
    validationMessage: "",
  };
  if (numbersRegex.test(value)) {
    return (validationInfo = {
      valid: true,
      validationMessage: "",
    });
  }
  return (validationInfo = {
    valid: false,
    validationMessage: "Invalid format (Contains a character)",
  });
};

const validateString = (value: string): validationInfo => {
  const numbersRegex = /[0-9]/;
  let validationInfo: validationInfo = {
    valid: false,
    validationMessage: "",
  };
  if (!numbersRegex.test(value)) {
    return (validationInfo = {
      valid: true,
      validationMessage: "",
    });
  }
  return (validationInfo = {
    valid: false,
    validationMessage: "Invalid format (contains a number)",
  });
};

const validateName = (name: string): validationInfo => {
  const nameRegex =
    /^(?!.*\d)(?:[A-Za-z]+(?:[.,](?![\s]))?)*(?:\s(?:Sr\.|Jr\.))?$/;
  let validationInfo: validationInfo = {
    valid: false,
    validationMessage: "",
  };
  if (nameRegex.test(name)) {
    return (validationInfo = {
      valid: true,
      validationMessage: "",
    });
  }
  return (validationInfo = {
    valid: false,
    validationMessage: "Invalid Name. (contains numbers / title before space)",
  });
};

const validateUsername = (username: string): validationInfo => {
  let validationInfo: validationInfo = {
    valid: false,
    validationMessage: "",
  };
  const minLength = 4;

  if (username.length > minLength) {
    return (validationInfo = {
      valid: true,
      validationMessage: "",
    });
  }

  return (validationInfo = {
    valid: false,
    validationMessage: "Username is too short. (Minimum of 4 characters)",
  });
};

const validateEmail = (email: string): validationInfo => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let validationInfo: validationInfo = {
    valid: false,
    validationMessage: "",
  };

  if (emailRegex.test(email)) {
    return (validationInfo = {
      valid: true,
      validationMessage: "",
    });
  }

  return (validationInfo = {
    valid: false,
    validationMessage: "Email is invalid",
  });
};

const validatePassword = (password: string): validationInfo => {
  let validationInfo: validationInfo = {
    valid: false,
    validationMessage: "",
  };
  const minLength = 8;
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  if (password.length < minLength) {
    return (validationInfo = {
      valid: false,
      validationMessage: "Password is too weak. (Minimum of 8 characters)",
    });
  }
  if (!uppercaseRegex.test(password)) {
    return (validationInfo = {
      valid: false,
      validationMessage: "Password must contain one uppercase letter.",
    });
  }
  if (!specialCharRegex.test(password)) {
    return (validationInfo = {
      valid: false,
      validationMessage: "Password must contain one special character.",
    });
  }

  return (validationInfo = {
    valid: true,
    validationMessage: "",
  });
};

export default FormValidation;
