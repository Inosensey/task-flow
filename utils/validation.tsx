type params = {
    type: string,
    value: string
    stateName: string,
}
type validationInfo = {
    valid: boolean,
    validationMessage: string
}

const FormValidation = (data: params):validationInfo => {
    const validationInfo = {
        valid: true,
        validationMessage: ""
    }
    
    if(data.stateName === "firstName" || data.stateName === "lastName") {
        validateName(data.value)
    }
    if(data.stateName === "age") {
        validateAge(data.value)
    }

    return validationInfo
}

const validateAge = (age:string):validationInfo => {
    const numbersRegex = /^[0-9]+$/;
    let validationInfo:validationInfo = {
        valid: false,
        validationMessage: ""
    }
    if(numbersRegex.test(age)) {
        return validationInfo = {
            valid: true,
            validationMessage: ""
        }
    }
    return validationInfo = {
        valid: false,
        validationMessage: "Age should only contain numbers"
    }
}

const validateName = (name:string):validationInfo => {
    const nameRegex = /^(?!.*\d)(?:[A-Za-z]+(?:[.,](?![\s]))?)*(?:\s(?:Sr\.|Jr\.))?$/;
    let validationInfo:validationInfo = {
        valid: false,
        validationMessage: ""
    }
    if(nameRegex.test(name)) {
        return validationInfo = {
            valid: true,
            validationMessage: ""
        }
    }
    return validationInfo = {
        valid: false,
        validationMessage: "Invalid Name. (contains numbers / title before space)"
    }
}

export default FormValidation;