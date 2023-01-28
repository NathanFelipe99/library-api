import { CustomerProps } from "./types/CustomerTypes";

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

    updateData(data: CustomerProps) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.password = data.password;
        this.isActive = data.isActive || false;
    }

    toJSON() {
        return { id: this.id, ...this.props };
    }
}

export { Customer };