import { CustomerProps } from "./types/CustomerTypes";
import crypto from "crypto";

class Customer {
    public readonly id: string;
    public props: CustomerProps;

    constructor(props: CustomerProps, id?: string) {
        this.id = id || crypto.randomUUID();
        this.props = {
            ...props,
            isActive: true
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
    }

    updateLastName(lastName: string) {
        this.lastName = lastName;
    }

    updateEmail(email: string) {
        this.email = email;
    }

    updatePassword(password: string) {
        this.password = password;
    }

    inactivateCustomer(isActive: boolean) {
        this.isActive = isActive;
    }

    toJSON() {
        return { id: this.id, ...this.props };
    }
}
 
export default Customer;