import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerOutput } from "../../../shared/utils/types/customer/customer.types";

export class FindCustomerByIdUseCase {
    constructor(
        private readonly _customerRepository: ICustomerRepository
    ) { }
    
    async execute(id: string): Promise<CustomerOutput> {
        const customer = await this._customerRepository.findByID(id);
        return customer.toJSON();
    }
}