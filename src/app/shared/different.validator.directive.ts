import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { Directive, Input } from '@angular/core';

/*@Directive({
    selector: '[appDifferentValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: appDifferentValidatorDirective,
        multi: true
    }]
})

export class DifferentValidatorDirective implements Validator {
    @Input() appDifferentValidator: string;
    validate(control: AbstractControl): { [key: string]: any } | null {
        const controlToCompare = control.parent.get(this.appDifferentValidator);
        if (controlToCompare && controlToCompare.value === control.value) {
            return { 'notEqual': true };
        }

        return null;
    }
}*/