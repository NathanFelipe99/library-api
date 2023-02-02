import { BookCategory } from "../../../domain/bookCategory/BookCategory";
import { BookCategoryOutput } from "../../../shared/utils/types/bookCategory/bookCategory.types";
import { IUpdateBookCategoryDTO } from "./../../../infra/database/repositories/bookCategory/dto/IUpdateBookCategoryDTO";

export interface IBookCategoryRepository {
    create(data: BookCategory): Promise<void>;
    update(id: string, data: IUpdateBookCategoryDTO): Promise<BookCategoryOutput>;
    findAll(): Promise<BookCategory[]>;
    findByID(id: string): Promise<BookCategory>;
    findByName(name: string): Promise<BookCategory>;
    setStatus(id: string, isActive: boolean): void;
    delete(id: string): void;
}