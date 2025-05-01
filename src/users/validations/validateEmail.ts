export interface IEmailValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateEmail(email: string): IEmailValidationResult {
  const errors: string[] = [];

  if (typeof email !== "string" || email.trim().length === 0) {
    errors.push("Email must be a non-empty string.");
    return {
      isValid: false,
      errors,
    };
  }

  const validations = [
    {
      test: (email: string) => email.length > 0,
      message: "Email cannot be empty.",
    },
    {
      test: (email: string) => email.includes("@"),
      message: "Email must contain an @ symbol.",
    },
    {
      test: (email: string) => email.split("@")[0].length > 0,
      message: "Email must contain a local part before the @ symbol.",
    },
    {
      test: (email: string) => email.split("@")[1]?.length > 0,
      message: "Email must contain a domain after the @ symbol.",
    },
    {
      test: (email: string) => email.split("@")[1]?.includes("."),
      message: "Email domain must contain a dot.",
    },
  ];

  const failedValidations = validations
    .filter((validation) => !validation.test(email))
    .map((validation) => validation.message);

  return {
    isValid: failedValidations.length === 0,
    errors: failedValidations,
  };
}
