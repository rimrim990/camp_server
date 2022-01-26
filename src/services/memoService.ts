import Memo from "../entities/memo";

export const insertMemo = async (userId: number, title: string, content: string) => {
    const memo = new Memo();
    memo.userId = userId;
    memo.title = title;
    memo.content = content;
    return await memo.save();
}

export const getMemoById = async (id: number) => {
    const memo: Memo | undefined = await Memo.findOne({ id });
    return memo;
}

export const getMemoByUserId = async (userId: number) => {
    const memoList: Memo[] = await Memo.find({ userId });
    return memoList;
}

export const updateMemoPos = async () => {
    
}

export const updateMemo = async (memo: Memo, title: string, content: string) => {
    memo.title = title;
    memo.content = content;
    return memo.save();
}

export const deleteMemo = async (memo: Memo) => {
    await memo.remove();
    return true;
}