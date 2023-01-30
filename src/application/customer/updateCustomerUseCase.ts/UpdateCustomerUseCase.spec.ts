import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { CreateCustomerUseCase } from "../createCustomerUseCase/CreateCustomerUseCase";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";

const customerRepository = new CustomerRepositoryInMemory();
const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
describe("Updating a customer", () => {
    it("should be able to update a customer", async () => {
        const newCustomer = await createCustomerUseCase.execute({
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        });

        const updatedCustomer = await updateCustomerUseCase.execute(newCustomer.id, {
            firstName: "Jane",
            email: "jane@doe.com"
        });

        expect(updatedCustomer).toStrictEqual({
            id: newCustomer.id,
            firstName: "Jane",
            lastName: newCustomer.lastName,
            email: "jane@doe.com",
            isActive: newCustomer.isActive,
            createdAt: customerRepository.customers.at(-1)?.createdAt,
            updatedAt: customerRepository.customers.at(-1)?.updatedAt,
        });
    });

    it("shouldn't be able to update a customer because customer ID not exists", async () => {
        expect(updateCustomerUseCase.execute("12345", {
            firstName: "Jane",
            email: "jane@doe.com"
        })).rejects.toThrowError("Customer not exists");

    });

    it("shouldn't be able to update a customer because customer email already exists", async () => {
        await createCustomerUseCase.execute({
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        });

        const newCustomer = await createCustomerUseCase.execute({
            firstName: "Jane",
            lastName: "Doe",
            email: "jane@doe.com",
            password: "1234"
        });

        expect(updateCustomerUseCase.execute(newCustomer.id, {
            firstName: "Nathan",
            email: "john@doe.com"
        })).rejects.toThrowError("Customer email already exists");
    });
});