import { IBookCategoryRepository } from "../../../domain/bookCategory/interfaces/IBookCategoryRepository";
import { BookCategoryRepositoryInMemory } from "../../../infra/database/repositories/bookCategory/BookCategoryRepositoryInMemory";
import { BookCategoryProps } from "../../../shared/utils/types/bookCategory/bookCategory.types";
import { CreateBookCategoryUseCase } from "../createBookCategoryUseCase/CreateBookCategoryUseCase";
import { FindBookCategoryByIdUseCase } from "./FindBookCategoryByIdUseCase";

let bookCategoryRepository: IBookCategoryRepository;
let createBookCategoryUseCase: CreateBookCategoryUseCase;
let findBookCategoryByIdUseCase: FindBookCategoryByIdUseCase;

describe("Find a category by ID", () => {
    
    beforeEach(() => {
        bookCategoryRepository = new BookCategoryRepositoryInMemory();
        createBookCategoryUseCase = new CreateBookCategoryUseCase(bookCategoryRepository);
        findBookCategoryByIdUseCase = new FindBookCategoryByIdUseCase(bookCategoryRepository);
    });

    it("should be able to find a category by ID", async () => {
        const bookCategoryObj: BookCategoryProps = {
            name: "Crime"
        };

        const newBookCategory = await createBookCategoryUseCase.execute(bookCategoryObj);

        const findBookCategoryById = await findBookCategoryByIdUseCase.execute(newBookCategory.id);

        expect(findBookCategoryById.id).toEqual(newBookCategory.id);
        expect(findBookCategoryById.isActive).toEqual(true);
        expect(findBookCategoryById.name).toEqual(newBookCategory.name);
    });

    it("shouldn't be able to find a category by ID", async () => {
        const firstBookCategoryObj: BookCategoryProps = {
            name: "Crime"
        };

        const firstBookCategory = await createBookCategoryUseCase.execute(firstBookCategoryObj);

        expect(findBookCategoryByIdUseCase.execute(firstBookCategory.id + "1"))
            .rejects
            .toThrowError("Book Category not found!");
    });
});