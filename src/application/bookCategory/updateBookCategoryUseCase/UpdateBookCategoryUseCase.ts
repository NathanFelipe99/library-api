import { IBookCategoryRepository } from "../../../domain/bookCategory/interfaces/IBookCategoryRepository";
import { BookCategoryInput, BookCategoryOutput } from "../../../shared/utils/types/bookCategory/bookCategory.types";

export class UpdateBookCategoryUseCase {
    constructor(
        private readonly _bookCategoryRepository: IBookCategoryRepository
    ) { }
    
    async execute(id: string, data: BookCategoryInput): Promise<BookCategoryOutput> {
        const bookCategoryExists = await this._bookCategoryRepository.findByID(id);
        if (!bookCategoryExists) throw new Error("This category not exists!");

        const bookCategoryNameExists = await this._bookCategoryRepository.findByName(data.name);
        if (bookCategoryNameExists && (bookCategoryExists.id !== bookCategoryNameExists.id)) throw new Error("This category name already exists!");

        const bookCategory = await this._bookCategoryRepository.update(id, data);
        return bookCategory;
    }
}