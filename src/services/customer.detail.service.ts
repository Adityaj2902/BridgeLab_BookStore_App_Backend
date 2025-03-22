import { Customer } from '../models/customer.detail.model';
import { ICustomer, IAddress } from './../interfaces/customer.detail.interface';

class CustomerService {
  public addCustomerDetails = async (userId: string, fullName: string, mobileNumber: string, addresses: IAddress[]): Promise<{ success: boolean, message: string, customer?: ICustomer }> => {
    const customer = new Customer({ userId, fullName, mobileNumber, addresses });
    await customer.save();
    return { success: true, message: 'Customer details added successfully', customer };
  };

  public getCustomerDetails = async (userId: string): Promise<{ success: boolean, message: string, customer?: ICustomer }> => {
    const customer = await Customer.findOne({ userId });
    if (!customer) {
      return { success: false, message: 'Customer details not found' };
    }
    return { success: true, message: 'Customer details retrieved successfully', customer };
  };

  public updateCustomerDetails = async (userId: string, fullName: string, mobileNumber: string, addresses: IAddress[]): Promise<{ success: boolean, message: string, customer?: ICustomer }> => {
    const customer = await Customer.findOneAndUpdate({ userId }, { fullName, mobileNumber, addresses }, { new: true });
    if (!customer) {
      return { success: false, message: 'Customer details not found' };
    }
    return { success: true, message: 'Customer details updated successfully', customer };
  };
}

export default CustomerService;