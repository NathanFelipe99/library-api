import { IBookCategoryRepository } from "../../../domain/bookCategory/interfaces/IBookCategoryRepository";
import { BookCategoryRepositoryInMemory } from "../../../infra/database/repositories/bookCategory/BookCategoryRepositoryInMemory";
import { CreateBookCategoryUseCase } from "./CreateBookCategoryUseCase";

let bookCategoryRepository: IBookCategoryRepository;
let createBookCategoryUseCase: CreateBookCategoryUseCase;
describe("Create book category use case test", () => {
    
    beforeEach(() => {
        bookCategoryRepository = new BookCategoryRepositoryInMemory();
        createBookCategoryUseCase = new CreateBookCategoryUseCase(bookCategoryRepository);
    });
    it("should be able to create a new book category", async () => {

    });

    it("shouldn't be able to create a new book category", async () => {

    });
});