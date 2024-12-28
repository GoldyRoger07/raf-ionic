import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (matchingControl?.errors && !matchingControl.errors['passwordmismatch']) {
      // Return if another validator has already found an error on the matchingControl
      return null;
    }

    // Set error on matchingControl if validation fails
    if (control?.value !== matchingControl?.value) {
      matchingControl?.setErrors({ passwordmismatch: true });
      return { passwordmismatch: true };
    } else {
      matchingControl?.setErrors(null);
      return null;
    }
  };
}
