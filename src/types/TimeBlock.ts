export interface TimeBlock {
    hour: string;
    minutes: Array<MinuteBlock>
}

export interface MinuteBlock {
    minute: string;
    color: string;
}

const defaultMinuteBlock: Array<MinuteBlock> = [
    {
        minute: "0",
        color: "#0000",
    },
    {
        minute: "10",
        color: "#0000",
    },
    {
        minute: "20",
        color: "#0000",
    },
    {
        minute: "30",
        color: "#0000",
    },
    {
        minute: "40",
        color: "#0000",
    },
    {
        minute: "50",
        color: "#0000",
    },
]

export const defaultTimeBlock: Array<TimeBlock> = [
    {
        hour: "6",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "7",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "8",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "9",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "10",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "11",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "12",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "13",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "14",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "15",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "16",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "17",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "18",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "19",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "20",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "21",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "22",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "23",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "24",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "1",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "2",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "3",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "4",
        minutes: defaultMinuteBlock,
    },
    {
        hour: "5",
        minutes: defaultMinuteBlock,
    },
]