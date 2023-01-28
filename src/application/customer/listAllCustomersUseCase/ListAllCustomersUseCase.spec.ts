import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { ListAllCustomersUseCase } from "./ListAllCustomersUseCase";
import { CreateCustomerUseCase } from "../createCustomerUseCase/CreateCustomerUseCase";
describe("List all customers use case test", () => {
    test("verifying type returned", async () => {
        const customerRepository = new CustomerRepositoryInMemory();
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
        await createCustomerUseCase.execute({
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        });

        const listAllCustomersUseCase = new ListAllCustomersUseCase(customerRepository);
        
        const customers = await listAllCustomersUseCase.execute();

        expect(customers.length).toEqual(1);
        expect(customers.at(-1)).toStrictEqual({
            id: customerRepository.customers.at(-1)?.id,
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            isActive: true,
            createdAt: customerRepository.customers.at(-1)?.createdAt,
            updatedAt: undefined
        });
    });
});