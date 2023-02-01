import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { ListAllCustomersUseCase } from "./ListAllCustomersUseCase";
import { CreateCustomerUseCase } from "../createCustomerUseCase/CreateCustomerUseCase";
import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerProps } from "../../../shared/utils/types/customer/customer.types";

let customerRepository: ICustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
let listAllCustomersUseCase: ListAllCustomersUseCase;
describe("List all customers use case test", () => {

    beforeEach(() => {
        customerRepository = new CustomerRepositoryInMemory();
        createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
        listAllCustomersUseCase = new ListAllCustomersUseCase(customerRepository);
    });
    test("verifying type returned", async () => {
        const obj: CustomerProps = {
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        };

        const newCustomer = await createCustomerUseCase.execute(obj);

        const listAllCustomersUseCase = new ListAllCustomersUseCase(customerRepository);
        
        const customers = await listAllCustomersUseCase.execute();

        expect(customers.length).toEqual(1);
        expect(customers.at(-1)?.id).toEqual(newCustomer.id);
        expect(customers.at(-1)?.firstName).toEqual(newCustomer.firstName);
        expect(customers.at(-1)?.lastName).toEqual(newCustomer.lastName);
        expect(customers.at(-1)?.email).toEqual(newCustomer.email);
        expect(customers.at(-1)?.isActive).toEqual(newCustomer?.isActive);
    });
});