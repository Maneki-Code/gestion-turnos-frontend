import { Component, inject } from '@angular/core';
import { ListCustomersComponent } from "./components/list-customers/list-customers.component";
import { SearchCustomersComponent } from "./components/search-customers/search-customers.component";
import { CreateCustomerComponent } from "./components/create-customer/create-customer.component";
import { UpdateCustomerComponent } from "./components/update-customer/update-customer.component";
import { CustomerView } from './models/customerView.enum';
import { CustomersService } from './services/customers.service';


@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [ListCustomersComponent, SearchCustomersComponent, CreateCustomerComponent, UpdateCustomerComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  currentView:CustomerView = CustomerView.LIST;
  private _customerService = inject(CustomersService);

  ngOnInit(){
    this._customerService.currentView.subscribe((view:CustomerView) => this.currentView = view);
  }
}
