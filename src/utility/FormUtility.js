export const convertStateToArrayOfFormObjects = formObject => {
  const formElementsArray = [];
  for (let key in formObject) {
    formElementsArray.push({
      id: key,
      config: formObject[key]
    });
  }
  return formElementsArray;
};

const checkValidity = (value, validation) => {
  let validationObject = {
    isValid: true,
    errorMessage: ""
  };

  if (validation) {
    if (validation.required) {
      validationObject.isValid = value.trim() !== "";
      validationObject.errorMessage = validationObject.isValid
        ? ""
        : "Field is required";
    }

    if (validationObject.isValid && validation.maxLength) {
      validationObject.isValid = value.length <= 30;
      validationObject.errorMessage = "Not allowed more than 30 charactes";
    }

    return validationObject;
  } else {
    return validationObject;
  }
};

export const executeValidationAndReturnFormElement = (
  event,
  updatedForm,
  id
) => {
  let formElement = { ...updatedForm[id] };
  formElement.value = id === "dateOfBirth" ? event : event.target.value;
  formElement.touched = true;

  const validationResponse = checkValidity(
    formElement.value,
    formElement.validation
  );

  formElement.valid = validationResponse.isValid;
  formElement.errorMessage = validationResponse.errorMessage;

  return formElement;
};

export const countInvalidElements = form => {
  let countInvalidElements = 0;
  for (let element in form) {
    if (!form[element].valid) {
      countInvalidElements = countInvalidElements + 1;
      break;
    }
  }
  return countInvalidElements;
};
