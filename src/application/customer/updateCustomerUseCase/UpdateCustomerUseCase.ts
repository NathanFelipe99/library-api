import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { IUpdateCustomerDTO } from "../../../infra/database/repositories/customer/dtos/IUpdateCustomerDTO";
import { CustomerOutput } from "../../../shared/utils/types/customer/customer.types";

export class UpdateCustomerUseCase {
    constructor(
        private readonly _customerRepository: ICustomerRepository
    ) { }

    async execute(id: string, data: IUpdateCustomerDTO): Promise<CustomerOutput> {
        const customerExists = await this._customerRepository.findByID(id);
        if (!customerExists) throw new Error("Customer not exists");

        const customerEmailExists = await this._customerRepository.findByEmail(data.email);
        if (customerEmailExists && (customerEmailExists.id !== customerExists.id)) throw new Error("Customer email already exists");

        const customer = await this._customerRepository.update(id, data);
        return customer;
    }
}