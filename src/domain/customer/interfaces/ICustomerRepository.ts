import Customer from "../Customer";

export interface ICustomerRepository {
    create(data: Customer): Promise<void>;
    update(data: Customer): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findByID(id: string): Promise<Customer | undefined>;
    findByEmail(email: string): Promise<Customer | undefined>;
    inactivate(id: string): Promise<void>;
    delete(id: string): Promise<void>;
}