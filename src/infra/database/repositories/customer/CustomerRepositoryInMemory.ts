import Customer from "../../../../domain/customer/Customer";
import { ICustomerRepository } from "../../../../domain/customer/interfaces/ICustomerRepository";

export class CustomerRepositoryInMemory implements ICustomerRepository {
    customers: Customer[] = [];

    async create(data: Customer): Promise<void> {
        this.customers.push(data);
    }

    async update(data: Customer): Promise<Customer> {
        const { id, firstName, lastName, email } = data;
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        this.customers[customerIndex].updateFirstName(firstName);
        this.customers[customerIndex].updateLastName(lastName);
        this.customers[customerIndex].updateEmail(email);

        return this.customers[customerIndex];
    }
    async findAll(): Promise<Customer[]> {
        return this.customers;
    }

    async findByID(id: string): Promise<Customer | undefined> {
        return this.customers.find(customer => customer.id === id);
    }

    async findByEmail(email: string): Promise<Customer | undefined> {
        return this.customers.find(customer => customer.email === email);
    }
    
    async inactivate(id: string): Promise<void> {
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        this.customers[customerIndex].inactivateCustomer(false);
    }

    async delete(id: string): Promise<void> {
        const customerIndex = this.customers.findIndex(customer => customer.id === id);
        this.customers.splice(customerIndex, 1);
    }

}