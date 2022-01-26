import { Request, Response, NextFunction } from "express";
import Task from "../entities/tasks";
import  Day from "../entities/days";

import * as TaskService from "../services/taskService";
import * as DayService from "../services/dayService";
import Title from "../types/Title";
import { finished } from "stream";

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { dayId, subject, title } = req.body;
        const task = await TaskService.insertTask(parseInt(dayId), subject, title);
        res.json(task);
    } catch (err) {
        next(err);
    }
}

export const addTitle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.params;
        const { subject, title } =req.body;
        const task: Task | undefined = await TaskService.findTaskByDayAndSubject(parseInt(dayId), subject);
        
        const titleObj: Title = {
            title,
            isFinished: false,
        }
        let updatedTask;

        if (!task) {
            updatedTask = await TaskService.insertTask(parseInt(dayId), subject, [titleObj]);
        } else {
            updatedTask = await TaskService.insertTitle(task, titleObj);
        }

        res.json(updatedTask);
    } catch(err) {

    }
}


export const getTaskListByDayId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.params;
        const task: Task[] = await TaskService.findTaskByDayId(parseInt(dayId));
        res.json(task);
    } catch (err) {
        next(err);
    }
}

export const updateTaskTitle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const { title } = req.body;
        const task: Task | undefined = await TaskService.findTaskById(parseInt(taskId));
        if (!task) throw new Error('UNAUTHORIZED');

        const updatedTask: Task = await TaskService.updateTaskTitle(task, title);
        res.json(updatedTask);
    } catch(err) {
        next(err);
    }
}

export const updateTaskSubject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const { subject } = req.body; 
        const task: Task | undefined = await TaskService.findTaskById(parseInt(taskId));
        if (!task) throw new Error('UNAUTHORIZED');
        
        const updatedTask: Task = await TaskService.updateTaskSubject(task, subject);
        res.json(updatedTask);
    } catch(err) {
        next(err);
    }
}

export const updateTaskIsFinished = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { dayId } = req.params;
        const { subject, titleIndex } = req.body;
        const task: Task | undefined = await TaskService.findTaskByDayAndSubject(parseInt(dayId), subject);
        const day: Day | undefined = await DayService.findDayById(parseInt(dayId));

        console.log(task, day);

        if (!task || !day) throw new Error('UNAUTHORIZED');

        const updatedTask: Task = await TaskService.updateTaskIsFinished(task, parseInt(titleIndex));

        let totalTask: number = 0;
        let finishedTask: number = 0;

        const tasks = await TaskService.findTaskByDayId(parseInt(dayId));
        

        for (let i=0; i<tasks.length; i++) {
            totalTask += tasks[i].titles.length;
            for (let j=0; j<tasks[i].titles.length; j++) {
                if (tasks[i].titles[j].isFinished) {
                    finishedTask += 1;
                }
            }
        }
        console.log(finishedTask, totalTask);

        const dayu = await DayService.updateTaskRate(day, Math.round(finishedTask / totalTask * 100).toString());
        console.log(dayu);
        
        res.json({
            task: updatedTask,
            taskRate: dayu.taskRate,
        });
    } catch (err) {
        next(err);
    }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { taskId } = req.params;
        const task: Task | undefined = await TaskService.findTaskById(parseInt(taskId));
        if (!task) throw new Error('UNAUTHORIZED');
        const result: boolean = await TaskService.deleteTask(task);
        return res.json(result);
    } catch (err) {
        next(err);
    }
}

