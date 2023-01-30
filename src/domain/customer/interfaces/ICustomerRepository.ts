import { IUpdateCustomerDTO } from "../../../infra/database/repositories/customer/dtos/IUpdateCustomerDTO";
import { CustomerOutput } from "../../../shared/utils/types/customer/customer.types";
import Customer from "../Customer";
export interface ICustomerRepository {
    create(data: Customer): Promise<void>;
    update(id: string, data: IUpdateCustomerDTO): Promise<CustomerOutput>;
    findAll(): Promise<Customer[]>;
    findByID(id: string): Promise<Customer>;
    findByEmail(email: string): Promise<Customer>;
    inactivate(id: string): Promise<void>;
    delete(id: string): Promise<void>;
}