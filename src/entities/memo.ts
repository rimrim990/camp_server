import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./users";

@Entity('memo')
export default class Memo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @Column({
        nullable: false
    })
    userId!: number;

    @Column({
        type: "varchar",
        length: 20,
        nullable: false
    })
    title!: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    content!: string;
}