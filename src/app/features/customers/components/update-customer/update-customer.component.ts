import { Component, inject } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerForUpdateDto } from '../../models/customerForUpdateDto.dto';
import { CustomerView } from '../../models/customerView.enum';

@Component({
  selector: 'app-update-customer',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-customer.component.html',
  styleUrl: './update-customer.component.scss'
})
export class UpdateCustomerComponent {
  private _customerService = inject(CustomersService);
  private fb = inject(FormBuilder);
  customerForm: FormGroup = this.fb.group({
    id:0,
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    phoneNumber: ['', [ Validators.required, Validators.pattern(/^(\+54\d{9,10}|\d{10,11})$/)]],
    email: ['', [Validators.email]]
  });

  ngOnInit() {
    this._customerService.customerForUpdate.subscribe((customer) => {
      if (customer) {
        this.customerForm.patchValue(customer);
      }
    });
  }

  update(){
    if (this.customerForm.valid) {
      const customerDto: CustomerForUpdateDto = {
        id: this.customerForm.value.id,
        firstName: this.customerForm.value.firstName,
        lastName: this.customerForm.value.lastName,
        phoneNumber: this.customerForm.value.phoneNumber,
        email: this.customerForm.value.email || undefined, 
      };
      console.log('Customer DTO:', customerDto);
      this._customerService.updateCustomer(customerDto).subscribe({
        next: (response) => console.log('Cliente creado:', response),
        error: (error) => console.error('Error al crear cliente:', error),
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  back(){
    this._customerService.currentView.next(CustomerView.LIST);
  }
}
