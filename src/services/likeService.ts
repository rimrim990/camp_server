import Like from "../entities/like";
import UserInfo from "../types/UserInfo";

export const insertLike = async (userId: number, targetId: number, taskId: number) => {
    const like: Like =  new Like();
    like.userId = userId;
    like.targetId = targetId;
    like.taskId = taskId;
    return await like.save();
};

export const findLikeById = async (id: number) => {
    const like: Like | undefined = await Like.findOne({ id });
    return like;
};

export const findLikeByUserAndTaskId = async (userId: number, taskId: number) => {
    const userList: UserInfo[] = await Like.findTargetsByUserAndTaskId(userId, taskId);
    return userList;
};

export const findLike = async (userId: number, targetId: number, taskId: number) => {
    const like: Like | undefined = await Like.findOne({ userId, targetId, taskId });
    return like;
};

export const deleteLike = async (like: Like) => {
    await like.remove();
    return true;
}