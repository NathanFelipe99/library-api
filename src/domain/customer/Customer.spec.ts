import Customer from "./Customer";
import { CustomerProps } from "./../../shared/utils/types/customer/customer.types";

let newCustomer: Customer;
describe("Testing Customer class constructor", () => {

    let customerObj: CustomerProps = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@mail.com",
        password: "123"
    }

    beforeEach(() => {
        newCustomer = new Customer(customerObj);
    });
    test("customer must have id & isActive property", () => {
        expect(newCustomer).toHaveProperty("id");
        expect(newCustomer).toHaveProperty("isActive");
        expect(typeof newCustomer).toEqual(typeof customerObj);
    });

    it("should be able to update customer props", () => {
        newCustomer.updateEmail("jane.doe@mail.com");
        newCustomer.setCustomerStatus(false);

        expect(newCustomer.email).toEqual("jane.doe@mail.com");
        expect(newCustomer.isActive).toEqual(false);
        expect(newCustomer.updatedAt).toBeDefined();
    });
});