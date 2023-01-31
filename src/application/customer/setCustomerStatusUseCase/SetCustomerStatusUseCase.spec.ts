import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { CreateCustomerUseCase } from "../createCustomerUseCase/CreateCustomerUseCase";
import { SetCustomerStatusUseCase } from "./SetCustomerStatusUseCase";

const customerRepository = new CustomerRepositoryInMemory();
const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
const setCustomerStatusUseCase = new SetCustomerStatusUseCase(customerRepository);

describe("Inactivating a customer", () => {
    it("should be able to update a customer", async () => {
        const newCustomer = await createCustomerUseCase.execute({
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        });

        await setCustomerStatusUseCase.execute(newCustomer.id, false);

        expect(customerRepository.customers.at(-1)?.isActive).toEqual(false);
    });
});