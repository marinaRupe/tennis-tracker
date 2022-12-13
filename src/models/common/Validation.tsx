export class Validation<T extends Record<string, unknown> = Record<string, unknown>> {
  isValid: boolean;
  errors: Partial<Record<keyof T, string | undefined>>;

  constructor(errors: Partial<Record<keyof T, string | undefined>>) {
    this.isValid = Object.keys(errors).length === 0;
    this.errors = errors;
  }
}
