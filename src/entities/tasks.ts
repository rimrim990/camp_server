import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import Title from "../types/Title";

import Day from "./days";

@Entity('tasks')
export default class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Day, day => day.task)
    day!: Day;

    @Column({
        nullable: false,
    })
    dayId!: number;

    @Column({
        type: "varchar",
        length: 15,
        nullable: false,
    })
    subject!: string;

    @Column({
        type: "jsonb",
        default: []
    })
    titles!: Title[];

    static async insertBulkTask(tasks: Task[]) {
        console.log(tasks);
        return await this.createQueryBuilder()
            .insert()
            .into(Task)
            .values(tasks)
            .execute();
    }
}