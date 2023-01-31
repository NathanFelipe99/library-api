import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { CreateCustomerUseCase } from "../createCustomerUseCase/CreateCustomerUseCase";
import { DeleteCustomerUseCase } from "./DeleteCustomerUseCase";

const customerRepository = new CustomerRepositoryInMemory();
const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
const deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepository);

describe("Delete a existing customer", () => {
    it("should be able to delete a customer", async () => {
        const newCustomer = await createCustomerUseCase.execute({
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        });

        await deleteCustomerUseCase.execute(newCustomer.id);

        expect(customerRepository.customers.length).toEqual(0);

    });
});