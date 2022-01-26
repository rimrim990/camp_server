export const isValidDate = (dateStr: string) => {
    const year = dateStr.substring(0,4);
    const month = dateStr.substring(4,6);
    const day = dateStr.substring(6,8);

    if (Number.isNaN(dateStr) || dateStr.length !=8) return false;

    if (Number(month) > 12 || Number(month) < 1) return false;


    if (Number(lastDay(dateStr)) < Number(day))
        return false;

    return true;
}

export const toDate = (dateStr: string) => {
    const year = dateStr.substring(0,4);
    const month = dateStr.substring(4,6);
    const day = dateStr.substring(6,8);

    return new Date(Number(year), Number(month)-1, Number(day));
}

const isLeapYear = (dateStr: string) => {
    const year = dateStr.substring(0,4);
    if (Number(year) % 4 == 0) {
        if (Number(year) % 100 == 0)
            return (Number(year) % 400 == 0);
        else
            return true;
    }
    else return false;
}

const lastDay = (dateStr: string) => {
    let days = "31";
    const year = dateStr.substring(0,4);
    const month = dateStr.substring(4,6);

    if (Number(month) == 2) {
        if (isLeapYear(year+month+"01"))
            days = "29";
        else
            days = "28";
    }
    else if (Number(month) == 4 || Number(month) == 6 || Number(month) == 9 || Number(month) == 11)
        days = "30";

    return days;
}

export const formatDate = (date: string) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}