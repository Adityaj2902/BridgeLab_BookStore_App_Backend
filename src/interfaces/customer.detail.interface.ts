export interface IAddress {
    address: string;
    state: string;
    town: string;
  }
  
  export interface ICustomer {
    userId: string;
    fullName: string;
    mobileNumber: string;
    addresses: IAddress[];
  }