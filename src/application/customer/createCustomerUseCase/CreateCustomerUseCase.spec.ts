import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

const customerRepository = new CustomerRepositoryInMemory();
const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
describe("Create customer use case test", () => {
    it("should be able to construct and insert a new customer using the useCase", async () => {

        const newCustomer = await createCustomerUseCase.execute({
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        });

        expect(customerRepository.customers).toHaveLength(1);
        expect(newCustomer).toStrictEqual({
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