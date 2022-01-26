import { TimeBlock } from "./TimeBlock";

export default interface Planner {
    date: string;
    comment: string;
    targetTime: string;
    taks: Array<Task>;
    timeBlock?: Array<TimeBlock>;
    totalTime?: number;
    rate?: string;
}

interface Task {
    subject: string;
    titles: Array<string>;
}