import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { CreateCustomerUseCase } from "../createCustomerUseCase/CreateCustomerUseCase";
import { FindCustomerByIdUseCase } from "./FindCustomerByIdUseCase";

let customerRepository: ICustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
let findCustomerByIdUseCase: FindCustomerByIdUseCase;

describe("Find a customer by ID use case test", () => {
    beforeEach(() => {
        customerRepository = new CustomerRepositoryInMemory();
        createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
        findCustomerByIdUseCase = new FindCustomerByIdUseCase(customerRepository);
    });
    it("should be able to find a customer", async () => {   
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