import Customer from "../../../domain/customer/Customer";
import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerOutput, CustomerProps } from "../../../shared/utils/types/customer/customer.types";

export class CreateCustomerUseCase {
    constructor(
        private readonly _customerRepository: ICustomerRepository
    ) { }
    
    async execute(data: CustomerProps): Promise<CustomerOutput> {
        const customer = new Customer(data);
        await this._customerRepository.create(customer);
        return customer.toJSON();
    }
}