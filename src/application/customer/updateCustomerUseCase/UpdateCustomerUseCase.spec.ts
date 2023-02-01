import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { CustomerProps } from "../../../shared/utils/types/customer/customer.types";
import { CreateCustomerUseCase } from "../createCustomerUseCase/CreateCustomerUseCase";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";
import { FindCustomerByIdUseCase } from "./../findCustomerByIdUseCase/FindCustomerByIdUseCase";

let customerRepository: ICustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
let updateCustomerUseCase: UpdateCustomerUseCase;
let findCustomerByIdUseCase: FindCustomerByIdUseCase;

describe("Updating a customer", () => {

    beforeEach(() => {
        customerRepository = new CustomerRepositoryInMemory();
        updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
        createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
        findCustomerByIdUseCase = new FindCustomerByIdUseCase(customerRepository);
    });

    it("should be able to update a customer", async () => {
        const obj: CustomerProps = {
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        };

        const newCustomer = await createCustomerUseCase.execute(obj);

        const updatedCustomer = await updateCustomerUseCase.execute(newCustomer.id, {
            firstName: "Jane",
            email: "jane@doe.com"
        });

        const findUpdatedCustomer = await findCustomerByIdUseCase.execute(updatedCustomer.id);

        expect(updatedCustomer.firstName).toEqual(findUpdatedCustomer.firstName);
        expect(updatedCustomer.email).toEqual(findUpdatedCustomer.email);

    });

    it("shouldn't be able to update a customer because customer ID not exists", async () => {
        expect(updateCustomerUseCase.execute("12345", {
            firstName: "Jane",
            email: "jane@doe.com"
        })).rejects.toThrowError("Customer not exists");

    });

    it("shouldn't be able to update a customer because customer email already exists", async () => {
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
            email: "jane@doe.com",
            password: "1234"
        };

        const newCustomer = await createCustomerUseCase.execute(secondCustomerObj);

        expect(updateCustomerUseCase.execute(newCustomer.id, {
            firstName: "Nathan",
            email: "john@doe.com"
        })).rejects.toThrowError("Customer email already exists");
    });
});