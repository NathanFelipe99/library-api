import { BookCategory } from "../../../domain/bookCategory/BookCategory";
import { IBookCategoryRepository } from "../../../domain/bookCategory/interfaces/IBookCategoryRepository";
import { BookCategoryOutput, BookCategoryProps } from "../../../shared/utils/types/bookCategory/bookCategory.types";

export class CreateBookCategoryUseCase {
    constructor(
        private readonly _bookCategoryRepository: IBookCategoryRepository
    ) { }
    
    async execute(data: BookCategoryProps): Promise<BookCategoryOutput> {
        const bookCategory = new BookCategory(data);
        await this._bookCategoryRepository.create(bookCategory);
        return bookCategory.toJSON();
    }
}