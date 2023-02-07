import { BookCategory } from "../../../../domain/bookCategory/BookCategory";
import { IBookCategoryRepository } from "../../../../domain/bookCategory/interfaces/IBookCategoryRepository";
import { BookCategoryOutput } from "../../../../shared/utils/types/bookCategory/bookCategory.types";
import { IUpdateBookCategoryDTO } from "./dto/IUpdateBookCategoryDTO";

export class BookCategoryRepositoryInMemory implements IBookCategoryRepository{
    categories: BookCategory[] = [];
    
    async create(data: BookCategory): Promise<void> {
        this.categories.push(data);
    }

    async update(id: string, data: IUpdateBookCategoryDTO): Promise<BookCategoryOutput> {
        const { name } = data;
        const bookCategoryIndex = this.categories.findIndex(category => category.id === id);
        name && this.categories[bookCategoryIndex].updateName(name);

        return this.categories[bookCategoryIndex].toJSON();
    }

    async findAll(): Promise<BookCategory[]> {
        return this.categories;
    }

    async findByID(id: string): Promise<BookCategory> {
        return this.categories.find(category => category.id === id) as BookCategory;
    }

    async findByName(name: string): Promise<BookCategory> {
        return this.categories.find(category => category.name.toLowerCase() === name.toLowerCase()) as BookCategory;
    }

    setStatus(id: string, isActive: boolean): void {
        const bookCategoryIndex = this.categories.findIndex(category => category.id === id);
        this.categories[bookCategoryIndex].setBookCategoryStatus(isActive);
    }

    delete(id: string): void {
        const bookCategoryIndex = this.categories.findIndex(category => category.id === id);
        this.categories.splice(bookCategoryIndex, 1);
    }

}