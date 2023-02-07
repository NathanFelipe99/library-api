import { IBookCategoryRepository } from "../../../domain/bookCategory/interfaces/IBookCategoryRepository";
import { BookCategoryRepositoryInMemory } from "./../../../infra/database/repositories/bookCategory/BookCategoryRepositoryInMemory";
import { CreateBookCategoryUseCase } from "./../createBookCategoryUseCase/CreateBookCategoryUseCase";
import { UpdateBookCategoryUseCase } from "./UpdateBookCategoryUseCase";
import { FindBookCategoryByIdUseCase } from "../findBookCategoryByIdUseCase/FindBookCategoryByIdUseCase";
import { BookCategoryInput } from "../../../shared/utils/types/bookCategory/bookCategory.types";

let bookCategoryRepository: IBookCategoryRepository;
let createBookCategoryUseCase: CreateBookCategoryUseCase;
let updateBookCategoryUseCase: UpdateBookCategoryUseCase;
let findBookCategoryByIdRepository: FindBookCategoryByIdUseCase;

describe("Update book category name use case test", () => {
    beforeEach(() => {
        bookCategoryRepository = new BookCategoryRepositoryInMemory();
        createBookCategoryUseCase = new CreateBookCategoryUseCase(bookCategoryRepository);
        updateBookCategoryUseCase = new UpdateBookCategoryUseCase(bookCategoryRepository);
        findBookCategoryByIdRepository = new FindBookCategoryByIdUseCase(bookCategoryRepository);
    });

    it("should be able to update a book category name", async () => {
        const newBookCategoryObj: BookCategoryInput = {
            name: "Crime"
        };

        const bookCategory = await createBookCategoryUseCase.execute(newBookCategoryObj);
        expect(bookCategory.id).toBeDefined();

        const updateBookCategoryProps: BookCategoryInput = {
            name: "Horror"
        };

        const updatedBookCategory = await updateBookCategoryUseCase.execute(bookCategory.id, updateBookCategoryProps);
        expect(updatedBookCategory.name).toEqual("Horror");

        const findBookCategory = await findBookCategoryByIdRepository.execute(updatedBookCategory.id);
        expect(findBookCategory.updatedAt).not.toBeNull();
    });

    it("shouldn't be able to update a book category name because category name not exists", async () => {
        const firstBookCategoryObj: BookCategoryInput = {
            name: "Crime"
        };

        const firstBookCategory = await createBookCategoryUseCase.execute(firstBookCategoryObj);
        expect(firstBookCategory.id).toBeDefined();

        const secondBookCategoryObj: BookCategoryInput = {
            name: "Horror"
        };

        const secondBookCategory = await createBookCategoryUseCase.execute(secondBookCategoryObj);

        expect(updateBookCategoryUseCase.execute(secondBookCategory.id, {
            name: "Crime"
        })).rejects.toThrowError("This category name already exists!");
    });

    it("shoudn't be able to update a book category name because book category ID not exists", async () => {
        expect(updateBookCategoryUseCase.execute("1234", { name: "Fantasy" }))
            .rejects
            .toThrowError("This category not exists!");
    });
});