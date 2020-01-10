export const returnInputConfigurationStudent = () => {
  return {
    name: {
      element: "input",
      type: "text",
      value: "",
      validation: { required: true, maxLength: 30 },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Name:"
    },

    surname: {
      element: "input",
      type: "text",
      value: "",
      validation: { required: true, maxLength: 30 },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Surname:"
    },
    phoneno: {
      element: "input",
      type: "text",
      value: "",
      validation: { required: true, maxLength: 20 },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Phone Number:"
    }
  };
};

export const returnInputConfigurationSubject = () => {
  return {
    description: {
      element: "input",
      type: "text",
      value: "",
      validation: { required: true, maxLength: 30 },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Description:"
    },
    coursesNo: {
      element: "input",
      type: "text",
      value: "",
      validation: { required: true, maxLength: 30 },
      valid: false,
      touched: false,
      errorMessage: "",
      label: "Courses Number:"
    }
  };
};
