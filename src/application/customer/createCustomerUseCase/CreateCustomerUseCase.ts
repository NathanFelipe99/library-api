import Customer from "../../../domain/customer/Customer";
import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CreateCustomerOutput, CustomerProps } from "../../../shared/utils/types/customer/customer.types";

export class CreateCustomerUseCase {
    constructor(
        private readonly _customerRepository: ICustomerRepository
    ) { }
    
    async execute(data: CustomerProps): Promise<CreateCustomerOutput> {
        const customer = new Customer(data);
        await this._customerRepository.create(customer);
        return {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            isActive: customer.isActive
        }
    }
}