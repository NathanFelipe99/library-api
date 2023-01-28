import Customer from "./Customer";
import { CustomerProps } from "./types/CustomerTypes";

describe("Testing Customer class constructor", () => {
    test("customer must have id & isActive property", () => {
        let customerProps: CustomerProps = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@mail.com",
            password: "123"
        }

        const newCustomer = new Customer(customerProps);
        expect(newCustomer).toHaveProperty("id");
        expect(newCustomer).toHaveProperty("isActive");
        expect(typeof newCustomer).toEqual(typeof customerProps);
    });

    it("should be able to update customer props", () => {
        let customerProps: CustomerProps = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@mail.com",
            password: "123"
        }

        const newCustomer = new Customer(customerProps);
        newCustomer.updateEmail("jane.doe@mail.com");
        newCustomer.inactivateCustomer(false);

        expect(newCustomer.email).toEqual("jane.doe@mail.com");
        expect(newCustomer.isActive).toEqual(false);
        
    });
});