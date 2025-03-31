export interface CustomerResponse{
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}

export const INITIAL_CUSTOMERS: CustomerResponse[] = [
  {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  }
];

export const INITIAL_CUSTOMER_FOR_UPDATE = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
}