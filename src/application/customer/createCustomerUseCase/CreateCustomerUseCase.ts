import Customer from "../../../domain/customer/Customer";
import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerOutput, CustomerProps } from "../../../shared/utils/types/customer/customer.types";
import { hashSync } from "bcryptjs";

export class CreateCustomerUseCase {
    constructor(
        private readonly _customerRepository: ICustomerRepository
    ) { }

    async execute(data: CustomerProps): Promise<CustomerOutput> {
        const { firstName, lastName, email, password } = data;
        const customerEmailExists = await this._customerRepository.findByEmail(email);
        if (customerEmailExists) throw new Error("This email has already been registered! Try another one.");

        const hash = hashSync(password, 8);
        const customer = new Customer({ firstName, lastName, email, password: hash });
        await this._customerRepository.create(customer);
        return customer.toJSON();
    }
}