import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { CustomerProps } from "../../../shared/utils/types/customer/customer.types";
import { CreateCustomerUseCase } from "../createCustomerUseCase/CreateCustomerUseCase";
import { FindCustomerByIdUseCase } from "../findCustomerByIdUseCase/FindCustomerByIdUseCase";
import { SetCustomerStatusUseCase } from "./SetCustomerStatusUseCase";


let customerRepository: ICustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
let setCustomerStatusUseCase: SetCustomerStatusUseCase;
let findCustomerByIdUseCase: FindCustomerByIdUseCase;

describe("Inactivating a customer", () => {

    beforeEach(() => {
        customerRepository = new CustomerRepositoryInMemory();
        createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
        setCustomerStatusUseCase = new SetCustomerStatusUseCase(customerRepository);
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

        await setCustomerStatusUseCase.execute(newCustomer.id, false);

        const findInactivatedCustomer = await findCustomerByIdUseCase.execute(newCustomer.id);

        expect(findInactivatedCustomer.isActive).toEqual(false);
    });
});