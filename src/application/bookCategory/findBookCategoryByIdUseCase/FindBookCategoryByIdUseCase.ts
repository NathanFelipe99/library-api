import { BookCategoryOutput } from "../../../shared/utils/types/bookCategory/bookCategory.types";
import { IBookCategoryRepository } from "./../../../domain/bookCategory/interfaces/IBookCategoryRepository";

export class FindBookCategoryByIdUseCase {
    constructor(
        private readonly _bookCategoryRepository: IBookCategoryRepository
    ) { }
    
    async execute(id: string): Promise<BookCategoryOutput> {
        const bookCategory = await this._bookCategoryRepository.findByID(id);
        if (!bookCategory) throw new Error("Book Category not found!");
        return bookCategory.toJSON();
    }
}