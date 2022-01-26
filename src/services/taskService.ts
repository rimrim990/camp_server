import Day from "../entities/days";
import Task from "../entities/tasks"
import Title from "../types/Title";

export const insertTask = async (dayId: number, subject: string, title?: Title[]) => {
    const task = new Task();
    task.dayId = dayId;
    task.subject = subject;
    if (title) task.titles = title;
    return await task.save();
}

export const insertTitle = async (task: Task, title: Title) => {
    task.titles.push(title);
    return await task.save();
}

export const findTaskById = async (id: number) => {
    const task: Task | undefined = await Task.findOne({ id });
    return task;
}

export const findTaskByDayId = async (dayId: number) => {
    const task: Task[] = await Task.find({ dayId });
    return task;
}

export const findTaskByDayAndSubject = async (dayId: number, subject: string) => {
    const task: Task | undefined = await Task.findOne({
        where: {
            subject,
            dayId
        }
    })
    return task;
}

export const updateTaskTitle = async (task: Task, title: Title[]) => {
    task.titles = title;
    return await task.save();
}

export const updateTaskSubject = async (task: Task, subject: string) => {
    task.subject = subject;
    return await task.save();
}

export const updateTaskIsFinished = async (task: Task, titleIndex: number) => {
    task.titles[titleIndex].isFinished = !task.titles[titleIndex].isFinished;
    return await task.save();
}

export const deleteTask = async (task: Task) => {
    await task.remove();
    return true;
}