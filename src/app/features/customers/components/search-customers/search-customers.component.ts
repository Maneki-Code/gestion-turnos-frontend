import { Component, inject } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerView } from '../../models/customerView.enum';

@Component({
  selector: 'app-search-customers',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-customers.component.html',
  styleUrl: './search-customers.component.scss',
})
export class SearchCustomersComponent {
  private _customerService = inject(CustomersService);
  private fb = inject(FormBuilder);
  searchCustomerForm: FormGroup = this.fb.group({
    query: ['', Validators.required],
  });
  
  constructor() {}

  search() {
    if (this.searchCustomerForm.valid) {
      const query = this.searchCustomerForm.get('query')?.value;
      if (query) {
        this._customerService.searchCustomers(query).subscribe({
          /**Mostrar Errores uwu */
        });
      }
    }
  }

  
}
