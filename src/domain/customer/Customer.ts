import { CustomerProps } from "../../shared/utils/types/customer/customer.types";
import crypto from "crypto";

class Customer {
    public readonly id: string;
    public props: CustomerProps;

    constructor(props: CustomerProps, id?: string) {
        this.id = id || crypto.randomUUID();
        this.props = {
            ...props,
            isActive: true,
            createdAt: new Date()
        }
    }

    get firstName() {
        return this.props.firstName;
    }

    get lastName() {
        return this.props.lastName;
    }

    get email() {
        return this.props.email;
    }

    get password() {
        return this.props.password;
    }

    get isActive() {
        return this.props.isActive || false;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    private set firstName(firstName: string) {
        this.props.firstName = firstName;
    }

    private set lastName(lastName: string) {
        this.props.lastName = lastName;
    }

    private set email(email: string) {
        this.props.email = email;
    }

    private set password(password: string) {
        this.props.password = password;
    }

    private set isActive(value: boolean) {
        this.props.isActive = value;
    }

    updateFirstName(firstName: string) {
        this.firstName = firstName;
        this.props.updatedAt = new Date();
    }

    updateLastName(lastName: string) {
        this.lastName = lastName;
        this.props.updatedAt = new Date();
    }

    updateEmail(email: string) {
        this.email = email;
        this.props.updatedAt = new Date();
    }

    updatePassword(password: string) {
        this.password = password;
        this.props.updatedAt = new Date();
    }

    inactivateCustomer(isActive: boolean) {
        this.isActive = isActive;
        this.props.updatedAt = new Date();
    }

    toJSON() {
        const { firstName, lastName, email, isActive, createdAt, updatedAt } = this.props;
        return {
            id: this.id,
            firstName,
            lastName,
            email,
            isActive,
            createdAt,
            updatedAt
        };
    }
}
 
export default Customer;