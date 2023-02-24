export function validator(data, config) {
  const errors = {};

  function validate(validateMethod, data, config) {
    let statusWrongValidate = false;
    switch (validateMethod) {
      case "isRequired":
        if (typeof data === "boolean") {
          statusWrongValidate = !data;
        } else if (typeof data === "object") {
          if (data) {
            let isAllObjectValuesEmpty = true;
            Object.values(data).forEach((value) => {
              isAllObjectValuesEmpty &= !value;
            });
            statusWrongValidate = isAllObjectValuesEmpty;
          } else {
            statusWrongValidate = !data;
          }
        } else {
          statusWrongValidate = data.trim() === "";
        }

        break;
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusWrongValidate = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalRegExp = /[A-Z]+/g;
        statusWrongValidate = !capitalRegExp.test(data);
        break;
      }
      case "isContainDigit": {
        const digitRegExp = /\d+/g;
        statusWrongValidate = !digitRegExp.test(data);
        break;
      }
      case "min":
        statusWrongValidate = data.length < config.value;
        break;
      case "max":
        statusWrongValidate = data.length > config.value;
        break;
      case "isOnlyDigits": {
        const digitRegExp = /^\d+$/g;
        statusWrongValidate = !digitRegExp.test(data);
        break;
      }
      case "isPositiveDigit": {
        const value = Number(data);
        if (Number.isNaN(value)) {
          statusWrongValidate = true;
        } else {
          statusWrongValidate = value <= 0;
        }

        break;
      }
      default:
        break;
    }
    if (statusWrongValidate) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) errors[fieldName] = error;
    }
  }

  return errors;
}
