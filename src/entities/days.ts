import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, Unique, ManyToOne, OneToOne, OneToMany } from "typeorm";
import Task from "./tasks";
import Time from "./time";
import User from "./users";

@Entity('days')
export default class Day extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // 날짜
    @Column()
    date!: string;

    // 오늘의 총 공부시간
    @Column({ 
        name: "total_time",
        type: "int", 
        nullable: false,
        default: 0
    })
    totalTime!: number;

    // 목표시간
    @Column()
    targetTimeH!: string;

    @Column()
    targetTimeM!: string;

    // 사용자가 입력한 명언
    @Column({
        type: "varchar",
        length: 120,
        nullable: true
    })
    comment!: string;

    @ManyToOne(() => User, user => user.days)
    user!: User;

    @Column({
        nullable: false
    })
    userId!: number;

    @OneToMany(() => Task, task => task.day)
    task!: Task;

    @OneToOne(() => Time, time => time.day)
    time!: Time;

    @Column({ default: '0' })
    timeRate!: string;

    @Column({ default: '0' })
    taskRate!: string;
}