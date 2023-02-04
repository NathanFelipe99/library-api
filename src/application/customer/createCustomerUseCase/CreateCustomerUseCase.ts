import Customer from "../../../domain/customer/Customer";
import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerOutput, CustomerProps } from "../../../shared/utils/types/customer/customer.types";

export class CreateCustomerUseCase {
    constructor(
        private readonly _customerRepository: ICustomerRepository
    ) { }
    
    async execute(data: CustomerProps): Promise<CustomerOutput> {
        const { email } = data;
        const customerEmailExists = await this._customerRepository.findByEmail(email);
        if (customerEmailExists) throw new Error("This email has already been registered! Try another one.");

        const customer = new Customer(data);
        await this._customerRepository.create(customer);
        return customer.toJSON();
    }
}