export type BookCategoryProps = {
    name: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date | null;    
}

export type BookCategoryOutput = {
    id: string;
    name: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date | null;
}

export type BookCategoryInput = {
    name: string;
}