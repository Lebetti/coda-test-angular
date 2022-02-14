import { MiaField } from "@agencycoda/mia-form";
import { MiaColumn } from "@agencycoda/mia-table";
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { TableActionsButtonsComponent } from "../components/table-actions-buttons/table-actions-buttons.component";

export const CLIENT_TABLE_COLUMNS: Array<MiaColumn> = [
    {
        key: "firstname",
        title: "Nombre",
        field_key: "firstname",
        type: "string"
    },
    {
        key: "lastname",
        title: "Apellido",
        field_key: "lastname",
        type: "string"
    },
    {
        key: "email",
        title: "Email",
        field_key: "email",
        type: "string"
    },
    {
        key: "custom",
        title: "Acciones",
        type: "custom",
        extra: { component: TableActionsButtonsComponent }
    }
];

export const CLIENT_FORM_FIELDS: Array<MiaField> = [
    {
        key: "firstname",
        type: MiaField.TYPE_STRING,
        label: "Nombre",
        validators:
            [Validators.required, Validators.pattern("(^[a-zA-Z _.ñáéíóúÁÉÍÓÚÑ]*$)"), Validators.maxLength(30)]
    },
    {
        key: "lastname",
        type: MiaField.TYPE_STRING,
        label: "Apellido",
        validators: [Validators.required, Validators.pattern("(^[a-zA-Z _.ñáéíóúÁÉÍÓÚÑ]*$)"), Validators.maxLength(30)]
    },
    {
        key: "email",
        type: MiaField.TYPE_STRING,
        label: "Email",
        validators: [emailValidator(), Validators.maxLength(50)]
    },
];

export const CLIENT_FORM_FIELDS_ERROR_MESSAGES: Array<{ key: string; message: string; }> = [
    { key: 'required', message: '%label% es un campo requerido.' },
    { key: 'email', message: 'El formato del %label% debe ser ejemplo@ejemplo.com' },
    { key: 'pattern', message: 'El campo %label% solo debe contener letras' },
    { key: 'maxlength', message: '%label% excede la cantidad de caracteres permitida', }
];

function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);
      return !forbidden ? {email: {value: control.value}} : null;
    };
  }