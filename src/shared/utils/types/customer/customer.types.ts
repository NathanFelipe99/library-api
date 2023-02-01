export type CustomerProps = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date | null;
}

export type CustomerOutput = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive?: boolean;
}