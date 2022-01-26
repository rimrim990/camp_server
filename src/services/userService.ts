import User from "../entities/users";
import Book from "../entities/book";

export const insertUser = async (username: string, password: string, displayName: string, hashSalt: string): Promise<User> => {
    const user: User = new User();
    user.username = username;
    user.password = password;
    user.hashSalt = hashSalt;
    user.displayName = displayName;
    return await user.save();
};

export const findUserById = async (userId: number): Promise<User | undefined> => {
    const user: User | undefined = await User.findOne({ id: userId });
    return user;
}

export const findUserByUsername = async (username: string): Promise<User | undefined> => {
    const user: User | undefined = await User.findOne({ username: username });
    return user;
}

