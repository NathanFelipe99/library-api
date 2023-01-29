import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { CreateCustomerUseCase } from "../createCustomerUseCase/CreateCustomerUseCase";
import { FindCustomerByIdUseCase } from "./FindCustomerByIdUseCase";

const customerRepository = new CustomerRepositoryInMemory();
const findCustomerByIdUseCase = new FindCustomerByIdUseCase(customerRepository);
describe("Find a customer by ID use case test", () => {
    test("should be able to find a customer", async () => {
        
        const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
        const newCustomer = await createCustomerUseCase.execute({
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        });

        const foundCustomer = await findCustomerByIdUseCase.execute(newCustomer.id);

        expect(foundCustomer).not.toBeUndefined();
        expect(foundCustomer.id).toEqual(newCustomer.id);
        expect(foundCustomer).resolves;

    });
});