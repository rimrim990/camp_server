import { Column, Entity, BaseEntity, ManyToOne, OneToOne, JoinColumn } from "typeorm";

import Day from "./days";
import { defaultTimeBlock, TimeBlock } from "../types/TimeBlock";

@Entity('time')
export default class Time extends BaseEntity {
    @JoinColumn()
    @OneToOne(() => Day, day => day.time)
    day!: Day;

    @Column({
        nullable: false,
        primary: true
    })
    dayId!: number;

    @Column({
        type: 'jsonb',
        nullable: false,
        default: defaultTimeBlock
    })
    TimeBlock!: TimeBlock[];
}