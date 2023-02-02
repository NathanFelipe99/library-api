import { BookCategoryProps } from "../../shared/utils/types/bookCategory/bookCategory.types";
import { BookCategory } from "./BookCategory";

let newBookCategory: BookCategory;

describe("Testing BookCategory class constructor", () => {
    
    let bookCategoryObj: BookCategoryProps = {
        name: "Fantasy"
    };

    beforeEach(() => {
        newBookCategory = new BookCategory(bookCategoryObj);
    });
    test("book category must have id & isActive property", () => {
        expect(newBookCategory.id).toBeDefined();
        expect(newBookCategory.isActive).toEqual(true);
    });

    it("should be able to update a book category", () => {
        newBookCategory.updateName("Crime");
        newBookCategory.setBookCategoryStatus(false);

        expect(newBookCategory.name).toEqual("Crime");
        expect(newBookCategory.isActive).toEqual(false);
        expect(newBookCategory.updatedAt).toBeDefined();
    });
});