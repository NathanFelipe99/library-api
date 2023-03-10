import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { CustomerProps } from "../../../shared/utils/types/customer/customer.types";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

let customerRepository: ICustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
describe("Create customer use case test", () => {

    beforeEach(() => {
        customerRepository = new CustomerRepositoryInMemory();
        createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
    });
    
    it("should be able to construct and insert a new customer using the useCase", async () => {
        const obj: CustomerProps = {
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        };

        const newCustomer = await createCustomerUseCase.execute(obj);

        expect(newCustomer.id).toBeDefined();
        expect(newCustomer.firstName).toStrictEqual(obj.firstName);
        expect(newCustomer.lastName).toStrictEqual(obj.lastName);
        expect(newCustomer.email).toStrictEqual(obj.email);
        expect(newCustomer.isActive).toEqual(true);
    });

    it("shouldn't be able to create a customer", async () => {
        const firstCustomerObj: CustomerProps = {
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        };

        await createCustomerUseCase.execute(firstCustomerObj);

        const secondCustomerObj: CustomerProps = {
            firstName: "Jane",
            lastName: "Doe",
            email: "john@doe.com",
            password: "12345"
        };

        expect(createCustomerUseCase.execute(secondCustomerObj)).rejects.toBeInstanceOf(Error);
        expect(createCustomerUseCase.execute(secondCustomerObj)).rejects.toThrowError("This email has already been registered! Try another one.");
    });
});