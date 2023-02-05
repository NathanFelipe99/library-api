import { IBookCategoryRepository } from "../../../domain/bookCategory/interfaces/IBookCategoryRepository";
import { BookCategoryOutput } from "../../../shared/utils/types/bookCategory/bookCategory.types";

export class ListAllBookCategoriesUseCase {
    constructor(
        private readonly _bookCategoryRepository: IBookCategoryRepository
    ) { }
    
    async execute(): Promise<BookCategoryOutput[]> {
        const bookCategories = await this._bookCategoryRepository.findAll();
        return bookCategories.map(category => category.toJSON());
    }
}