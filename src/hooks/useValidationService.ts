import { useCallback } from "react";
import { parse as dateFnsParse, isAfter, isDate, isMatch } from "date-fns";
import * as yup from "yup";

const getTextFieldSchema = (fieldName: string, label: string) =>
  yup.object({
    [fieldName]: yup
      .string()
      .required(`${label} is required`)
      .min(
        2,
        `${label} must be 2+ characters in length. Valid characters include A-Z. Space, hyphen, and apostrophe are the only special characters accepted.`
      )
      .max(50, `${label} must be 50 characters or less`)
      .matches(
        /^[A-Za-z- '`‘’]+$/,
        `${label} must be 2+ characters in length. Valid characters include A-Z. Space, hyphen, and apostrophe are the only special characters accepted.`
      ),
  });

type AnyObject = Record<string, any>;

function getProp(
  object: AnyObject,
  keys: string | string[],
  defaultVal?: any
): any {
  const path = Array.isArray(keys) ? keys : keys.split(".");
  let result = object;
  for (const key of path) {
    if (result == null) return defaultVal;
    result = result[key];
  }
  return result === undefined ? defaultVal : result;
}

function setProp(object: AnyObject, keys: string | string[], val: any): any {
  const path = Array.isArray(keys) ? keys : keys.split(".");
  let current = object;
  for (let i = 0; i < path.length; i++) {
    const key = path[i];
    if (i === path.length - 1) {
      current[key] = val;
    } else {
      if (!current[key] || typeof current[key] !== "object") {
        current[key] = {};
      }
      current = current[key];
    }
  }
  return val;
}

type ValidationFunction = (...args: any[]) => string | null;
type ValidationConfig = {
  name: string;
  validator: ValidationFunction;
  args?: any[];
};

const useValidationService = () => {
  // Validation functions wrapped in useCallback for stable references

  const validateRequired = useCallback(
    (field: any, label = "Field"): string | null => {
      if (!field) {
        return `${label} is required`;
      }
      return null;
    },
    []
  );

  const validateRequiredIf = useCallback(
    (isRequired: boolean) =>
      (field: any, label = "Field"): string | null => {
        if (!field && isRequired) {
          return `${label} is required`;
        }
        return null;
      },
    []
  );

  const validateBeneficiary = useCallback(
    (
      username: string,
      label = "Relationship to Beneficiary"
    ): string | null => {
      if (username && username.length > 40) {
        return `${label} must be 40 characters or less`;
      }
      return null;
    },
    []
  );

  const validateName = useCallback(
    (username: string, label = "firstName"): string | null => {
      try {
        getTextFieldSchema(label, label).validateSync(
          { [label]: username },
          { abortEarly: false }
        );
        return null;
      } catch (error: any) {
        return error.errors?.[0] ?? "Invalid value";
      }
    },
    []
  );

  const validateUsername = useCallback(
    (username: string, label = "NPN"): string | null => {
      if (username && !/^[0-9A-Za-z!@.,;:'"?-]{2,}$/.test(username)) {
        return `${label} must be 2 characters or more`;
      }
      if (username && !/^[0-9A-Za-z!@.,;:'"?-]{2,50}$/.test(username)) {
        return `${label} must be 50 characters or less`;
      }
      return validateRequired(username, label);
    },
    [validateRequired]
  );

  const validatePasswordAccess = useCallback(
    (password: string, label = "Password"): string | null => {
      return validateRequired(password, label);
    },
    [validateRequired]
  );

  const composeValidator = useCallback(
    (validators: ValidationFunction[] = []) =>
      (...validatorArgs: any[]): string | null =>
        validators.reduce<string | null>((result, validator) => {
          if (result) return result;
          return validator(...validatorArgs);
        }, null),
    []
  );

  const validatePasswordCreation = useCallback(
    (password: string, label = "Password"): string | null =>
      composeValidator([
        validateRequired,
        () => {
          if (password.length < 8) {
            return `${label} must be at least 8 characters long`;
          } else if (!/[A-Z]/.test(password)) {
            return `${label} must include at least one uppercase letter`;
          } else if (!/[a-z]/.test(password)) {
            return `${label} must include at least one lowercase letter`;
          } else if (!/[0-9]/.test(password)) {
            return `${label} must include at least one number`;
          } else if (!/[^a-zA-Z\d\s:]/.test(password)) {
            return `${label} must include at least one non-alphanumeric character`;
          } else {
            return null;
          }
        },
      ])(password, label),
    [composeValidator, validateRequired]
  );

  const validateFieldMatch = useCallback(
    (matchingField: any) =>
      (field: any, label = "Passwords"): string | null => {
        if (field !== matchingField) {
          return `${label} must match`;
        }
        return null;
      },
    []
  );

  const validateEmail = useCallback(
    (email: string, label = "Email Address"): string | null => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (email && !re.test(String(email).toLowerCase())) {
        return `${label} must be a valid address`;
      }
      return null;
    },
    []
  );

  const validateCaliforniaLicenseNumber = useCallback(
    (
      licenseNumber: string,
      label = "California License Number (CLN)"
    ): string | null => {
      const alphanumericRegex = /^[a-z0-9]+$/i;
      if (!licenseNumber) return null;
      if (licenseNumber.length < 7 || licenseNumber.length > 13) {
        return `${label} must be between 7 and 13 characters long.`;
      }
      if (!alphanumericRegex.test(licenseNumber)) {
        return `${label} must contain only alphanumeric characters.`;
      }
      return null;
    },
    []
  );

  const validateMedicalBeneficiaryId = useCallback(
    (mbiId?: string | null): string | null => {
      if (!mbiId) return null;
      const formattedId = String(mbiId).toUpperCase().replace(/-/g, "");
      const validPattern =
        /^[1-9][AC-HJ-KM-NP-RT-Y][AC-HJ-KM-NP-RT-Y0-9][0-9][AC-HJ-KM-NP-RT-Y][AC-HJ-KM-NP-RT-Y0-9][0-9][AC-HJ-KM-NP-RT-Y][AC-HJ-KM-NP-RT-Y][0-9][0-9]$/;
      const isValid = validPattern.test(formattedId);
      return isValid || mbiId === "" ? null : "Invalid Medicare Number";
    },
    []
  );

  const validatePhone = useCallback(
    (phoneNumber: string, label = "Phone Number"): string | null => {
      const cleaned = `${phoneNumber}`.replace(/\D/g, "");
      if (phoneNumber && cleaned.length !== 10) {
        return `${label} must be a valid 10-digit phone number`;
      }
      return null;
    },
    []
  );

  const validateDate = useCallback(
    (dateStr: string, label = "Date"): string | null => {
      const parsed = dateFnsParse(dateStr, "MM/dd/yyyy", new Date());
      if (dateStr && (dateStr.length < 10 || !isDate(parsed))) {
        return `${label} must use the format MM/DD/YYYY`;
      }
      return null;
    },
    []
  );

  const validateDateInput = useCallback(
    (dateStr: string, label = "Date", format = "MM/dd/yyyy"): string | null => {
      if (dateStr && !isMatch(dateStr, format)) {
        return `${label} must use the format MM/DD/YYYY`;
      } else if (dateStr && isAfter(new Date(dateStr), new Date())) {
        return `${label} must be valid`;
      }
      return null;
    },
    []
  );

  const validatePostalCode = useCallback(
    (inputStr: string, label = "Zip Code"): string | null => {
      if (inputStr && !/^[0-9]{5}$/.test(inputStr)) {
        return `${label} must be 5 digits long`;
      }
      return null;
    },
    []
  );

  const validateState = useCallback(
    (inputStr: string, label = "State Code"): string | null => {
      if (inputStr && !/^[A-Za-z]{2}$/.test(inputStr)) {
        return `${label} must be 2 characters only`;
      }
      return null;
    },
    []
  );

  const validateAddress = useCallback(
    (inputStr: string, label = "Address"): string | null => {
      if (inputStr && !/^[0-9a-zA-Z #'.,-]{2,}$/.test(inputStr)) {
        return `${label} must be 2 characters or more, Only Alpha, Numerical, and certain special characters such as # ' . - are allowed`;
      }
      return null;
    },
    []
  );

  const validateMultiple = useCallback(
    (
      validations: ValidationConfig[],
      values: AnyObject,
      errorsObj: AnyObject = {}
    ): AnyObject => {
      return validations.reduce((currErrs, { validator, name, args = [] }) => {
        const result = validator(getProp(values, name), ...args);
        if (result === null) {
          return currErrs;
        }
        const errors = { ...currErrs };
        setProp(errors, name, result);
        return errors;
      }, errorsObj);
    },
    []
  );

  const standardizeValidationKeys = useCallback(
    (errorsArr: AnyObject[]): AnyObject[] => {
      errorsArr.forEach((el) => {
        if (el.hasOwnProperty("Key")) {
          el["Key"] = el["Key"].charAt(0).toLowerCase() + el["Key"].slice(1);
        }
      });
      return errorsArr;
    },
    []
  );

  const formikErrorsFor = useCallback((errorsArr: AnyObject[]): AnyObject => {
    const formikErrors: AnyObject = {};
    errorsArr.forEach((el) => {
      if (el.hasOwnProperty("Key")) {
        formikErrors[el["Key"]] = el["Value"];
      } else if (el.hasOwnProperty("key")) {
        formikErrors[el["key"]] = el["value"];
      }
    });
    return formikErrors;
  }, []);

  return {
    validateRequired,
    validateRequiredIf,
    validateBeneficiary,
    validateName,
    validateUsername,
    validatePasswordAccess,
    validatePasswordCreation,
    validateFieldMatch,
    validateEmail,
    validateCaliforniaLicenseNumber,
    validateMedicalBeneficiaryId,
    validatePhone,
    validateDate,
    validateDateInput,
    validatePostalCode,
    validateState,
    validateAddress,
    composeValidator,
    validateMultiple,
    standardizeValidationKeys,
    formikErrorsFor,
  };
};

export default useValidationService;
