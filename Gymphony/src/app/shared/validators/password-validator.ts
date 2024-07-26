import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const errors: ValidationErrors = { };

    if (!/[A-Z]/.test(value)) {
      errors['uppercase'] = true;
    }

    if (!/[a-z]/.test(value)) {
      errors['lowercase'] = true;
    }

    if (!/[0-9]/.test(value)) {
      errors['digit'] = true;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors['specialCharacter'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}
