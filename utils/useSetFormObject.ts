const SetFormObject = (formData: FormData) => {
    let formObject:Record<string, any> = {};;
    for (const [key, value] of formData.entries()) {
        formObject[key] = value;
    }
    return formObject;
};

export default SetFormObject;
