// Note: fields are matched by NAME only. Any new secret form field (e.g. a pin
// or an otp) must be added here, otherwise it is echoed back after a failed submission.
const SENSITIVE_FORM_FIELDS = [
  "password",
  "confirmPassword",
  "currentPassword",
  "newPassword",
] as const;

export { SENSITIVE_FORM_FIELDS };
