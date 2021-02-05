import { Component } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myDate: String = new Date().toISOString();

  contactos = JSON.parse(localStorage.getItem('contactos')!) || [];

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(35),
      ]),
      fechaNacimiento: new FormControl(''),
      numeroTel: new FormControl('', Validators.required),
      tipoTelefono: new FormControl(''),
      esPrincipal: new FormControl(''),
    });
  }

  contactForm: FormGroup;

  constructor() {
    this.contactForm = this.createFormGroup();
  }

  onResetForm() {
    this.contactForm.reset();
  }

  calculateAge() {
    let currentDate = new Date();
    let bornDate = new Date(this.contactForm.get('fechaNacimiento').value);

    console.log(currentDate.getFullYear());
    console.log(bornDate.getFullYear());
  }

  guardarContato() {
    if (this.contactForm.valid) {
      this.contactos.push(this.contactForm.value);
      localStorage.setItem('contactos', JSON.stringify(this.contactForm.value));
      this.onResetForm();
    } else {
      console.log('Formulario no valido');
    }
  }

  get nombre() {
    return this.contactForm.get('nombre');
  }
  get fechaNacimiento() {
    return this.contactForm.get('fechaNacimiento');
  }
  get numeroTel() {
    return this.contactForm.get('numeroTel');
  }
  get tipoTelefono() {
    return this.contactForm.get('tipoTelefono');
  }
  get esPrincipal() {
    return this.contactForm.get('esPrincipal');
  }
}
