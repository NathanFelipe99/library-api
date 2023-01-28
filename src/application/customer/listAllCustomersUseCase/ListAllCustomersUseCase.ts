import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerOutput } from "../../../shared/utils/types/customer/customer.types";

export class ListAllCustomersUseCase {
    constructor(
        private readonly _customerRepository: ICustomerRepository
    ) { }
    
    async execute(): Promise<CustomerOutput[]> {
        const customers = await this._customerRepository.findAll();
        return customers.map(customer => customer.toJSON());
    }
}