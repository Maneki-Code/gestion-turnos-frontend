import { Component, inject } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import {
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerForCreationDto } from '../../models/customerForCreationDto.dto';
import { CommonModule } from '@angular/common';
import { CustomerView } from '../../models/customerView.enum';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss',
})
export class CreateCustomerComponent {
  private _customerService = inject(CustomersService);
  private fb = inject(FormBuilder);
  customerForm: FormGroup = this.fb.group({
    firstName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern(/^(\+54\d{9,10}|\d{10,11})$/)],
    ],
    email: ['', [Validators.email]],
  });

  constructor() {}

  create() {
    if (this.customerForm.valid) {
      const customerDto: CustomerForCreationDto = {
        firstName: this.customerForm.value.firstName,
        lastName: this.customerForm.value.lastName,
        phoneNumber: this.customerForm.value.phoneNumber,
        email: this.customerForm.value.email || undefined,
      };
      console.log('Customer DTO:', customerDto);
      this._customerService.createCustomer(customerDto).subscribe({
        next: (response) => console.log('Cliente creado:', response),
        error: (error) => console.error('Error al crear cliente:', error),
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  back() {
    this._customerService.currentView.next(CustomerView.LIST);
  }
}
