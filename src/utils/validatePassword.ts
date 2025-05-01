export interface IPasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): IPasswordValidationResult {
  const validatiions = [
    {
      test: (password: string) => password.length >= 8,
      message: "Password must be at least 8 characters long.",
    },
    {
      test: (password: string) => /[A-Z]/.test(password),
      message: "Password must contain at least one uppercase letter.",
    },
    {
      test: (password: string) => /[a-z]/.test(password),
      message: "Password must contain at least one lowercase letter.",
    },
    {
      test: (password: string) => /\d/.test(password),
      message: "Password must contain at least one number.",
    },
    {
      test: (password: string) =>
        /[!@#$%^&*(),.?":{}|<>_\-\/\\[\]=+]/.test(password),
      message: "Password must contain at least one special character.",
    },
  ];

  const failedValidations = validatiions
    .filter((validation) => !validation.test(password))
    .map((validation) => validation.message);

  return {
    isValid: failedValidations.length === 0,
    errors: failedValidations,
  };
}
