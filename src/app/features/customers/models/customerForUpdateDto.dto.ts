export interface CustomerForUpdateDto{
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}