import { AfterLoad, BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import User from "./users";

@Entity('book')
@Unique(['publisher', 'subject', 'course'])
export default class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // 출판사
    @Column({ nullable: false })
    publisher!: string;

    // 과목명
    @Column({ nullable: false })
    subject!: string;

    // 교육과정
    @Column({ nullable: false })
    course!: string;

    @ManyToMany(() => User)
    @JoinTable()
    user!: User[];

    @Column({
        type: "jsonb",
        default: []
    })
    users!: User[];

    static async findUserBook(user: User) {
        return await this.createQueryBuilder('b')
            .where('b.users @> :user', { user })
            .getRawMany();
    }
}