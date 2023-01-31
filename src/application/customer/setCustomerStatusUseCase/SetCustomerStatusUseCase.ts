import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";

export class SetCustomerStatusUseCase {
    constructor(
        private readonly _customerRepository: ICustomerRepository
    ) { }
    
    async execute(id: string, isActive: boolean): Promise<void> {
        await this._customerRepository.setStatus(id, isActive);
    }
}