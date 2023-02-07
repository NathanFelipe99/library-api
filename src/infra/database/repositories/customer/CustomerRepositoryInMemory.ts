import Customer from "../../../../domain/customer/Customer";
import { ICustomerRepository } from "../../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerOutput } from "../../../../shared/utils/types/customer/customer.types";
import { IUpdateCustomerDTO } from "./dtos/IUpdateCustomerDTO";

export class CustomerRepositoryInMemory implements ICustomerRepository {
    customers: Customer[] = [];

    async create(data: Customer): Promise<void> {
        this.customers.push(data);
    }

    async update(id: string, data: IUpdateCustomerDTO): Promise<CustomerOutput> {
        const { firstName, lastName, email } = data;
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        firstName && this.customers[customerIndex].updateFirstName(firstName);
        lastName && this.customers[customerIndex].updateLastName(lastName);
        this.customers[customerIndex].updateEmail(email);

        return this.customers[customerIndex].toJSON();
    }
    async findAll(): Promise<Customer[]> {
        return this.customers;
    }

    async findByID(id: string): Promise<Customer> {
        return this.customers.find(customer => customer.id === id) as Customer;
    }

    async findByEmail(email: string): Promise<Customer> {
        return this.customers.find(customer => customer.email.toLowerCase() === email.toLowerCase()) as Customer;
    }
    
    setStatus(id: string, isActive: boolean): void {
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        this.customers[customerIndex].setCustomerStatus(isActive);
    }

    delete(id: string): void {
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        this.customers.splice(customerIndex, 1);
    }

}