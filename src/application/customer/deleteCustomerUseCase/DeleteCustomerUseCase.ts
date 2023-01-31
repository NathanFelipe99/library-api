import { ICustomerRepository } from "./../../../domain/customer/interfaces/ICustomerRepository";
export class DeleteCustomerUseCase {
    constructor(
        private readonly _customerRepository: ICustomerRepository
    ) { }
    
    async execute(id: string): Promise<void> {
        await this._customerRepository.delete(id);
    }
}