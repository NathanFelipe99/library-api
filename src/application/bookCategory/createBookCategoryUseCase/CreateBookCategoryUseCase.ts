import { BookCategory } from "../../../domain/bookCategory/BookCategory";
import { IBookCategoryRepository } from "../../../domain/bookCategory/interfaces/IBookCategoryRepository";
import { BookCategoryInput, BookCategoryOutput } from "../../../shared/utils/types/bookCategory/bookCategory.types";

export class CreateBookCategoryUseCase {
    constructor(
        private readonly _bookCategoryRepository: IBookCategoryRepository
    ) { }
    
    async execute(data: BookCategoryInput): Promise<BookCategoryOutput> {
        const { name } = data;
        const bookCategoryExists = await this._bookCategoryRepository.findByName(name);
        if (bookCategoryExists) throw new Error("This category already exists!");

        const bookCategory = new BookCategory(data);
        await this._bookCategoryRepository.create(bookCategory);
        return bookCategory.toJSON();
    }
}