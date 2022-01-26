import Follow from "../entities/follow";
import User from "../entities/users";
import UserInfo from "../types/UserInfo";

// follower가 user를 following 
export const insertFollow = async (userId: number, followerId: number) => {
    const follow: Follow = new Follow();
    follow.userId = userId;
    follow.followerId = followerId;
    return await follow.save();
}

// 나를 팔로우 하는 사람 조회
export const findFollowersByUserId = async (userId: number) => {
   const followerList: UserInfo[] = await Follow.findFollowers(userId);
   return followerList;
}

// 내가 팔로우 하는 사람 조회
export const findFollowingsByUserId = async (userId: number) => {
    const followingList: UserInfo[] = await Follow.findFollowings(userId);
    return followingList;
}

export const findFollowById =  async (id: number) => {
    const follow: Follow | undefined = await Follow.findOne({ id });
    return follow;
}

export const findFollowByUserAndFollowerId = async (userId: number, followerId: number) => {
    const follow: Follow | undefined = await Follow.findOne({ userId, followerId });
    return follow;
}

export const deleteFollow = async (follow: Follow) => {
    await follow.remove();
    return true;
}