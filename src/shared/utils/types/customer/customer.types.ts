export type CustomerProps = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type CreateCustomerOutput = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive?: boolean;
}