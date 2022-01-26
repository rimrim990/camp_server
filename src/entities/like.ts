import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import Task from "./tasks";
import User from "./users";

@Entity('like')
@Unique(['user', 'target', 'taskId'])
export default class Like extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;

    @Column({ nullable: false })
    userId!: number;

    @ManyToOne(() => User)
    target!: User;

    @Column({ nullable: false })
    targetId!: number;

    @ManyToOne(() => Task)
    task!: Task;

    @Column({ nullable: false })
    taskId!: number;

    // 나의 특정 업무에 좋아요를 누른 사람 목록
    static async findTargetsByUserAndTaskId(userId: number, taskId: number) {
        return await this.createQueryBuilder('l')
            .select([
                'm.id as id',
                'm.username as username',
                'm.displayName as displayName',
                'm.createdAt as createdAt'])
            .leftJoin('l.user', 'm')
            .where('l.targetId = :userId', { userId })
            .andWhere('l.taskId = :taskId', { taskId })
            .getRawMany();
    }
}