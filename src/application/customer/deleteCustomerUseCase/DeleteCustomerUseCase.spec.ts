import { ICustomerRepository } from "../../../domain/customer/interfaces/ICustomerRepository";
import { CustomerRepositoryInMemory } from "../../../infra/database/repositories/customer/CustomerRepositoryInMemory";
import { CustomerProps } from "../../../shared/utils/types/customer/customer.types";
import { CreateCustomerUseCase } from "../createCustomerUseCase/CreateCustomerUseCase";
import { FindCustomerByIdUseCase } from "../findCustomerByIdUseCase/FindCustomerByIdUseCase";
import { DeleteCustomerUseCase } from "./DeleteCustomerUseCase";


let customerRepository: ICustomerRepository;
let createCustomerUseCase: CreateCustomerUseCase;
let findCustomerByIdUseCase: FindCustomerByIdUseCase;
let deleteCustomerUseCase: DeleteCustomerUseCase;

describe("Delete a existing customer", () => {

    beforeEach(() => {
        customerRepository = new CustomerRepositoryInMemory();
        createCustomerUseCase = new CreateCustomerUseCase(customerRepository);
        findCustomerByIdUseCase = new FindCustomerByIdUseCase(customerRepository);
        deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepository);
    });

    it("should be able to delete a customer", async () => {
        const obj: CustomerProps = {
            firstName: "John",
            lastName: "Doe",
            email: "john@doe.com",
            password: "123"
        };

        const newCustomer = await createCustomerUseCase.execute(obj);

        await deleteCustomerUseCase.execute(newCustomer.id);

        try {
            await findCustomerByIdUseCase.execute(newCustomer.id);
        } catch (error) {
            expect(error.message).toEqual("Customer not found!");
            expect(error).toBeInstanceOf(Error);
        }
    });
});