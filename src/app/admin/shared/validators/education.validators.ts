import {AbstractControl} from '@angular/forms';

export function EduValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.get('dateEnd')?.value && control.get('dateEntry')?.value) {
      if (control.get('dateEnd')?.value - control.get('dateEntry')?.value <= 0)
        return { 'eduControl': true };
    } else {
      return null;
    }
    return null;
  }
