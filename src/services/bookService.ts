import Book from "../entities/book";
import User from "../entities/users";

export const insertBook = async (subject: string, publisher: string, course: string) => {
    const book: Book = new Book();
    book.subject = subject;
    book.publisher = publisher;
    book.course = course;
    return await book.save();
}

export const findBookById = async (id: number) => {
    const book: Book | undefined = await Book.findOne({ id });
    return book;
}

export const findBookUserById = async (book: Book) => {
    const userList: User[] = book.users;
    return userList;
}

export const findAllBook = async () => {
    const bookList: Book[] = await Book.find();
    return bookList;
}

export const updateBookUser = async (user: User, book: Book) => {
    let bookUserList: User[] = book.users;
    bookUserList.push(user);
    book.users = bookUserList;
    return await book.save();
}

export const deleteBookUser = async (userIndex: number, book: Book) => {
    let bookUserList: User[] = book.users;
    bookUserList.splice(userIndex, 1);
    book.users = bookUserList;
    return await book.save();
}

export const deleteBook = async (book: Book) => {
    await book.remove();
    return true;
}