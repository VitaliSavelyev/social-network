import { AbstractControl } from '@angular/forms';

export function AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value) {
    const dateNeed = Math.abs(new Date(Date.now() - control.value).getFullYear()-1970)
    if(dateNeed < 18 || dateNeed > 65){
      return { 'ageControl': true };
    }
  }
  return null;
}
