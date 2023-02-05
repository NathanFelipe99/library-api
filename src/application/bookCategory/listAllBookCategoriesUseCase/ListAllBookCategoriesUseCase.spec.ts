import { ListAllBookCategoriesUseCase } from "./ListAllBookCategoriesUseCase";
import { CreateBookCategoryUseCase } from "../createBookCategoryUseCase/CreateBookCategoryUseCase";
import { IBookCategoryRepository } from "../../../domain/bookCategory/interfaces/IBookCategoryRepository";
import { BookCategoryRepositoryInMemory } from "./../../../infra/database/repositories/bookCategory/BookCategoryRepositoryInMemory";
import { BookCategoryProps } from "../../../shared/utils/types/bookCategory/bookCategory.types";

let bookCategoryRepository: IBookCategoryRepository;
let listAllBookCategoriesUseCase: ListAllBookCategoriesUseCase;
let createBookCategoryUseCase: CreateBookCategoryUseCase;

describe("Listing all categories", () => {
    
    beforeEach(() => {
        bookCategoryRepository = new BookCategoryRepositoryInMemory();
        createBookCategoryUseCase = new CreateBookCategoryUseCase(bookCategoryRepository);
        listAllBookCategoriesUseCase = new ListAllBookCategoriesUseCase(bookCategoryRepository);
    });


    it("should be able to list all categories", async () => {
        const obj: BookCategoryProps = {
            name: "Crime"
        };

        const newCategory = await createBookCategoryUseCase.execute(obj);

        const bookCategories = await listAllBookCategoriesUseCase.execute();

        expect(bookCategories.length).toEqual(1);
        expect(bookCategories.at(-1)?.id).toEqual(newCategory.id);
    });
});