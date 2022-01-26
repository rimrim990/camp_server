import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

import User from "../entities/users";

@Entity('follow')
@Unique(['userId', 'followerId'])
export default class Follow extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    user!: User;
    
    @ManyToOne(() => User)
    follower!: User;

    @Column({ nullable: false })
    userId!: number;

    @Column({ nullable: false })
    followerId!: number;

    static async findFollowers(userId: number) {
        return await this.createQueryBuilder('f')
            .select([
                'm.id as id',
                'm.username as username',
                'm.displayName as displayName',
                'm.createdAt as createdAt'])
            .leftJoin('f.follower', 'm')
            .where('f.userId = :userId', { userId })
            .getRawMany();
    }

    static async findFollowings(userId: number) {
        return await this.createQueryBuilder('f')
            .select([
                'm.id as id',
                'm.username as username',
                'm.displayName as displayName',
                'm.createdAt as createdAt'])
            .leftJoin('f.user', 'm')
            .where('f.followerId = :userId', { userId })
            .getRawMany();
    }
}