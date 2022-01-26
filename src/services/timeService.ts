import Time from "../entities/time";

export const insertTime = async (dayId: number) => {
    const time = new Time();
    time.dayId = dayId;
    return await time.save();
}

export const findTimeByDayId = async (dayId: number): Promise<Time | undefined> => {
    const time: Time | undefined = await Time.findOne({ dayId: dayId });
    return time;
} 

export const updateTimeColor = async (time: Time, hourIndex: number, minuteIndex:number, color: string): Promise<Time> => {
    time.TimeBlock[hourIndex].minutes[minuteIndex].color = color;
    return await time.save();
}