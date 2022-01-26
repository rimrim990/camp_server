import Day from "../entities/days";
import User from "../entities/users";

export const insertDay = async (userId: number, targetTimeH: string, targetTimeM: string, date: string, comment?: string) => {
    const day = new Day();
    day.userId = userId;
    day.targetTimeH = targetTimeH;
    day.targetTimeM = targetTimeM;
    if (comment) day.comment = comment;
    if (date) day.date = date;
    return await day.save();
}

export const findDayById = async (dayId: number) => {
    const day: Day | undefined = await Day.findOne({ id: dayId });
    return day;
}

export const findDayListByUserId = async (userId: number) => {
    const dayList: Day[] | undefined = await Day.find({ 
        order: {
            id: "DESC",
        },
        where: {
            userId
        }
    });
    return dayList;
}

export const findDayByDateAndUserId = async (userId: number, date: string) => {
    const day: Day | undefined = await Day.findOne({ userId, date });
    return day;
}

export const updateTargetTime = async (day: Day, targetTimeH?: string, targetTimeM?: string) => {
    if (targetTimeH) day.targetTimeH = targetTimeH;
    if (targetTimeM) day.targetTimeM = targetTimeM;
    return await day.save();
}

export const updateTaskRate = async (day: Day, taskRate: string) => {
    day.taskRate = taskRate;
    return await day.save();
}

export const updateTotalTime = async (day: Day, totalTime: number) => {
    day.totalTime = totalTime;
    const targetTimeH = day.targetTimeH;
    const targetTimeM = day.targetTimeM;
    let targetTime: number = parseInt(targetTimeH) * 60 + parseInt(targetTimeM);
    targetTime = targetTime * 60 * 1000;
    let rate = totalTime / targetTime * 100;
    if (rate > 100) rate = 100;
    day.timeRate = Math.round(rate).toString();
    return await day.save();
}

export const updateComment = async (day: Day, comment: string) => {
    day.comment = comment;
    return await day.save();
}

export const deleteDay = async (day: Day) => {
    await day.remove();
    return true;
}