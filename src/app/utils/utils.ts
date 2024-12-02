import { FormGroup, Validators } from '@angular/forms';

export function isFieldRequired (
  field: string | string [], form: FormGroup
) {
  if (Array.isArray(field)) {
    return field.some(f => {
      const control = form.get(f);
      if (!control) {
        throw new Error(`El campo "${f}" no existe en el formulario.`);
      }
      return control.hasValidator(Validators.required);
    });
  }
  const control = form.get(field)!;
  return control.hasValidator(Validators.required);
}
