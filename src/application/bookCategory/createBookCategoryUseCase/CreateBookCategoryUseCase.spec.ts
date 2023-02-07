import { IBookCategoryRepository } from "../../../domain/bookCategory/interfaces/IBookCategoryRepository";
import { BookCategoryRepositoryInMemory } from "../../../infra/database/repositories/bookCategory/BookCategoryRepositoryInMemory";
import { BookCategoryInput } from "../../../shared/utils/types/bookCategory/bookCategory.types";
import { CreateBookCategoryUseCase } from "./CreateBookCategoryUseCase";

let bookCategoryRepository: IBookCategoryRepository;
let createBookCategoryUseCase: CreateBookCategoryUseCase;
describe("Create book category use case test", () => {
    
    beforeEach(() => {
        bookCategoryRepository = new BookCategoryRepositoryInMemory();
        createBookCategoryUseCase = new CreateBookCategoryUseCase(bookCategoryRepository);
    });
    it("should be able to create a new book category", async () => {
        const newBookCategoryObj: BookCategoryInput = {
            name: "Crime"
        };

        const bookCategory = await createBookCategoryUseCase.execute(newBookCategoryObj);

        expect(bookCategory.id).toBeDefined();
        expect(bookCategory.isActive).toEqual(true);
        expect(bookCategory.name).toEqual(newBookCategoryObj.name);
    });

    it("shouldn't be able to create a new book category", async () => {
        const firstBookCategoryObj: BookCategoryInput = {
            name: "Crime"
        };

        await createBookCategoryUseCase.execute(firstBookCategoryObj);

        const secondBookCategory: BookCategoryInput = {
            name: "Crime"
        };

        expect(createBookCategoryUseCase.execute(secondBookCategory))
            .rejects
            .toThrowError("This category already exists!");
    });
});