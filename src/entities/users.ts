import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, OneToMany, ManyToMany } from "typeorm";
import Book from "./book";
import Day from "./days";
import Follow from "./follow";

@Entity('users')
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ 
        type: "varchar",
        length: 15,
        unique: true,
        nullable: false 
    })
    username!: string;

    @Column({ 
        type: "varchar",
        length: 120, 
        nullable: false 
    })
    password!: string;

    @Column({
        name: "hash_salt",
        type: "varchar",
        length: 256,
        nullable: false
    })
    hashSalt!: string;

    @Column({ 
        name: "display_name",
        type: "varchar",
        length: 10, 
        nullable: false 
    })
    displayName!: string;

    @CreateDateColumn({
        name: "created_at",
        type: "date",
        nullable: false
    })
    createdAt!: Date;

    @OneToMany(() => Day, day => day.user)
    days!: Day[];

    @OneToMany(() => Follow, follow => follow.follower)
    follower!: Follow[];

    @OneToMany(() => Follow, follow => follow.user)
    user!: Follow[];

    @ManyToMany(() => Book, book => book.user)
    book!: Book[];

    @Column({
        type: "jsonb",
        default: []
    })
    books!: Book[];
}