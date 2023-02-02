import { BookCategoryProps } from "./../../shared/utils/types/bookCategory/bookCategory.types";
import crypto from "crypto";

export class BookCategory {
    public readonly id: string;
    public props: BookCategoryProps;

    constructor(props: BookCategoryProps, id?: string) {
        this.id = id || crypto.randomUUID();
        this.props = {
            ...props,
            isActive: true,
            createdAt: new Date(),
            updatedAt: null
        }
    }

    get name() {
        return this.props.name;
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

    private set name(name: string) {
        this.props.name = name;
    }

    private set isActive(value: boolean) {
        this.props.isActive = value;
    }

    updateName(name: string) {
        this.name = name;
        this.props.updatedAt = new Date()
    }

    setBookCategoryStatus(isActive: boolean) {
        this.isActive = isActive;
        this.props.updatedAt = new Date();
    }

    toJSON() {
        return {
            id: this.id,
            ...this.props
        };
    }
}