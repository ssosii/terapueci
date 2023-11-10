export function getCurrentDate(separator = '-') {
    let newDate = new Date();
    newDate.toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });
    console.log("newDate", newDate);
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
}

export const getDayOfWeekShortname = (dayOfWeek) => {
    const days = ["pn", "wt", "śr", "czw", "pt", "sb", "nd"];
    return days[parseInt(dayOfWeek) - 1];
}

export const getDayOfWeekName = (dayOfWeek) => {
    const days = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];
    return days[parseInt(dayOfWeek) - 1];
}

export const generateYearArray = () => {
    const currentYear = new Date().getFullYear();
    const futureYear = currentYear + 1;
    const startYear = 2023;
    const yearArray = [];

    for (let year = startYear; year <= futureYear; year++) {
        yearArray.push(year);
    }

    return yearArray;
}

export const getHoursList = () => {
    const hourOptions = [];
    for (let i = 6; i <= 23; i++) {
        hourOptions.push(
            i
        );
    }
    return hourOptions;
}